"""Script used to test all API views"""

import os

from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.urlresolvers import reverse_lazy
import PIL
from rest_framework import status

from photo_editor.image_utils import ImageProcessor
from photo_editor.models import Folder, Image, ImageProcessorTool
from .http_header import ApiHeaderAuthorization


class FolderViewTestSuite(ApiHeaderAuthorization):
    """Tests that folder can be created and deleted"""
    def test_user_view_folder(self):
        url = reverse_lazy('folder-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_can_create_folder(self):
        url = reverse_lazy('folder-list')
        data = {'name': 'Chilling'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_can_rename_folder(self):
        url = reverse_lazy('folder-detail', kwargs={'pk': 1})
        data = {'name': 'Unknown'}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_can_delete_folder(self):
        url = reverse_lazy('folder-detail', kwargs={'pk': 1})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class ImageProcessorToolViewTestSuite(ApiHeaderAuthorization):
    """Tests the ImageProcessor View"""
    def setUp(self):
        image_path = '{0}/photo_editor/tests/img/test.png'.format(
            os.path.dirname(settings.BASE_DIR))
        image = SimpleUploadedFile(
            name='test.png',
            content=open(image_path, 'rb').read(),
            content_type='image/png'
        )
        ImageProcessorTool.objects.create(
            name='gray scale',
            image=image,
            processor_type='effect'
        )
        ImageProcessorTool.objects.create(
            name='color',
            image=image,
            processor_type='filter'
        )
        super(ImageProcessorToolViewTestSuite, self).setUp()

    def test_view_image_processors(self):
        url = reverse_lazy('image_processor_tools')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data['effectTools'][0].get('name'), 'gray scale')
        self.assertEqual(response.data['filterTools'][0].get('name'), 'color')


class ImageCreateDeleteViewTestSuite(ApiHeaderAuthorization):
    """Tests the UploadImage view"""
    def setUp(self):
        image_path = '{0}/photo_editor/tests/img/test.png'.format(
            os.path.dirname(settings.BASE_DIR))
        self.image = SimpleUploadedFile(
            name='test.png',
            content=open(image_path, 'rb').read(),
            content_type='image/png'
        )
        self.another_image = SimpleUploadedFile(
            name='demo.png',
            content=open(image_path, 'rb').read(),
            content_type='image/png'
        )
        self.folder = Folder.objects.filter(name='None')[0]
        super(ImageCreateDeleteViewTestSuite, self).setUp()

    def test_user_can_upload_image(self):
        url = reverse_lazy('create-image')
        data = {'image': self.image, 'folder_id': 1, 'name': 'test'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("https://res.cloudinary.com/andela-troupon/image/upload",
                      response.content)

    def test_a_folder_cannot_have_image_of_duplicate_names(self):
        Image.objects.create(image=self.image, folder=self.folder, name='test')
        url = reverse_lazy('create-image')
        data = {'image': self.another_image, 'folder_id': 1, 'name': 'test'}
        response = self.client.post(url, data)
        self.assertEqual(
            response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR
        )
        self.assertIn('msg', response.data.keys())

    def test_user_can_rename_image(self):
        image = Image.objects.create(image=self.image, folder=self.folder)
        url = reverse_lazy('image-detail', kwargs={'image_id': image.id})
        data = {'name': 'retest'}
        response = self.client.put(url, data)
        image = Image.objects.get(name=data['name'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(image.name, data['name'])

    def test_user_can_delete_image(self):
        image = Image.objects.create(image=self.image, folder=self.folder)
        url = reverse_lazy('image-detail', kwargs={'image_id': image.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_non_existent_image_returns_error_with_msg(self):
        url = reverse_lazy('image-detail', kwargs={'image_id': 1})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class ProcessImageTestSuite(ApiHeaderAuthorization):
    """Tests that ProcessImage view works appropriately"""

    def setUp(self):
        self.image_path = '{0}/photo_editor/tests/img/test.png'.format(
            os.path.dirname(settings.BASE_DIR))
        self.temp_file_path = '/static/photo_editor/img/temp_image.png'
        folder = Folder.objects.filter(name='None')[0]
        image = SimpleUploadedFile(
            name='test.png',
            content=open(self.image_path, 'rb').read(),
            content_type='image/png'
        )
        self.image = Image.objects.create(image=image, folder=folder)
        super(ProcessImageTestSuite, self).setUp()

    def test_grayscale(self):
        url = reverse_lazy(
            'process_image',
            kwargs={'image_id': self.image.id, 'action': 'gray_scale'}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], self.temp_file_path)

    def test_flip(self):
        url = reverse_lazy(
            'process_image',
            kwargs={'image_id': self.image.id, 'action': 'flip'}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], self.temp_file_path)

    def test_invert(self):
        url = reverse_lazy(
            'process_image',
            kwargs={'image_id': self.image.id, 'action': 'invert'}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], self.temp_file_path)

    def test_mirror(self):
        url = reverse_lazy(
            'process_image',
            kwargs={'image_id': self.image.id, 'action': 'mirror'}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], self.temp_file_path)

    def test_posterize(self):
        url = reverse_lazy(
            'process_image',
            kwargs={'image_id': self.image.id, 'action': 'posterize'}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], self.temp_file_path)

    def test_solarize(self):
        url = reverse_lazy(
            'process_image',
            kwargs={'image_id': self.image.id, 'action': 'solarize'}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], self.temp_file_path)

    def test_add_watermark(self):
        url = reverse_lazy(
            'process_image',
            kwargs={'image_id': self.image.id, 'action': 'add_watermark'}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], self.temp_file_path)

    def test_crop(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'crop',
                'left': 0, 'upper': 0, 'right': 1280, 'lower': 1280
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], self.temp_file_path)

    def test_contrast(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'contrast',
                'option': '8'
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], self.temp_file_path)

    def test_brightness(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'brightness',
                'option': '3'
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], self.temp_file_path)

    def test_sharpness(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'sharpness',
                'option': '2'
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], self.temp_file_path)

    def test_color(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'color',
                'option': '6'
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], self.temp_file_path)

    def test_contour(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'contour',
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], self.temp_file_path)

    def test_edge_enhance_more(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'edge_enhance_more',
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], self.temp_file_path)

    def test_gaussian_blur(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'gaussian_blur',
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], self.temp_file_path)

    def test_max_filter(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'max_filter',
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], self.temp_file_path)

    def test_unsharp_mask(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'unsharp_mask',
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], self.temp_file_path)

    def test_mix_n_match(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'mix_n_match',
                'option': 1
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], self.temp_file_path)

    def test_resize(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'resize',
                'option': 'vsmall'
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], self.temp_file_path)

    def test_roll(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'roll',
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], self.temp_file_path)

    def test_rotate(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'rotate',
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['url'], self.temp_file_path)

        # test additive operation
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def tearDown(self):
        image = Image.objects.all()[0]
        image.delete()
        full_path = '{0}/photo_editor{1}'.format(
            os.path.dirname(settings.BASE_DIR), self.temp_file_path)
        os.remove(full_path)


