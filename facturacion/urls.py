from django.urls import path
from .views import ComprobanteController

urlpatterns = [
    path('generarComprobante', ComprobanteController.as_view()),
]
