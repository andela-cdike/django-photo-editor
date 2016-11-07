"""Serializers for the api views"""

from rest_framework import serializers

from photo_editor.models import Base, Folder, Image, ImageProcessorTool


class BaseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Base


class ImageSerializer(BaseSerializer):
    folder = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Image
        fields = ('id', 'name', 'content_type', 'date_created',
                  'date_last_modified', 'image', 'folder',
                  'large_image_url', 'thumbnail_image_url')


class FolderSerializer(BaseSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Folder
        fields = ('id', 'owner', 'name', 'date_created',
                  'date_last_modified', 'images')


class ImageProcessorToolSerializer(BaseSerializer):
    class Meta:
        model = ImageProcessorTool
        fields = ('name', 'thumbnail_image_url')