class ProcessedImageTestSuite(ApiHeaderAuthorization):
    """Creates data that would be used for tests that inherit from it"""
    def setUp(self):
        super(ProcessedImageTestSuite, self).setUp()
        folder = Folder.objects.filter(name='None')[0]
        image_path = '{0}/photo_editor/tests/img/test.png'.format(
            os.path.dirname(settings.BASE_DIR))
        image = SimpleUploadedFile(
            name='test.png',
            content=open(image_path, 'rb').read(),
            content_type='image/png'
        )
        self.image = Image.objects.create(image=image, folder=folder)

        # convert image to grayscale
        image = PIL.Image.open(image_path)
        image_processor = ImageProcessor(image, 'gray_scale')
        image = image_processor.apply_pil_process_ops()

        # these views will be expecting a temp file and a session variable
        temp_image_path = (
            '{0}/photo_editor/static/photo_editor/img/temp_image.png'
        ).format(os.path.dirname(settings.BASE_DIR))
        image.save(temp_image_path, 'PNG')

        session = self.client.session
        session['original_image_url'] = self.image.large_image_url()
        session['processed_image_path'] = temp_image_path
        session.save()


class ApplyImageProcessingViewTestSuite(ProcessedImageTestSuite):
    """Tests the UploadImage view"""

    def test_user_can_apply_changes_to_image(self):
        url = reverse_lazy('apply_changes', kwargs={'image_id': self.image.id})
        response = self.client.put(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("https://res.cloudinary.com/andela-troupon/image/upload",
                      response.content)

    def tearDown(self):
        image = Image.objects.all()[0]
        image.delete()


class RevertToOriginalViewTestSuite(ProcessedImageTestSuite):
    """Tests the UploadImage view"""

    def test_user_can_apply_changes_to_image(self):
        url = reverse_lazy('cancel_changes')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("https://res.cloudinary.com/andela-troupon/image/upload",
                      response.content)

    def tearDown(self):
        image = Image.objects.all()[0]
        image.delete()


class LoginTestSuite(ApiHeaderAuthorization):
    """Tests that login for the views works to specification"""

    def test_login(self):
        url = reverse_lazy('login')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class LogoutTestSuite(ApiHeaderAuthorization):
    """Tests for the logout view"""

    def test_logout(self):
        url = reverse_lazy('logout')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_302_FOUND)


class HomeViewTestSuite(ApiHeaderAuthorization):
    """Tests for the home view"""

    def setUp(self):
        self.url = reverse_lazy('home')
        super(HomeViewTestSuite, self).setUp()

    def test_user_able_to_access_view(self):
        self.client.login(username='Erika', password='camerlango')
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unauthenticated_user_is_redirected_to_login(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_302_FOUND)
