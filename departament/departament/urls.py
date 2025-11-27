from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from departament.views import Login, Logout, DashboardView
from departament.api_views import LoginAPI, LogoutAPI, DashboardStatsAPI

urlpatterns = [
    path("admin", admin.site.urls),
    path("", Login.as_view(), name="login"),
    path("logout", Logout.as_view(), name="logout"),
    path("dashboard", DashboardView.as_view(), name="dashboard"),
    path('police', include('police.urls'), name='police'),
    path("killer", include("killer.urls"), name='killer'),
    path("cases/", include("cases.urls"), name='cases'),

    # API Endpoints
    path('api/login/', LoginAPI.as_view(), name='api-login'),
    path('api/logout/', LogoutAPI.as_view(), name='api-logout'),
    path('api/dashboard/', DashboardStatsAPI.as_view(), name='api-dashboard'),
    path('api/police/', include('police.api_urls')),
    path('api/killer/', include('killer.api_urls')),
    path('api/cases/', include('cases.api_urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

