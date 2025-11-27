from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Killer, KillerPhoto
from .serializers import KillerSerializer

class KillerViewSet(viewsets.ModelViewSet):
    queryset = Killer.objects.all()
    serializer_class = KillerSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'danger_level']
    search_fields = ['name', 'nickname', 'crimes']
    ordering_fields = ['name', 'danger_level']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Handle photos
        killer = serializer.instance
        images = request.FILES.getlist('photos')
        for image in images:
            # Check limit of 3 photos total (optional logic, but good to have)
            if killer.photos.count() >= 3:
                break
            KillerPhoto.objects.create(killer=killer, image=image)
            
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # Handle photos
        images = request.FILES.getlist('photos')
        if images:
            # If we want to replace, we might delete old ones, or just add new ones.
            # The user said "import photos", usually implies adding.
            # But "edit mode" might imply managing them.
            # For now, let's just add them, respecting the limit of 3 if possible.
            current_count = instance.photos.count()
            for image in images:
                if current_count >= 3:
                    break
                KillerPhoto.objects.create(killer=instance, image=image)
                current_count += 1

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
