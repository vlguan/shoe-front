from rest_framework import serializers
from .models import *
class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model= Images
        fields=['file_path']
class ShoeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shoe
        fields = '__all__'