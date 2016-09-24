from rest_framework import serializers

from photo_editor.models import Base, Folder, Image, ImageProcessors


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
        fields = ('owner', 'name', 'date_created',
                  'date_last_modified', 'images')


class ImageProcessorsSerializer(BaseSerializer):
    class Meta:
        model = ImageProcessors
        fields = ('name', 'thumbnail_image_url')


class ImageProcessorsViewSerializer(serializers.Serializer):
    processor_tools = serializers.SerializerMethodField('get_tools')

    class Meta:
        fields = ('processor_tools',)

    def get_tools(self, obj):
        import ipdb; ipdb.set_trace()
        filter_tools = ImageProcessors.objects.filter(
            processor_type='filter').order_by('id')
        effect_tools = ImageProcessors.objects.filter(
            processor_type='effect').order_by('id')
        filter_serializer = ImageProcessorsSerializer(
            filter_tools, many=True
        )
        effect_serializer = ImageProcessorsSerializer(
            effect_tools, many=True
        )
        
        return {
            'filterTools': filter_serializer.data,
            'effectTools': effect_serializer.data
        }

    # def get_effect_tools(self, obj):
    #     import ipdb; ipdb.set_trace()
    #     effect_tools = ImageProcessors.objects.filter(
    #         processor_type='effect').order_by('id')
    #     serializer = ImageProcessorsSerializer(
    #         effect_tools, many=True,
    #         context={'request': self.context['request']}
    #     )
    #     return {
    #         'effectTools': serializer.data
    #     }
