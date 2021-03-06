"""Script used to test views"""

from django.core.urlresolvers import reverse_lazy
from django.test import TestCase
from rest_framework import status

from photo_editor.tests import factories


class LoginTestSuite(TestCase):
    """Tests that login for the views works to specification"""

    def test_login(self):
        url = reverse_lazy('login')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class LogoutTestSuite(TestCase):
    """Tests for the logout view"""

    def test_logout(self):
        url = reverse_lazy('logout')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_302_FOUND)


class HomeViewTestSuite(TestCase):
    """Tests for the home view"""

    def setUp(self):
        self.user = factories.UserFactory()
        self.url = reverse_lazy('home')
        super(HomeViewTestSuite, self).setUp()

    def test_user_able_to_access_view(self):
        self.client.login(
            username=self.user.username,
            password=factories.PASSWORD
        )
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unauthenticated_user_is_redirected_to_login(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_302_FOUND)
