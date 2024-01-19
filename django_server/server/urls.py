from django.urls import path
from . import views
urlpatterns = [
    path('hello-world/', views.get_image, name='get_image'),
    path('upload/', views.shoe_upload_view, name='shoe_upload')
]