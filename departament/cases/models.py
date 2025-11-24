from django.db import models
from killer.models import Killer
from police.models import PoliceOfficer

CASE_STATUS = (
    (1, "Open"),
    (2, "Closed"),
    (3, "Cold Case"),
)

class Case(models.Model):
    case_number = models.CharField(max_length=20, unique=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.IntegerField(choices=CASE_STATUS, default=1)
    
    # Relacionamentos
    killer = models.ForeignKey(Killer, on_delete=models.CASCADE, related_name="cases", null=True, blank=True)
    officers = models.ManyToManyField(PoliceOfficer, related_name="cases")
    
    date_opened = models.DateField()
    date_closed = models.DateField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Case #{self.case_number} - {self.title}"

