"""Script used to test all API views"""

from rest_framework.test import APITestCase, APIClient
from rest_framework_jwt.settings import api_settings

from photo_editor.tests import factories


class ApiHeaderAuthorization(APITestCase):
    """Base class used to attach header to all request on setup."""

    def setUp(self):
        """Include an appropriate `Authorization:` header on all requests"""
        self.image = factories.ImageFactory()
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(self.image.folder.owner)
        token = jwt_encode_handler(payload)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + token)
