"""Script used to test all API views"""

from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework_jwt.settings import api_settings


class ApiHeaderAuthorization(APITestCase):
    """Base class used to attach header to all request on setup."""
    fixtures = ['initial_data', ]

    def setUp(self):
        """Include an appropriate `Authorization:` header on all requests"""
        user = User.objects.all()[0]
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + token)


class ApiHeaderWrongAuthorization(APITestCase):
    """Base class used to attach header to all request on setup."""
    fixtures = ['initial_data', ]

    def setUp(self):
        """Include an appropriate `Authorization:` header on all requests"""
        user = User.objects.all()[1]
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + token)
