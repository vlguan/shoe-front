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
    author = models.ForeignKey(User, on_delete= models.CASCADE,related_name='blog_posts', default='admin')
    updated_on = models.DateTimeField(auto_now= True)
    content = RichTextField()
    created_on = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=STATUS, default=0)
    image = models.ImageField(upload_to='blog/', null=True, blank=True)

    class Meta:
        ordering=['-created_on']

    def __str__(self):
        return self.title
    
class Size(models.Model):
    size = models.CharField(max_length=50)
    stock = models.PositiveIntegerField(default=0)
    def __str__(self):
        return str((self.size, self.stock))
class ItemType(models.Model):
    name = models.CharField(max_length=80, null=False)
    image_files = models.JSONField(models.CharField(max_length=600), null=False)
    description=models.CharField(max_length=160, null=True)
    price=models.CharField(max_length=80,null=False)
    model=models.CharField(max_length=80, null=False)
    size = models.ManyToManyField(Size,  related_name='item_types', blank=True)
    featured = models.BooleanField(default=False)
class Images(models.Model):
    def generate_file_path(instance, filename):
        return f"{filename}"
    file_path = models.CharField(max_length=160, editable=False, default='')
    image = models.ImageField(upload_to='product/')
    item_type = models.ForeignKey(ItemType, on_delete=models.CASCADE, related_name='images', null=True)

    def save(self, *args, **kwargs):
        # Set file_path based on the uploaded file name
        self.file_path = f"{self.image.name}"

        super().save(*args, **kwargs)
    def __str__(self):
        return self.image.name
class HowTo(models.Model):
    content = RichTextField()
class WhoAreWe(models.Model):
    content = RichTextField()