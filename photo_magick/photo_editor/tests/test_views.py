"""Script used to test all API views"""

from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.urlresolvers import reverse_lazy
import PIL
from rest_framework import status

from frontend.filters import ImageProcessor
from frontend.models import Folder, Image
from .http_headers import ApiHeaderAuthorization


class FolderViewTestCase(ApiHeaderAuthorization):
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


class ImageCreateDeleteViewTestCase(ApiHeaderAuthorization):
    """Tests the UploadImage view"""
    def setUp(self, *args, **kwargs):
        image_path = 'frontend/tests/img/test.png'
        self.image = SimpleUploadedFile(
            name='test.png',
            content=open(image_path, 'rb').read(),
            content_type='image/png'
        )
        super(ImageCreateDeleteViewTestCase, self).setUp(*args, **kwargs)

    def test_user_can_upload_images(self):
        url = reverse_lazy('create-image')
        data = {'image': self.image, 'folder_id': 1}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("http://res.cloudinary.com/andela-troupon/image/upload",
                      response.content)

    def test_user_can_delete_images(self):
        folder = Folder.objects.filter(name='None')[0]
        image = Image.objects.create(image=self.image, folder=folder)
        url = reverse_lazy('delete-image', kwargs={'image_id': image.id})
        response = self.client.delete(url)
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)

    @classmethod
    def tearDownClass(cls):
        images = Image.objects.all()
        for image in images:
            image.delete()


class setUpTestDataForProcessImage(ApiHeaderAuthorization):
    """Creates data that would be used for tests that inherit from it"""
    def setUp(self, *args, **kwargs):
        folder = Folder.objects.filter(name='None')[0]
        image_path = 'frontend/tests/img/test.png'
        image = SimpleUploadedFile(
            name='test.png',
            content=open(image_path, 'rb').read(),
            content_type='image/png'
        )
        self.image = Image.objects.create(image=image, folder=folder)
        super(setUpTestDataForProcessImage, self).setUp(*args, **kwargs)


class ProcessImageTestCase(setUpTestDataForProcessImage):
    """Tests that ProcessImage view works appropriately"""
    def test_grayscale(self):
        url = reverse_lazy(
            'process_image',
            kwargs={'image_id': self.image.id, 'action': 'gray_scale'}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'frontend/img/temp_image.png')

    def test_flip(self):
        url = reverse_lazy(
            'process_image',
            kwargs={'image_id': self.image.id, 'action': 'flip'}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'frontend/img/temp_image.png')

    def test_invert(self):
        url = reverse_lazy(
            'process_image',
            kwargs={'image_id': self.image.id, 'action': 'invert'}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'frontend/img/temp_image.png')

    def test_mirror(self):
        url = reverse_lazy(
            'process_image',
            kwargs={'image_id': self.image.id, 'action': 'mirror'}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'frontend/img/temp_image.png')

    def test_posterize(self):
        url = reverse_lazy(
            'process_image',
            kwargs={'image_id': self.image.id, 'action': 'posterize'}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'frontend/img/temp_image.png')

    def test_solarize(self):
        url = reverse_lazy(
            'process_image',
            kwargs={'image_id': self.image.id, 'action': 'solarize'}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'frontend/img/temp_image.png')

    def test_add_watermark(self):
        url = reverse_lazy(
            'process_image',
            kwargs={'image_id': self.image.id, 'action': 'add_watermark'}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'frontend/img/temp_image.png')

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
        self.assertEqual(response.data, 'frontend/img/temp_image.png')

    def test_contrast(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'contrast',
                'option': 'decrease'
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'frontend/img/temp_image.png')

    def test_brightness(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'brightness',
                'option': 'increase'
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'frontend/img/temp_image.png')

    def test_sharpness(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'sharpness',
                'option': 'increase'
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'frontend/img/temp_image.png')

    def test_color(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'color',
                'option': 'decrease'
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'frontend/img/temp_image.png')

    def test_contour(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'contour',
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'frontend/img/temp_image.png')

    def test_edge_enhance_more(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'edge_enhance_more',
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'frontend/img/temp_image.png')

    def test_gaussian_blur(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'gaussian_blur',
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'frontend/img/temp_image.png')

    def test_max_filter(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'max_filter',
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'frontend/img/temp_image.png')

    def test_unsharp_mask(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'unsharp_mask',
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'frontend/img/temp_image.png')

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
        self.assertEqual(response.data, 'frontend/img/temp_image.png')

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
        self.assertEqual(response.data, 'frontend/img/temp_image.png')

    def test_roll(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'roll',
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'frontend/img/temp_image.png')

    def test_rotate(self):
        url = reverse_lazy(
            'process_image',
            kwargs={
                'image_id': self.image.id, 'action': 'rotate',
            }
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'frontend/img/temp_image.png')

    def tearDown(self):
        image = Image.objects.all()[0]
        image.delete()


class ProcessedImage(ApiHeaderAuthorization):
    """Creates data that would be used for tests that inherit from it"""
    def setUp(self, *args, **kwargs):
        super(ProcessedImage, self).setUp(*args, **kwargs)
        folder = Folder.objects.filter(name='None')[0]
        image_path = 'frontend/tests/img/test.png'
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
        temp_image_path = 'frontend/tests/img/temp_img.png'
        image.save(temp_image_path, 'PNG')

        session = self.client.session
        session['original_image_url'] = self.image.large_image_url()
        session['processed_image_path'] = temp_image_path
        session.save()


class ApplyImageProcessingViewTestCase(ProcessedImage):
    """Tests the UploadImage view"""
    def test_user_can_apply_changes_to_image(self):
        url = reverse_lazy('apply_changes', kwargs={'image_id': self.image.id})
        response = self.client.put(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("http://res.cloudinary.com/andela-troupon/image/upload",
                      response.content)

    def tearDown(self):
        image = Image.objects.all()[0]
        image.delete()


class RevertToOriginalViewTestCase(ProcessedImage):
    """Tests the UploadImage view"""
    def test_user_can_apply_changes_to_image(self):
        url = reverse_lazy(
            'cancel_changes', kwargs={'image_id': self.image.id}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("http://res.cloudinary.com/andela-troupon/image/upload",
                      response.content)

    def tearDown(self):
        image = Image.objects.all()[0]
        image.delete()
