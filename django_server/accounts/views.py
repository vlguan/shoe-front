from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from django.contrib import auth
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
SECRET_KEY = 'TEST'
class CheckAuthenticatedView(APIView):
    permission_classes=(permissions.AllowAny,)
    def get(self,request, format=None):
        user = self.request.user
        try:
            isAuthenticated = user.is_authenticated
            if isAuthenticated:
                return Response({'isAuthenticated': 'success'})
            else:
                return Response({'isAuthenticated': 'error'})
        except Exception as e:
            print(f'Error:{e}')
            return Response({'error': 'something went wrong while authenicating'})
# Create your views here.

@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self,request,format=None):
        data = self.request.data
        try:
            username = data['username']
            password = data['password']
            re_password = data['re_password']
            internalPass = data['internal_pass']
            if internalPass == SECRET_KEY: 
                if password == re_password:
                    if User.objects.filter(username=username).exists():
                        return Response({'error': 'Username already exists'})
                    else:
                        if len(password) < 6:
                            return Response({'error': 'Password must be at least 6 characters'})
                        else:
                            user = User.objects.create_user(username=username, password=password)

                            user.save()
                            return Response({'success': 'User created successfully'})
                else:
                    return Response({'error': 'Passwords do not match'})
            else:
                return Response({'error': 'Internal Key do not match'})
        except Exception as e:
            print(f'Error:{e}')
            return Response({'error': 'Something went wrong while sign up'})

@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self,request,format=None):
        try:
            
            data = self.request.data

            username = data['username']
            password = data['password']

            user = auth.authenticate(username=username,password=password)
            if user is not None:
                auth.login(request, user)
                return Response({'success': 'User authenticated', 'username': username})
            else:
                return Response({'error':'Error Auth'})
        except Exception as e:
            print(f'Error:{e}')
            return Response({'error':'while Auth'})
# @method_decorator(csrf_protect, name='dispatch')
class LogoutView(APIView):
    def post(self, request,format=None):
        try:
            auth.logout(request)
            return Response({'success': 'Logged out'})
        except Exception as e:
            print(f'Error:{e}')
            return Response({'error': 'something wrong when log out'})
@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )
    def get(self,request,format=None):
        return Response({'success': 'CSRF cookie set'})
class DeleteAccountView(APIView):
    def delete(self,request,format=None):
        try:
            self=self.request.user
            user = User.objects.filter(id=user.id).delete()
            return Response({'success': 'deleted'})
        except Exception as e:
            print(f'Error:{e}')
            return Response({'error': 'something wrong when delete'})