from rest_framework import serializers
from .models import *
class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model= Images
        fields=['file_path']
class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model= Size
        fields = ['size', 'stock']
class ItemSerializer(serializers.ModelSerializer):
    size = SizeSerializer(many=True)
    class Meta:
        model = ItemType
        fields= '__all__'
class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields= '__all__'