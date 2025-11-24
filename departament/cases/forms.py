from django import forms
from .models import Case

class CaseForm(forms.ModelForm):
    class Meta:
        model = Case
        fields = ['case_number', 'title', 'description', 'status', 'killer', 'officers', 'date_opened', 'date_closed']
        widgets = {
            'date_opened': forms.DateInput(attrs={'type': 'date'}),
            'date_closed': forms.DateInput(attrs={'type': 'date'}),
            'officers': forms.CheckboxSelectMultiple(),
        }
