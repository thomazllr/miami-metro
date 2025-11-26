from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import CaseViewSet

router = DefaultRouter()
router.register(r'cases', CaseViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
