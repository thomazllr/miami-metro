from rest_framework import serializers
from .models import Killer, KillerPhoto

class KillerPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = KillerPhoto
        fields = ['id', 'image', 'uploaded_at']

class KillerSerializer(serializers.ModelSerializer):
    photos = KillerPhotoSerializer(many=True, read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Killer
        fields = '__all__'
