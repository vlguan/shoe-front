from django.urls import path
from . import views
urlpatterns = [
    path('get-image/', views.get_image_view, name='get_image'),
    path('get-item/', views.get_item_view, name='get_item'),
    path('upload/', views.shoe_upload_view, name='shoe_upload'),
    path('get-one-item/', views.get_item, name='get_item'),
    path('new-item/', views.item_upload_view, name='item_upload')
]