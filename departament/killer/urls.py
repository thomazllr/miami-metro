from django.urls import path
from .views import KillerList, KillerCreate, KillerUpdate, KillerDelete, KillerDetail

urlpatterns = [
    path("", KillerList.as_view(), name="killer-list"),
    path("create/", KillerCreate.as_view(), name="killer-create"),
    path("detail/<int:pk>/", KillerDetail.as_view(), name="killer-detail"),
    path("update/<int:pk>/", KillerUpdate.as_view(), name="killer-update"),
    path("delete/<int:pk>/", KillerDelete.as_view(), name="killer-delete"),
]
