from django.test import TestCase

from photo_editor.models import Folder, Image, ImageProcessorTool
from photo_editor.tests import factories


class UserModelTestCase(TestCase):
    """Test User model"""
    def test_user_model(self):
        user = factories.UserFactory()
        self.assertEqual(str(user), user.username)


class FolderTestCase(TestCase):
    """Tests for the Folder model"""
    def setUp(self):
        self.folder = factories.FolderFactory()

    def test_folder_model(self):
        folder = Folder.objects.all()[0]
        self.assertEqual(str(folder), self.folder.name)
        self.assertEqual(folder.owner, self.folder.owner)
        self.assertEqual(Folder.objects.count(), 1)


class ImageModelTestCase(TestCase):
    """Tests for the Image model"""
    def setUp(self):
        self.image = factories.ImageFactory()

    def test_image_model(self):
        image = Image.objects.all()[0]
        self.assertEqual(str(image), self.image.name)
        self.assertEqual(image.folder, self.image.folder)

    def tearDown(self):
        self.image.delete()


class ImageProcessorToolTestCase(TestCase):
    """Tests for the ImageProcessor model"""
    def setUp(self):
        self.processor_tool = factories.ImageProcessorToolFactory()

    def test_image_processor_model(self):
        processor_tool = ImageProcessorTool.objects.all()[0]
        self.assertEqual(str(processor_tool), self.processor_tool.name)
        self.assertEqual(
            type(processor_tool.thumbnail_image_url()), unicode
        )
