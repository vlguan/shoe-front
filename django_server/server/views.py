from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .form import *
from .serializer import *
# Create your views here.
@api_view(['GET'])
def get_item(request):
    try:
        id = int(request.query_params.get('item', 1))
        print('my id',id)
        items = Shoe.objects.get(id=id)
        serializers = ShoeSerializer(items)
        return Response(serializers.data)
    except ValueError:
        return Response({'error':'Invalid ID values'}, status=400)
@api_view(['GET'])
def get_image_view(request):
    try:
        start_id = int(request.query_params.get('start', 1))
        end_id = int(request.query_params.get('end', 51))
        images = Images.objects.filter(id__in=range(start_id, end_id))
        # print('image data',images)
        serializers = ImageSerializer(images, many=True)
        return Response(serializers.data)
    except ValueError:
        return Response({'error':'Invalid ID values'}, status=400)
@api_view(['GET'])
def get_item_view(request):
    try:
        start_id = int(request.query_params.get('start', 1))
        end_id = int(request.query_params.get('end', 51))
        shoes = Shoe.objects.filter(id__in=range(start_id, end_id))
        serializers = ShoeSerializer(shoes, many=True)
        return Response(serializers.data)
    except ValueError:
        return Response({'error':'Invalid ID values'}, status=400)
@api_view(['POST'])
def shoe_upload_view(request):
    image_form = ImageForm(request.POST,request.FILES)
    if image_form.is_valid():
        image_form.save()
        return HttpResponse({'message': 'success'})
    else:
        print('image_form invalid',image_form.errors)
        image_form = ImageForm()
    return HttpResponse({'message': 'failed'}, status=400)
@api_view(['POST'])
def item_upload_view(request):
    form_data = request.POST.copy()
    try:
        last_id = Shoe.objects.latest('id').id
    except:
        last_id = None
    new_id = last_id + 1 if last_id else 1
    form_data['id'] = new_id
    form_data['status'] = 'Available'
    form = ShoeForm(form_data)

    print(form)
    if form.is_valid():
        form.save()
        return HttpResponse({'message': 'success'})
    else:
        print('form invalid', form.errors)
        form = ShoeForm()
    return HttpResponse({'message': 'failed'}, status=400)