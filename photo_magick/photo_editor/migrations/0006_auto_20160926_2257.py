# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photo_editor', '0005_auto_20160923_1937'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='image',
            unique_together=set([('name', 'folder')]),
        ),
    ]
