from django.urls import path
from .views import SignupView,GetCSRFToken,CheckAuthenticatedView,LoginView,LogoutView, DeleteAccountView
urlpatterns=[
    path('register/', SignupView.as_view()),
    path('csrf_cookie/', GetCSRFToken.as_view(), name='token'),
    path('authenticated/', CheckAuthenticatedView.as_view(), name='authenticated'), 
    path('login/', LoginView.as_view(), name='login'),
    path('logout/',LogoutView.as_view(),name='logout'),
    path('delete/', DeleteAccountView.as_view(),name='delete')
]