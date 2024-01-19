from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .form import ImageForm
# Create your views here.

@api_view(['GET'])
def get_image(request):
    return Response({'message':'Hello, world!'})
@api_view(['POST'])
def shoe_upload_view(request):
    form = ImageForm(request.POST, request.FILES)
    if form.is_valid():
        form.save()
        return redirect('success')
    else:
        form = ImageForm()
    return redirect('error')
def success(request):
    return HttpResponse('successfully uploaded')
def error(request):
    return HttpResponse('failed')