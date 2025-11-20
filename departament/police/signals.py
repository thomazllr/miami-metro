import os
from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver
from .models import PoliceOfficer

@receiver(post_delete, sender=PoliceOfficer)
def delete_officer_photo(sender, instance, **kwargs):
    if instance.photo and instance.photo.path:
        if os.path.isfile(instance.photo.path):
            os.remove(instance.photo.path)
            
@receiver(pre_save, sender=PoliceOfficer)
def delete_old_photo_on_update(sender, instance, **kwargs):
    """
    Remove a foto antiga quando o officer troca a foto.
    Só executa se for UPDATE e se a foto mudou.
    """
    if not instance.pk:
        return

    try:
        old_instance = PoliceOfficer.objects.get(pk=instance.pk)
    except PoliceOfficer.DoesNotExist:
        return

    old_file = old_instance.photo
    new_file = instance.photo

    # Se a foto foi alterada, remove a antiga
    if old_file and old_file != new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)