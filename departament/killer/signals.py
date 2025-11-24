import os
from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver
from .models import KillerPhoto

@receiver(post_delete, sender=KillerPhoto)
def delete_killer_photo(sender, instance, **kwargs):
    if instance.image and instance.image.path:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)
