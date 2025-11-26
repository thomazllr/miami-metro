from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import PoliceOfficerViewSet

router = DefaultRouter()
router.register(r'officers', PoliceOfficerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
