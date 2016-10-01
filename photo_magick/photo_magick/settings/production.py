"""
Production specific settings for the django bucketlist project
"""

import os

import dj_database_url

from .base import *


# Python social auth test config for facebook backend

SOCIAL_AUTH_FACEBOOK_KEY = '1822223438009470'
SOCIAL_AUTH_FACEBOOK_SECRET = 'e8993eac77025c02aae989538637b062'


DATABASES = {
    'default': dj_database_url.config()
}

ALLOWED_HOSTS = ['*']


# Setting for webpack_loader
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'photo_editor/bundles/prod/',
        'STATS_FILE': os.path.join(BASE_DIR, '../../webpack-stats-prod.json'),
    }
}
