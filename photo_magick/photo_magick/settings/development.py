# -*- coding: utf-8 -*-
from django_envie.workroom import convertfiletovars
convertfiletovars()

from .base import *


# Python social auth test config for facebook backend

SOCIAL_AUTH_FACEBOOK_KEY = '1822791144619366'
SOCIAL_AUTH_FACEBOOK_SECRET = '24466747b45f994af24fb7be36d8a4cb'

# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#database

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'Photo_Magick',
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}


# Setting for webpack_loader
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'photo_editor/bundles/local/',
        'STATS_FILE': os.path.join(BASE_DIR, '../../webpack-stats-local.json'),
    }
}
