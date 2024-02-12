from django.urls import path, include
from .views import blog_view,item_view,image_view,gallery_view, get_all_view
urlpatterns = [
    path('blog/', blog_view.as_view(), name='blog'),
    path('image/', image_view.as_view(), name='image'),
    path('item/', item_view.as_view(), name='item'),
    path('gallery/', gallery_view.as_view(), name='gallery'),
    path('get_all/',get_all_view.as_view(), name='get_all'),
    path('accounts/', include('accounts.urls')),
    path('api-auth/', include('rest_framework.urls')),
]