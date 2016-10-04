from __future__ import unicode_literals

import cloudinary
from cloudinary.models import CloudinaryField
from django.db import models

from photo_magick.settings.base import SITE_IMAGES


class Base(models.Model):
    """
    Common fields are abstracted here
    """
    date_created = models.DateField(auto_now_add=True)
    date_last_modified = models.DateField(auto_now=True)

    class Meta:
        abstract = True


class Folder(Base):
    """
    Represents folders where images are stored
    """
    name = models.CharField(max_length=100, blank=False, unique=True)
    owner = models.ForeignKey('auth.User', related_name='folders')

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ('date_last_modified',)


class Image(Base):
    """
    Represents images on the site
    """
    name = models.CharField(max_length=100)
    content_type = models.CharField(max_length=100, blank=True)
    image = CloudinaryField(
        resource_type='image',
        type='upload',
        blank=True,
        default="img/logo.jpg"
    )
    folder = models.ForeignKey(
        'Folder',
        null=True,
        related_name='images',
        on_delete=models.CASCADE,
    )

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ('date_last_modified',)
        unique_together = ('name', 'folder')

    def save(self, *args, **kwargs):
        """Save content_type and name from image"""
        if not self.id:
            self.name = self.image.name
            self.content_type = self.image.content_type
        super(Image, self).save(*args, **kwargs)

    def thumbnail_image_url(self):
        """Returns a thumbnail image URL
        """
        image_url = self.image.build_url(
            secure=True,
            width=SITE_IMAGES['thumbnail_image_width'],
            height=SITE_IMAGES['thumbnail_image_height'],
            crop="fit",
        )
        return image_url

    def large_image_url(self):
        """Returns a large size image URL
        """
        image_url = self.image.build_url(
            secure=True,
            width=SITE_IMAGES['large_image_width'],
            height=SITE_IMAGES['large_image_height'],
            crop="fit",
        )
        return image_url

    def update_image_field(self, img):
        """
        Destroys the cloudinary image and
        then saves the new image
        """
        cloudinary.uploader.destroy(self.image.public_id)
        self.image = img
        return self

    def delete(self, *args, **kwargs):
        """Delete this instance and its image on cloudinary"""
        cloudinary.uploader.destroy(self.image.public_id)
        super(Image, self).delete(*args, **kwargs)


class ImageProcessors(Base):
    name = models.CharField(max_length=25, blank=False, unique=True)
    image = CloudinaryField(
        resource_type='image',
        type='upload',
        blank=True,
        default='img/logo.jpg'
    )
    processor_type = models.CharField(max_length=50)

    class Meta:
        ordering = ('processor_type',)

    def __unicode__(self):
        return self.name

    def thumbnail_image_url(self):
        """Returns image url"""
        image_url = self.image.build_url(
            secure=True,
            width=SITE_IMAGES['thumbnail_image_width'],
            height=SITE_IMAGES['thumbnail_image_height'],
            crop="fit",
        )
        return image_url
