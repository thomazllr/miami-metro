from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from departament.views import Login, Logout, DashboardView

urlpatterns = [
    path("admin", admin.site.urls),
    path("", Login.as_view(), name="login"),
    path("logout", Logout.as_view(), name="logout"),
    path("dashboard", DashboardView.as_view(), name="dashboard"),
    path('police', include('police.urls'), name='police'),
    path("killer", include("killer.urls"), name='killer'),
    path("cases/", include("cases.urls"), name='cases'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
