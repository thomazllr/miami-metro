from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import PoliceOfficer
from .serializers import PoliceOfficerSerializer

class PoliceOfficerViewSet(viewsets.ModelViewSet):
    queryset = PoliceOfficer.objects.all()
    serializer_class = PoliceOfficerSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['rank', 'department', 'status']
    search_fields = ['name', 'badge_number']
    ordering_fields = ['name', 'rank']
