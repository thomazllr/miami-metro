from django.urls import path
from .views import CaseList, CaseCreate, CaseDetail, CaseUpdate, CaseDelete

urlpatterns = [
    path('', CaseList.as_view(), name='case-list'),
    path('new/', CaseCreate.as_view(), name='case-create'),
    path('<int:pk>/', CaseDetail.as_view(), name='case-detail'),
    path('<int:pk>/edit/', CaseUpdate.as_view(), name='case-update'),
    path('<int:pk>/delete/', CaseDelete.as_view(), name='case-delete'),
]
