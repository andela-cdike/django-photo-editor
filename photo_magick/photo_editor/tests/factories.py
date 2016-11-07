import os

from django.conf import settings
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
import factory

from photo_editor import models


# test password
PASSWORD = 'test_pass'
IMAGE_PATH = '{0}/photo_editor/tests/img/test.png'.format(
    os.path.dirname(settings.BASE_DIR))


def upload_file():
    '''
    Returns an image file format that is compatible
    with cloudinary to the factories
    '''
    return SimpleUploadedFile(
        name='test.png',
        content=open(IMAGE_PATH, 'rb').read(),
        content_type='image/png'
    )


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.sequence(lambda n: 'test_user_{0}'.format(n))
    password = factory.PostGenerationMethodCall(
        'set_password',
        PASSWORD
    )


class FolderFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Folder

    name = factory.sequence(lambda n: 'general_{0}'.format(n))
    owner = factory.SubFactory(UserFactory)


class ImageFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Image

    image = factory.LazyFunction(upload_file)
    folder = factory.SubFactory(FolderFactory)


class ImageProcessorToolFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.ImageProcessorTool

    name = 'gray scale'
    image = factory.LazyFunction(upload_file)
    processor_type = 'effect'
