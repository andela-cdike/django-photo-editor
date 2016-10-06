from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from photo_editor import api
from photo_editor import views


urlpatterns = [
    # login
    url(r'^login/$', views.LoginView.as_view(), name='login'),

    # logout
    url(r'^logout/$', views.LogoutView.as_view(), name='logout'),

    # main page
    url(r'^$', views.HomeView.as_view(), name='home'),


    # API URLS

    # acquire and refresh JWT token
    url(r'^auth/login', obtain_jwt_token, name='user-login'),
    url(r'^auth/api-token-refresh/', refresh_jwt_token),

    # url for creating and deleting images
    url(r'^images/$', api.ImageCreateDeleteView.as_view(),
        name='create-image'),
    url(r'^images/(?P<image_id>[0-9]+)$',
        api.ImageCreateDeleteView.as_view(),
        name='image-detail'),

    # folder views
    url(r'^folders/$', api.FolderList.as_view(), name='folder-list'),
    url(r'^folders/(?P<pk>[0-9]+)$',
        api.FolderDetail.as_view(),
        name='folder-detail'),

    # image processor view
    url(r'^images/process/(?P<image_id>[0-9]+)/(?P<action>\w+)$',
        api.ProcessImage.as_view(),
        name='process_image'),
    url(r'^images/process/(?P<image_id>[0-9]+)/(?P<action>\w+)/(?P<option>\w+)$',
        api.ProcessImage.as_view(),
        name='process_image'),
    url(r'^images/process/(?P<image_id>[0-9]+)/(?P<action>\w+)/(?P<left>[0-9]+)/(?P<upper>[0-9]+)/(?P<right>[0-9]+)/(?P<lower>[0-9]+)/$',
        api.ProcessImage.as_view(),
        name='process_image'),

    # cancel changes
    url(r'^images/process/cancel/$',
        api.RevertToOriginal.as_view(),
        name='cancel_changes'),

    # save changes
    url(r'^images/process/save/(?P<image_id>[0-9]+)$',
        api.ApplyImageProcessing.as_view(),
        name='apply_changes'),

    # image processors
    url(r'images/process/tools/$',
        api.ImageProcessorToolView.as_view(),
        name="image_processor_tools")
]
