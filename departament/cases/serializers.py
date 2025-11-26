from rest_framework import serializers
from .models import Case
from police.serializers import PoliceOfficerSerializer
from killer.serializers import KillerSerializer

class CaseSerializer(serializers.ModelSerializer):
    killer = KillerSerializer(read_only=True)
    officers = PoliceOfficerSerializer(many=True, read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Case
        fields = '__all__'
