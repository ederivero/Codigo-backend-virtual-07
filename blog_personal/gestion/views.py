from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from .models import LibroModel
from .serializers import LibroSerializer


# crear y listar todos los libros
class LibrosController(ListCreateAPIView):
    # todas las clases genericas necesitan un queryset y un serializer_class
    # queryset = es la consultar que hara a la bd cuando se llame a esta clase en un determinado metodo
    queryset = LibroModel.objects.all()  # SELECT * FROM libros
    # serializer_class = es el encargado de transformar la data que llega y que se envia al cliente
    serializer_class = LibroSerializer
