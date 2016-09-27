# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photo_editor', '0006_auto_20160926_2257'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='imageprocessors',
            name='name',
            field=models.CharField(unique=True, max_length=25),
        ),
    ]
