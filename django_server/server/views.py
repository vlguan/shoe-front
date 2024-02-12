import json
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions

from .models import *
from .form import *
from .serializer import *
# Create your views here.

# create blog view
 
class blog_view(APIView):
    def post(self, request, format=None):
        try:
            title = request.data.get('title')
            content=request.data.get('content')
            status=request.data.get('status', 0)
            print('this should be test ', self.request.user.username)
            Blog.objects.create(
                title=title,
                slug = title,
                author=request.user,
                content=content,
                status=status
            )
            return Response({'success': 'Successfully created Blog post'})
        except Exception as e:
            print(e)
            return Response({'error': e})
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
    permission_classes = (permissions.AllowAny, )
    def put(self, request):
        try:
            id = request.query_params.get('id')
            content = request.data.get('content')
            # print('content',request.data, content)
            if id is None or content is None:
                return Response({'error': 'id and content are required'}, status=400)
            
            blog = Blog.objects.get(id=id)
            setattr(blog, 'content', content)
            blog.save()
            return Response({'success': 'Item updated'})
        except Exception as e:
            print(e)
            return Response({'error': e}, status=400)
    permission_classes = (permissions.AllowAny, )
    def delete(self, request):
        try:
            id = request.query_params.get('id')
            # Try to get the blog by id
            blog = Blog.objects.get(id=id)
            
            # Delete the blog
            blog.delete()
            
            return Response({'success': 'Blog deleted'})
        except Exception as e:
            print(e)
            return Response({'error': e}, status=400)
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
    def post(self,request):
        try:
            form_data = request.POST.copy()
            s = request.POST.get('size')
            print(s)
            try:
                last_id = ItemType.objects.latest('id').id
            except:
                last_id = None
            new_id = last_id + 1 if last_id else 1
            if 'size' in form_data:
                del form_data['size']
            form_data['id'] = new_id
            sizesList = json.loads(s)
            form = ItemForm(form_data)

            if form.is_valid():
                item_type = form.save()
                for sizes in sizesList:
                    size, stock = sizes.split(':')
                    size_inst = Size.objects.create(size=size, stock=stock)
                    item_type.size.add(size_inst)
                return Response({'message': 'success'})
            else:
                print('form invalid', form.errors)
                form = ItemForm()
                return Response({'message': 'failed'}, status=400)
        except Exception as e:
            print(e)
            return Response({'error': e})
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
    def post(self,request):
        try:
            image_form = ImageForm(request.POST,request.FILES)
            if image_form.is_valid():
                image_form.save()
                return Response({'message': 'success'})
            else:
                print('image_form invalid',image_form.errors)
                image_form = ImageForm()
            return Response({'message': 'failed'}, status=400)
        except Exception as e:
            print(e)
            return Response({'error': e})
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
class get_all_view(APIView):
    permission_classes=(permissions.AllowAny,)
    def get(self, request, format=None):
        try:
            shoes = ItemType.objects.all()
            serializers = ItemSerializer(shoes, many=True)
            return Response(serializers.data)
        except Exception as e:
            print(e)
            return Response({'error' : 'Error: {e}'})