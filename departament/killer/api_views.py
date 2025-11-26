from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Killer
from .serializers import KillerSerializer

class KillerViewSet(viewsets.ModelViewSet):
    queryset = Killer.objects.all()
    serializer_class = KillerSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'danger_level']
    search_fields = ['name', 'nickname', 'crimes']
    ordering_fields = ['name', 'danger_level']
