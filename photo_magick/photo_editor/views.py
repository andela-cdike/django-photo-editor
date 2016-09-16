from io import BytesIO
import os
import StringIO

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.views.generic import View
from django.shortcuts import render
import PIL
from rest_framework import generics, permissions, status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
import requests

from photo_editor.custom_permissions import IsOwner
from photo_editor.image_utils import ImageProcessor
from photo_editor.models import Folder, Image
from photo_editor.serializers import FolderSerializer


class ImageCreateDeleteView(APIView):
    """
    View handles the upload and removal of images
    """
    parser_classes = (MultiPartParser, FormParser,)

    def post(self, request, format=None):
        upload = request.FILES['image']
        folder = request.POST['folder_id']
        folder = Folder.objects.filter(name='None')[0]
        upload = Image.objects.create(
            content_type='image/png',
            image=upload,
            folder=folder
        )
        return Response({upload.large_image_url()}, status=201)

    def delete(self, request, image_id):
        image = Image.objects.get(pk=image_id)
        image.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FolderList(generics.ListCreateAPIView):
    """
    View to list all folders and also to
    create new folders
    """
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def perform_create(self, serializer):
        """Include the owner information when saving a Folder"""
        serializer.save(owner=self.request.user)


class FolderDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a folder
    """
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)


class RevertToOriginal(APIView):
    """
    View to cancel unapplied image processing operations
    and revert to original image
    """
    def get(self, request, image_id):
        image_url = request.session['original_image_url']

        # delete temp image
        file_path = request.session['processed_image_path']
        os.remove(file_path)

        return Response(image_url)


class ApplyImageProcessing(APIView):
    """
    Save the processed image to the database
    """
    def put(self, request, image_id):
        """
        Update the original image with processed image
        """
        image = Image.objects.get(pk=image_id)
        image_path = request.session['processed_image_path']
        new_image = PIL.Image.open(image_path)

        # convert image to a format that is compatible with django models
        image_io = StringIO.StringIO()
        new_image.save(image_io, new_image.format)
        image_file = InMemoryUploadedFile(
            image_io, None, image.name,
            image.content_type, image_io.len, None
        )

        image = image.update_image_field(image_file)
        image.save()

        return Response(image.large_image_url())


class ProcessImage(APIView):
    """
    View to filter images
    """
    index_image_processor_methods = {
        'gray_scale': 1, 'flip': 1, 'invert': 1, 'mirror': 1,
        'posterize': 1, 'solarize': 1,
        'add_watermark': 2,
        'crop': 3,
        'contrast': 4, 'brightness': 4, 'sharpness': 4, 'color': 4,
        'contour': 5, 'edge_enhance_more': 5, 'gaussian_blur': 5,
        'max_filter': 5, 'unsharp_mask': 5,
        'mix_n_match': 6,
        'resize': 7,
        'roll': 8,
        'rotate': 9
    }

    def get(self, request, image_id, action, **kwargs):
        # get image from database
        image_obj = Image.objects.get(pk=image_id)

        # get image from cloudinary
        image_url = image_obj.large_image_url()
        response = requests.get(image_url)
        image = PIL.Image.open(BytesIO(response.content))
        request.session['original_image_url'] = image_url

        # filter image
        method_index = self.index_image_processor_methods[action]
        processor = ImageProcessor(image, action, **kwargs)
        image_processor_methods = (
            processor.apply_pil_process_ops,
            processor.add_watermark,
            processor.crop,
            processor.enhance_image,
            processor.filter_image,
            processor.mix_n_match,
            processor.resize,
            processor.roll,
            processor.rotate
        )
        out = image_processor_methods[method_index - 1]()

        # save image to storage
        image_partial_url = 'photo_editor/img/temp_image.%s' % (
            image.format.lower())
        file_path = 'photo_editor/static/' + image_partial_url
        out.save(file_path, image.format)
        request.session['processed_image_path'] = file_path

        return Response(image_partial_url)


class HomeView(View):
    """
    This view points to the bucketlist frontend app.
    Most of this section is implemented in reactJS folder.
    Here, we just render the template.
    """
    def get(self, request):
        """
        Renders the bucketlist template
        """
        return render(request, 'home.html')
