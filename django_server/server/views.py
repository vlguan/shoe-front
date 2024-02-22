import boto3
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework import permissions

from .models import *
from .form import *
from .serializer import *
# Create your views here.

# create blog view
 
class blog_view(APIView):
    @permission_classes([permissions.AllowAny])
    def get(self, request, format=None):
        id = request.query_params.get('id')
        start = request.query_params.get('start')
        end = request.query_params.get('end')
        print(id, start, end)
        try:
            if id:
                blog = Blog.objects.get(id=id)
                return Response(BlogSerializer(blog).data)
            else:
                data=[]
                blogRange = Blog.objects.filter(id__range =(start,end))
                for blog in blogRange:
                    data.append(BlogSerializer(blog).data)
                return Response(data)
        except ValueError:
            return Response({'error': 'Invalid Blog ID value'}, status=400)
        except Blog.DoesNotExist:
            return Response({'error': 'Blog not found'}, status=404)
class featured_view(APIView):
    permission_classes=(permissions.AllowAny,)
    def get(self, request):
        try:
            id = int(request.query_params.get('item', 1))
            print('my id',id)
            items = ItemType.objects.get(id=id)
            serializers = ItemSerializer(items)
            return Response(serializers.data)
        except ValueError:
            return Response({'error':'Invalid ID values'}, status=400)
class item_view(APIView):
    permission_classes=(permissions.AllowAny,)
    def get(self,request):
        try:
            id = int(request.query_params.get('item', 1))
            print('my id',id)
            items = ItemType.objects.get(id=id)
            serializers = ItemSerializer(items)
            return Response(serializers.data)
        except ValueError:
            return Response({'error':'Invalid ID values'}, status=400)
    def delete(self,request):
        try:
            id = int(request.query_params.get('item'))
            print('deleting id:', id)
            ItemType.objects.get(id=id).delete()
            return Response({'success': 'item deleted'}, status=200)
        except Exception as e:
            print(e)
            return Response({'error': e}, status=400)
    def put(self, request):
        try:
            id = int(request.query_params.get('item'))
            field = request.query_params.get('field')
            newVal = request.query_params.get('newVal')
            shoe = ItemType.objects.get(id=id)
            setattr(shoe, field, newVal)
            return Response({'success': 'Item updated'})
        except Exception as e:
            print(e)
            return Response({'error': e}, status=400)
class image_view(APIView):
    permission_classes=(permissions.AllowAny,)

    def get(self,request):
        try:
            start_id = int(request.query_params.get('start', 1))
            end_id = int(request.query_params.get('end', 51))
            images = Images.objects.filter(id__in=range(start_id, end_id))
            # print('image data',images)
            serializers = ImageSerializer(images, many=True)
            return Response(serializers.data)
        except ValueError:
            return Response({'error':'Invalid ID values'}, status=400)
class gallery_view(APIView):
    permission_classes=(permissions.AllowAny,)
    def get(self, request, format=None):
        try:
            start_id = int(request.query_params.get('start', 1))
            end_id = int(request.query_params.get('end', 51))
            shoes = ItemType.objects.filter(id__in=range(start_id, end_id))
            serializers = ItemSerializer(shoes, many=True)
            return Response(serializers.data)
        except ValueError:
            return Response({'error':'Invalid ID values'}, status=400)
class featured_view(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        try:
            # Filter items where 'featured' is true
            shoes = ItemType.objects.filter(featured=True)
            serializers = ItemSerializer(shoes, many=True)
            return Response(serializers.data)
        except ValueError:
            return Response({'error': 'Invalid ID values'}, status=400)
class get_all_view(APIView):
    permission_classes=(permissions.AllowAny,)
    def get(self, request, format=None):
        try:
            shoes = ItemType.objects.all()
            serializers = ItemSerializer(shoes, many=True)
            return Response(serializers.data)
        except Exception as e:
            print(e)
            return Response({'error' : f'Error: {e}'})
class how_to_view(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, format=None):
        try:
            HowToData= HowTo.objects.first()
            return Response(HowToData.content)
        except Exception as e:
            return Response({'error': f'Exception {e}'})
class who_view(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, format=None):
        try:
            HowToData= WhoAreWe.objects.first()
            return Response(HowToData.content)
        except Exception as e:
            return Response({'error': f'Exception {e}'})
class frontpage(APIView):
    permission_classes=(permissions.AllowAny,)
    def get(self, format=None):
        try:
            bucket_name='little-feet'
            folder_name='frontpage'
            num_images=10
            s3 = boto3.client('s3')
            objects = s3.list_objects_v2(Bucket=bucket_name,Prefix=f'{folder_name}/')
            image_url=[]
            for obj in objects.get('Contents',[])[1:num_images]:
                image_url.append(obj["Key"])
            return Response(image_url)
        except Exception as e:
            return Response({'error': f'Exception{e}'})