from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import KillerViewSet

router = DefaultRouter()
router.register(r'killers', KillerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
