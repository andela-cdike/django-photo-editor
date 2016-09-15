# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
import cloudinary.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Folder',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=100)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('date_last_modified', models.DateField(auto_now=True)),
                ('owner', models.ForeignKey(related_name='folders', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('date_last_modified',),
            },
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=100)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('date_last_modified', models.DateField(auto_now=True)),
                ('content_type', models.CharField(max_length=100, blank=True)),
                ('image', cloudinary.models.CloudinaryField(default='img/photo_default.png', max_length=255, blank=True)),
                ('folder', models.ForeignKey(related_name='images', to='photo_editor.Folder', null=True)),
            ],
            options={
                'ordering': ('date_last_modified',),
            },
        ),
    ]
