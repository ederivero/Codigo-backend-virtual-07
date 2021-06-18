from django.urls import path
from .views import LibrosController, LibroController

urlpatterns = [
    path('libros', LibrosController.as_view(), name='create-read-libros'),
    path('libros/<int:pk>', LibroController.as_view())
]
