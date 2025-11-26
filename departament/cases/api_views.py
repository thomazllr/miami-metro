from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Case
from .serializers import CaseSerializer

class CaseViewSet(viewsets.ModelViewSet):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status']
    search_fields = ['title', 'case_number', 'description']
    ordering_fields = ['date_opened', 'status']
