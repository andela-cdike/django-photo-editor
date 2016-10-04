# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import cloudinary.models


class Migration(migrations.Migration):

    dependencies = [
        ('photo_editor', '0007_auto_20160927_1058'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImageProcessor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('date_last_modified', models.DateField(auto_now=True)),
                ('name', models.CharField(unique=True, max_length=25)),
                ('image', cloudinary.models.CloudinaryField(default='img/logo.jpg', max_length=255, blank=True)),
                ('processor_type', models.CharField(max_length=50)),
            ],
            options={
                'ordering': ('processor_type',),
            },
        ),
        migrations.DeleteModel(
            name='ImageProcessors',
        ),
    ]
