from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField
# Create your models here.
STATUS = (
    (0,"Draft"),
    (1,"Publish")
)
class Blog(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    author = models.ForeignKey(User, on_delete= models.CASCADE,related_name='blog_posts', default='admin')
    updated_on = models.DateTimeField(auto_now= True)
    content = RichTextField()
    created_on = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=STATUS, default=0)

    class Meta:
        ordering=['-created_on']

    def __str__(self):
        return self.title
    
class Images(models.Model):
    file_path = models.CharField(max_length=160)
    image = models.ImageField(upload_to='product/')

class Size(models.Model):
    size = models.CharField(max_length=50)
    stock = models.PositiveIntegerField(default=0)

class ItemType(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=80, null=False)
    image_files = models.JSONField(models.CharField(max_length=600), null=False)
    description=models.CharField(max_length=160, null=True)
    price=models.CharField(max_length=80,null=False)
    model=models.CharField(max_length=80, null=False)
    size = models.ManyToManyField(Size, blank=True)