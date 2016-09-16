# -*- coding: utf-8 -*-
from .base import *


# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'testdb'),
        'TEST': {
            'NAME': 'testdb',
        },
    }
}

# Setting for webpack_loader
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'photo_editor/bundles/local/',
        'STATS_FILE': os.path.join(BASE_DIR, '../../webpack-stats-local.json'),
    }
}
