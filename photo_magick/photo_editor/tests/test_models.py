from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase

from photo_editor.models import Folder, Image


class UserModelTestCase(TestCase):
    """Test User model"""
    def test_user_model(self):
        user = User.objects.create(username='rikky', password='marryam')
        self.assertEqual(str(user), 'rikky')


class FolderTestCase(TestCase):
    """Tests for the Folder model"""
    def setUp(self):
        user = User.objects.create(username='rikky', password='marryam')
        Folder.objects.create(name='None', owner=user)

    def test_folder_model(self):
        user = User.objects.all()[0]
        folder = Folder.objects.all()[0]
        self.assertEqual(str(folder), 'None')
        self.assertEqual(folder.owner, user)
        self.assertEqual(Folder.objects.count(), 1)


class ImageModelTestCase(TestCase):
    """Tests for the Image model"""
    def setUp(self):
        user = User.objects.create(username="rikky", password='marryam')
        folder = Folder.objects.create(name='None', owner=user)
        image_path = 'photo_editor/tests/img/test.png'
        image = SimpleUploadedFile(
            name='test.png',
            content=open(image_path, 'rb').read(),
            content_type='image/png'
        )
        Image.objects.create(image=image, folder=folder)

    def test_image_model(self):
        folder = Folder.objects.all()[0]
        image = Image.objects.all()[0]
        self.assertEqual(str(image), 'test.png')
        self.assertEqual(image.folder, folder)

    def tearDown(self):
        image = Image.objects.all()[0]
        image.delete()
