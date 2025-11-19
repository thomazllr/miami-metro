from django.urls import path
from .views import *

urlpatterns = [
    path("", PoliceOfficerList.as_view(), name="police-list"),
    path("new/", PoliceOfficerCreate.as_view(), name="police-create"),
    path("edit/<int:pk>/", PoliceOfficerUpdate.as_view(), name="police-update"),
    path("photos/<str:filename>/", OfficerPhotoView.as_view(), name="officer-photo"),

]
