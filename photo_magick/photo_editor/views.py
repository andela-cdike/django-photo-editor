from rest_framework import generics, permissions, status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response

from photo_editor.custom_permissions import IsOwner
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
