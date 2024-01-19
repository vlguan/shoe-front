from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .form import ImageForm
from .handle_upload import *
# Create your views here.

@api_view(['GET'])
def get_image(request):
    return Response({'message':'Hello, world!'})
@api_view(['POST'])
def shoe_upload_view(request):
    # print('requests', request.POST['name'], request.FILES['file'])
   
    form = ImageForm(request.POST, request.FILES)
    print (form)
    print(form.errors)
    if form.is_valid():
        form.save()
        return HttpResponse({'message': 'success'})
    else:
        print('form invalid')
        form = ImageForm()
    return HttpResponse({'message': 'failed'}, status=400)
@api_view(['POST'])
def 