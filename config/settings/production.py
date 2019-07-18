from __future__ import absolute_import, unicode_literals

from .base import *

DEBUG = False

SECRET_KEY = '5+f#!xn=hj^u#=cr9@pz@@5cf7bqf0ymy=8uyfpx_zvxpght3='

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

ADMINS = (
    ('Michael Yin', 'admin@michaelyin.info'),
)

ALLOWED_HOSTS = ['*']

try:
    from .local import *
except ImportError:
    pass
