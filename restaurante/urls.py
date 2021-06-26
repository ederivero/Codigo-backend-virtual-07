# from django.contrib import admin
from django.urls import path, include
# sirve para acceder a todas las variables definidas en el archivo settings
from django.conf import settings
# sirve para cargar un grupo de rutas estaticas
from django.conf.urls.static import static
# vista predeterminada que sirve para generar la JWT
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('cms/', include('cms.urls')),
    path('login', TokenObtainPairView.as_view()),

]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# el metodo static retornara una lista de URLPattern y se pasa dos parametro:
# 1. la url (el prefijo) con el cual se accedera a esa ruta
# 2. documento_root => el contenido que se renderizara cuando se llame a esa ruta
# esto se usa para renderizar archivos alojados en el backend
