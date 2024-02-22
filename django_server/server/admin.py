from django import forms
from django.contrib import admin

from .models import ItemType, HowTo, Blog,WhoAreWe, Size, Images


class SizeInline(admin.TabularInline):
    model = ItemType.size.through
    extra = 1
    fields = ['size']
class ImageInline(admin.TabularInline):
    model = Images
    extra = 1
class ShoeAdmin(admin.ModelAdmin):
    ordering = ('id',)
    list_display = ('name', 'display_size')
    search_fields = ['model']  # Add search functionality
    inlines = [SizeInline, ImageInline]
    def display_size(self,obj):
        return ', '.join([f"{size.size} (Stock: {size.stock})" for size in obj.size.all()])

class HowToAdmin(admin.ModelAdmin):
    model=HowTo
    list_display = ('id','content')
    search_fields= ['content']
class BlogAdmin(admin.ModelAdmin):
    model = Blog
    list_display =('title', 'author')
    def display_image(self,obj):
        return obj.image.url if obj.image else ''
class WhoAreWeAdmin(admin.ModelAdmin):
    model=WhoAreWe
    list_display = ('id','content')
    search_fields= ['content']
admin.site.register(ItemType, ShoeAdmin)
admin.site.register(HowTo, HowToAdmin)
admin.site.register(Blog, BlogAdmin)
admin.site.register(WhoAreWe,WhoAreWeAdmin)
admin.site.register(Size)
# # admin.site.register(ItemType,ShoeAdmin.display_size)