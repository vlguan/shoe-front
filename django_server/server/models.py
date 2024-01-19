from django.db import models

# Create your models here.
class Shoe(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=80, null=False)
    image_files = models.JSONField(models.CharField(max_length=80), null=False)
    price=models.IntegerField(null=False)
    link=models.CharField(max_length=80, null=False)
    description=models.CharField(max_length=160, null=True)
    size=models.CharField(max_length=80, null=False)
    status=models.CharField(max_length=80, null=False)
class Images(models.Model):
    file_path = models.CharField(max_length=50)
    image = models.ImageField(upload_to='product/')