from rest_framework import serializers
from .models import PoliceOfficer

class PoliceOfficerSerializer(serializers.ModelSerializer):
    rank_display = serializers.CharField(source='get_rank_display', read_only=True)
    department_display = serializers.CharField(source='get_department_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = PoliceOfficer
        fields = '__all__'
