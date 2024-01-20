from django import forms
from .models import *

class ImageForm(forms.ModelForm):
    
    class Meta:
        model = Images
        fields = '__all__'

class ShoeForm(forms.ModelForm):
    class Meta:
        model = Shoe
        fields = '__all__'