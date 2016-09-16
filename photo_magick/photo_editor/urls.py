from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from photo_editor import views


urlpatterns = [
    # acquire and refresh JWT token
    url(r'^auth/login', obtain_jwt_token, name='user-login'),
    url(r'^auth/api-token-refresh/', refresh_jwt_token),

    # url for creating and deleting images
    url(r'^images/$', views.ImageCreateDeleteView.as_view(),
        name='create-image'),
    url(r'^images/(?P<image_id>[0-9]+)$',
        views.ImageCreateDeleteView.as_view(),
        name='delete-image'),

    # folder views
    url(r'^folders/$', views.FolderList.as_view(), name='folder-list'),
    url(r'^folders/(?P<pk>[0-9]+)$',
        views.FolderDetail.as_view(),
        name='folder-detail'),
]
