from io import BytesIO
import os
import StringIO

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import IntegrityError
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
from photo_editor.models import Folder, Image, ImageProcessors
from photo_editor.serializers import (
    FolderSerializer, ImageProcessorsViewSerializer, ImageProcessorsSerializer
)
from photo_magick.settings import STATICFILES_DIRS


class ImageCreateDeleteView(APIView):
    """
    View handles the upload and removal of images
    """
    parser_classes = (MultiPartParser, FormParser,)

    def post(self, request, format=None):
        upload = request.FILES['image']
        folder_id = request.POST['folder_id']
        name = request.POST['name']
        folder = Folder.objects.filter(id=folder_id)[0]
        try:
            upload = Image.objects.create(
                image=upload,
                folder=folder,
                name=name
            )
        except IntegrityError:
            msg = {'msg': 'The image name has been taken. Please pick another'}
            return Response(msg, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        data = {'id': upload.id, 'url': upload.large_image_url()}
        return Response(data, status=201)

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
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        """Queryset should only return folders of authenticated user"""
        authenticated_user = self.request.user
        return Folder.objects.filter(owner=authenticated_user)

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
    def get(self, request):
        image_url = request.session['original_image_url']

        # delete temp image
        file_path = request.session['processed_image_path']
        os.remove(file_path)

        return Response({'url': image_url}, status=status.HTTP_200_OK)


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

        return Response({'url': image.large_image_url()})


class ProcessImage(APIView):
    """
    View to process images
    """
    image_processor_methods_index = {
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
        """
        Applies different image processing operations to an image
        """
        # apply image processing on original image except for
        # rotate and resize that should be additive
        additive_operations = (
            'rotate'
        )
        if action in additive_operations and request.session.get(
                'last_action', None) == action:
            image_path = request.session['processed_image_path']
            image = PIL.Image.open(image_path)
        else:
            image_obj = Image.objects.get(pk=image_id)
            image_url = image_obj.large_image_url()
            response = requests.get(image_url)
            image = PIL.Image.open(BytesIO(response.content))
            request.session['original_image_url'] = image_url

        # process image
        method_index = self.image_processor_methods_index[action]
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
        image_partial_url = '/photo_editor/img/temp_image.%s' % (
            image.format.lower())
        file_path = STATICFILES_DIRS[0] + image_partial_url
        out.save(file_path, image.format)
        request.session['processed_image_path'] = file_path
        request.session['last_action'] = action

        return Response({'url': '/static{0}' .format(image_partial_url)})


class ImageProcessorsView(generics.ListAPIView):
    """Lists all image processors in DB"""
    queryset = ImageProcessors.objects.all()
    serializer_class = ImageProcessorsViewSerializer

    def list(self, request):
        """
        Override the default list method so obj are separated based
        on processor_type
        """
        queryset = self.get_queryset('filter')
        serializer = ImageProcessorsSerializer(queryset, many=True)
        filter_tools = serializer.data
        queryset = self.get_queryset('effect')
        serializer = ImageProcessorsSerializer(queryset, many=True)
        effect_tools = serializer.data
        response = {
            'filterTools': filter_tools,
            'effectTools': effect_tools
        }
        return Response(response)

    def get_queryset(self, filter):
        return self.queryset.filter(processor_type=filter)


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
