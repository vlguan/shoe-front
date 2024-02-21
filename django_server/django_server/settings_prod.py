from .settings import *
DEBUG = False

ALLOWED_HOSTS = ['0.0.0.0', ".awsapprunner.com",]
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
CSRF_COOKIE_DOMAIN = ['.awsapprunner.com']
CSRF_TRUSTED_ORIGINS = ['.awsapprunner.com']
CSRF_COOKIE_PATH = '/'
CSRF_COOKIE_SAMESITE = 'None'  
CSRF_COOKIE_HTTPONLY = True
CSRF_USE_SESSIONS = True
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOWED_ORIGINS=[
    "http://localhost:3000",
    '.awsapprunner.com'
]
CORS_ALLOW_CREDENTIALS=True