from django.urls import path
from .views import LibrosController, LibroController, busqueda_libros, buscador_edicion

urlpatterns = [
    path('libros', LibrosController.as_view(), name='create-read-libros'),
    path('libros/<int:id>', LibroController.as_view()),
    path('busqueda_libros', busqueda_libros),
    path('busqueda_libros_edicion', buscador_edicion),
]
