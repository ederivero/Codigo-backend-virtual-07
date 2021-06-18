from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from .models import LibroModel
from .serializers import LibroSerializer


# crear y listar todos los libros
class LibrosController(ListCreateAPIView):
    # todas las clases genericas necesitan un queryset y un serializer_class
    # queryset = es la consultar que hara a la bd cuando se llame a esta clase en un determinado metodo
    queryset = LibroModel.objects.all()  # SELECT * FROM libros
    # serializer_class = es el encargado de transformar la data que llega y que se envia al cliente
    serializer_class = LibroSerializer

    def get(self, request):
        # en el request se almacenan todos los datos que me manda el front(headers, body, cookies, auth)
        print(self.get_queryset())
        libros = self.get_queryset()
        respuesta = self.serializer_class(instance=libros, many=True)
        print(respuesta.data)
        return Response(data={
            'success': True,
            'content': respuesta.data,
            'message': None
        }, status=200)

    def post(self, request: Request):
        # la informacion mandada por el front (body) se recibira por el atributo data
        print(request.data)
        data = self.serializer_class(data=request.data)
        # el metodo is_valid() validara si la data pasada es o no es correcta, si cumple con lo necesitado para crear un nuevo libro, retorna un Bool (True | False)
        # adicionalmente podemos indicar un parametro llamado raise_exception => True automaticamente lanzara los errores que no permiten que la data sea valida, su valor x default es False
        valida = data.is_valid()
        if valida:
            # el metodo save() corresponde al serializador que cuando es de tipo ModelSerializer implemente los metodos de guardado y actualizacion en la bd
            data.save()
            # el atributo data me dara un diccionario ordenado con la informacion guardada en la bd (incluyendo campos de solo lectura) id
            return Response(data={
                "success": True,
                "content": data.data,
                "message": "Libro creado exitosamente"
            }, status=status.HTTP_201_CREATED)
        else:
            # el atributo errors me indicara todos los errores que no han permitido que la informacion sea valida
            return Response(data={
                "success": False,
                "content": data.errors,
                "message": 'La data no es valida',
            }, status=status.HTTP_400_BAD_REQUEST)


class LibroController(RetrieveUpdateDestroyAPIView):
    queryset = LibroModel.objects.all()
    serializer_class = LibroSerializer

    def get(self, request: Request, pk):
        libro = LibroModel.objects.filter(libroId=pk).first()
        pruebaLibro = LibroModel.objects.values(
            'libroId', 'libroNombre', 'libroEdicion', 'libroAutor', 'libroCantidad').filter(libroId=pk).first()
        print(pruebaLibro)
        if libro is not None:
            libroSerializado = self.serializer_class(instance=libro)
            return Response(data={
                "success": True,
                "content": libroSerializado.data,
                "message": None
            }, status=status.HTTP_200_OK)
        else:
            return Response(data={
                "message": "Libro no encontrado",
                "content": None,
                "success": False
            }, status=status.HTTP_404_NOT_FOUND)

    def put(self, request: Request, pk):
        libro = LibroModel.objects.filter(libroId=pk).first()
        if libro:
            data = self.serializer_class(data=request.data)
            # initial_data => retorna todos los campos que hace match con el modelo PERO no valida las funciones de unique_together ni los indices ni los campos unique
            # si queremos 'pasarnos de vivos' y actualizar un registro con otro saltandonos las reglas del unique_together igual no se podra porque ahi la bd entrara a trabjar directamente a pesar que en el ORM lo permitase
            libro_actualizado = self.serializer_class().update(
                instance=libro, validated_data=data.initial_data)

            print(libro_actualizado)
            return Response(data='ok')
        else:
            return Response(data={
                "message": "No se encontro el libro",
                "content": None,
                "success": False
            }, status=status.HTTP_404_NOT_FOUND)
