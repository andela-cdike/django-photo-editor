# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photo_editor', '0009_auto_20161005_1423'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='imageprocessortool',
            options={'ordering': ('name',)},
        ),
    ]
