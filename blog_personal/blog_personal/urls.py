from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('panel-administrativo/', admin.site.urls),
    path('api/', include('gestion.urls'))
]
