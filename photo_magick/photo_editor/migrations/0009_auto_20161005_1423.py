# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photo_editor', '0008_auto_20161005_1331'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ImageProcessor',
            new_name='ImageProcessorTool',
        ),
    ]
