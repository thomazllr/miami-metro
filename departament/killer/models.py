from django.db import models
from .utils import killer_photo_path
from .consts import KILLER_STATUS


class Killer(models.Model):
    name = models.CharField(max_length=120)
    nickname = models.CharField(max_length=120, blank=True, null=True)
    crimes = models.TextField()
    danger_level = models.IntegerField(default=1)
    status = models.IntegerField(
        choices=KILLER_STATUS,
        default=4  
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    @property
    def is_active(self):
        return self.status == 4  
    
    @property
    def is_at_large(self):
        return self.status in [3, 4]  

    @property
    def status_badge_class(self):
        """Retorna a classe CSS para o badge de status"""
        badges = {
            1: "dead",      # Dead
            2: "captured",  # Captured  
            3: "missing",   # Missing
            4: "active",    # Active
        }
        return badges.get(self.status, "dead")

    @property
    def status_text(self):
        """Retorna o texto do status"""
        status_dict = dict(KILLER_STATUS)
        return status_dict.get(self.status, "Unknown")

    @property
    def status_badge_text(self):
        """Retorna o texto para exibir no badge"""
        texts = {
            1: "DEAD",
            2: "CAPTURED", 
            3: "MISSING",
            4: "ACTIVE",
        }
        return texts.get(self.status, "UNKNOWN")


class KillerPhoto(models.Model):
    killer = models.ForeignKey(Killer, related_name="photos", on_delete=models.CASCADE)
    image = models.ImageField(upload_to=killer_photo_path)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Photo of {self.killer.name}"
