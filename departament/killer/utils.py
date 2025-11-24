from django.utils.text import slugify

def killer_photo_path(instance, filename):
    if instance.killer.nickname:
        folder = slugify(instance.killer.nickname)
    else:
        folder = slugify(instance.killer.name)

    return f"killer/{folder}/photos/{filename}"
