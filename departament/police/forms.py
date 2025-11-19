from django import forms
from django.forms import ModelForm
from .models import PoliceOfficer

class PoliceOfficerForm(ModelForm):
    class Meta:
        model = PoliceOfficer
        exclude = []
        widgets = {
            "name": forms.TextInput(attrs={
                "class": "form-control",
                "placeholder": "Officer name"
            }),
            "rank": forms.Select(attrs={
                "class": "form-control form-select",
            }),
            "department": forms.Select(attrs={
                "class": "form-control form-select",
            }),
            "status": forms.Select(attrs={
                "class": "form-control form-select",
            }),
            "badge_number": forms.TextInput(attrs={
                "class": "form-control",
                "placeholder": "Badge number",
                "maxlength": 20
            }),
            "photo": forms.FileInput(attrs={
                "class": "form-control",
                "accept": "image/*"
            }),
        }
        labels = {
            "name": "Officer Name",
            "rank": "Rank",
            "department": "Department",
            "status": "Status",
            "badge_number": "Badge Number",
            "photo": "Photo",
        }
