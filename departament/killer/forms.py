from django import forms
from .models import Killer, KillerPhoto
from .widgets import MultipleFileInput

class KillerForm(forms.ModelForm):
    class Meta:
        model = Killer
        fields = ["name", "nickname", "crimes", "danger_level", "status"]


class KillerPhotoForm(forms.ModelForm):
    images = forms.FileField(
        widget=MultipleFileInput(attrs={"multiple": True}),
        required=False
    )

    class Meta:
        model = KillerPhoto
        fields = ["images"]
