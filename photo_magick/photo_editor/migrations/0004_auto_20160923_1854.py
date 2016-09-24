# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photo_editor', '0003_imageprocessors_processor_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imageprocessors',
            name='processor_type',
            field=models.CharField(max_length=50),
        ),
    ]
