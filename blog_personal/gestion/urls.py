from django.urls import path
from .views import LibrosController

urlpatterns = [
    path('/libros', LibrosController.as_view(), name='create-read-libros'),
]
