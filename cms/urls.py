from django.urls import path

from .views import (PlatosController)

urlpatterns = [
    path('platos', PlatosController.as_view()),
]
