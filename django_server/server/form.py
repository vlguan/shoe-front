from django import forms
from .models import *

class ImageForm(forms.ModelForm):
    
    class Meta:
        model = Images
        fields = '__all__'

class ItemForm(forms.ModelForm):
    
    class Meta:
        model = ItemType
        fields = '__all__'
class BlogForm(forms.ModelForm):

    class Meta:
        model = Blog
        fields = '__all__'
class HowToForm(forms.ModelForm):
    class Meta:
        model = HowTo
        fields = '__all__'
