# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photo_editor', '0002_auto_20160923_1823'),
    ]

    operations = [
        migrations.AddField(
            model_name='imageprocessors',
            name='processor_type',
            field=models.CharField(max_length=50, blank=True),
        ),
    ]
