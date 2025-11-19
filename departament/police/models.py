from django.db import models
from .consts import RANKS, DEPARTMENTS, STATUS

class PoliceOfficer(models.Model):
    name = models.CharField(max_length=100)
    rank = models.IntegerField(choices=RANKS,verbose_name="Rank")
    department = models.IntegerField(choices=DEPARTMENTS,verbose_name="Department")
    status = models.IntegerField(choices=STATUS,verbose_name="Status")
    badge_number = models.CharField(max_length=20, unique=True)
    photo = models.ImageField(upload_to="police/photo", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)