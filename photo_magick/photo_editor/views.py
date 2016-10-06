from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.utils.decorators import method_decorator
from django.views.generic import View
from django.shortcuts import HttpResponseRedirect, render
from rest_framework_jwt.settings import api_settings

from photo_magick.settings.base import (SOCIAL_AUTH_FACEBOOK_KEY)


class LoginRequiredMixin(object):
    """
    Enforces user authentication on views
    """
    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        """Overrides the dispatch method of the view class.

        Args: request, other arguments and key-value pairs.
        Returns: The call to the dispatch method of the parent class
                  i.e. the View class
        """
        return super(LoginRequiredMixin, self).dispatch(
            request, *args, **kwargs)


class LoginView(View):
    """View logins users via facebook social authentication"""
    def get(self, request):
        context = {'FACEBOOK_APP_ID': SOCIAL_AUTH_FACEBOOK_KEY}
        return render(request, 'login.html', context)


class LogoutView(View):
    """View logouts a user"""
    def get(self, request):
        logout(request)
        return HttpResponseRedirect(reverse('logout'))


class HomeView(LoginRequiredMixin, View):
    """
    This view points to the bucketlist frontend app.
    Most of this section is implemented in reactJS folder.
    Here, template is rendered with appropriate context and cookies
    """
    def get(self, request):
        """
        Renders the bucketlist template
        """

        # obtain JW token
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(request.user)
        user_token = jwt_encode_handler(payload)

        # set context
        context = {'FACEBOOK_APP_ID': SOCIAL_AUTH_FACEBOOK_KEY}

        response = render(request, 'home.html', context)

        # set cookie
        response.set_cookie('user_token', user_token)
        response.set_cookie('user_id', request.user.id)
        request.session.set_expiry(600)

        return response
