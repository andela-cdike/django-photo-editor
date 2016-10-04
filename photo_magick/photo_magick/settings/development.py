# -*- coding: utf-8 -*-
from django_envie.workroom import convertfiletovars
convertfiletovars()

from .base import *


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
