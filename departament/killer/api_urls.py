from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import KillerViewSet

router = DefaultRouter()
router.register(r'killers', KillerViewSet, basename='api-killer')

urlpatterns = [
    path('', include(router.urls)),
]
