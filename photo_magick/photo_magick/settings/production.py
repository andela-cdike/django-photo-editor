"""
Production specific settings for the django bucketlist project
"""

import os

import dj_database_url

from .base import *

DATABASES = {
    'default': dj_database_url.config()
}

ALLOWED_HOSTS = ['*']
