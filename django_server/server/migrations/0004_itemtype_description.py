# Generated by Django 5.0.1 on 2024-01-30 00:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_itemtype_size'),
    ]

    operations = [
        migrations.AddField(
            model_name='itemtype',
            name='description',
            field=models.CharField(max_length=160, null=True),
        ),
    ]