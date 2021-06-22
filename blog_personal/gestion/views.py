from rest_framework.generics import CreateAPIView, ListCreateAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.request import Request
from django.utils.timezone import now
from rest_framework import status
from rest_framework.decorators import api_view
from .models import LibroModel, PrestamoModel, UsuarioModel
from .serializers import (LibroSerializer,
                          BusquedaLibroSerializer,
                          UsuarioSerializer,
                          PrestamoSerializer)

from rest_framework.pagination import PageNumberPagination


class PaginacionPersonalizada(PageNumberPagination):
    # es el nombre de la variable que usaremos en la paginacion, su valor x default es page
    page_query_param = 'pagina'
    # es el valor predeterminado para la cantidad de items x pagina
    page_size = 2
    # es el nombre de la variable que usaremos para la cantidad de elementos que el usuario desea
    page_size_query_param = 'cantidad'
    # si el usuario me manda un elemento mayor que el max_page_size entonces usaremos el max_page_size (el tope de elementos por hoja)
    max_page_size = 10

    def get_paginated_response(self, data):
        return Response(data={
            'paginacion': {
                'paginaContinua': self.get_next_link(),
                'paginaPrevia': self.get_previous_link(),
                'total': self.page.paginator.count
            },
            'data': {
                "success": True,
                "content": data,
                "message": None
            }
        }, status=200)


class LibrosController(ListCreateAPIView):
    # todas las clases genericas necesitan un queryset y un serializer_class
    # queryset = es la consultar que hara a la bd cuando se llame a esta clase en un determinado metodo
    queryset = LibroModel.objects.all()  # SELECT * FROM libros
    # serializer_class = es el encargado de transformar la data que llega y que se envia al cliente
    serializer_class = LibroSerializer
    pagination_class = PaginacionPersonalizada

    # def get(self, request):
    #     # en el request se almacenan todos los datos que me manda el front(headers, body, cookies, auth)
    #     # print(self.get_queryset())
    #     libros = self.get_queryset()
    #     respuesta = self.serializer_class(instance=libros, many=True)
    #     # print(respuesta.data)
    #     return Response(data={
    #         'success': True,
    #         'content': respuesta.data,
    #         'message': None
    #     }, status=200)

    def post(self, request: Request):
        # la informacion mandada por el front (body) se recibira por el atributo data
        # print(request.data)
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

    def get(self, request: Request, id):
        libro = LibroModel.objects.filter(libroId=id).first()
        pruebaLibro = LibroModel.objects.values(
            'libroId', 'libroNombre', 'libroEdicion', 'libroAutor', 'libroCantidad').filter(libroId=id).first()
        # print(pruebaLibro)
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

    def put(self, request: Request, id):
        libro = LibroModel.objects.filter(libroId=id).first()
        if libro:
            data = self.serializer_class(data=request.data)
            # initial_data => retorna todos los campos que hace match con el modelo PERO no valida las funciones de unique_together ni los indices ni los campos unique
            # si queremos 'pasarnos de vivos' y actualizar un registro con otro saltandonos las reglas del unique_together igual no se podra porque ahi la bd entrara a trabjar directamente a pesar que en el ORM lo permitase
            libro_actualizado = self.serializer_class().update(
                instance=libro, validated_data=data.initial_data)

            # print(libro_actualizado)
            return Response(data='ok')
        else:
            return Response(data={
                "message": "No se encontro el libro",
                "content": None,
                "success": False
            }, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request: Request, id):
        # se actualize el campo deleted_at del libro
        libro: LibroModel = LibroModel.objects.filter(pk=id).first()
        libro.deletedAt = now()
        libro.save()
        # el metodo delete de la instancia elimina el registro de la bd y retornara, el total de registros eliminados
        # libro.delete()
        data = self.serializer_class(instance=libro)
        return Response(data={
            "success": True,
            "content": data.data,
            "message": "Se inhabilito el libro exitosamente"
        })


@api_view(http_method_names=['GET'])
def busqueda_libros(request: Request):
    # print(request.query_params)
    nombre = request.query_params.get('nombre')
    autor = request.query_params.get('autor')
    # nombre = nombre del libro
    # autor = autor de los libros
    # 1. ver que parametros me manda el front
    # ambos parametros son opcionales (si no me manda nada retornare todos los libros)
    # hacer la busqueda dependiendo de los parametros

    # https://docs.djangoproject.com/en/3.2/ref/models/querysets/#field-lookups
    # SELECT * FROM LIBROS WHERE LIBRONOMBRE LIKE '%'+nombre+'%'
    # Metodo corto
    resultado = LibroModel.objects.filter(
        libroNombre__contains=nombre if nombre else '',
        libroAutor__contains=autor if autor else '').order_by('libroNombre').all()
    # Metodo largo
    # if nombre and autor:
    #     resultado = LibroModel.objects.filter(
    #         libroNombre__contains=nombre, libroAutor__contains=autor).order_by('libroNombre').all()
    # elif nombre:
    #     resultado = LibroModel.objects.filter(
    #         libroNombre__contains=nombre).order_by('libroNombre').all()
    # elif autor:
    #     resultado = LibroModel.objects.filter(
    #         libroAutor__contains=autor).order_by('libroNombre').all()
    # else:
    #     resultado = LibroModel.objects.filter().order_by('libroNombre').all()
    resultadoSerializado = LibroSerializer(instance=resultado, many=True)
    # print(resultado)
    return Response(data={
        "success": True,
        "content": resultadoSerializado.data,
        "message": None
    })

# Exponer el endpoint cuya finalidad sea dependiendo de un rango de fechas mostrar todos los libros cuya edicion se realizaron en esas fechas


@api_view(http_method_names=['GET', 'POST'])
def buscador_edicion(request: Request):
    if request.method == 'POST':
        return Response(data={
            "success": False,
            "content": None,
            "message": "Metodo incorrecto!"
        }, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    elif request.method == 'GET':

        param_serializados = BusquedaLibroSerializer(data=request.query_params)
        param_serializados.initial_data
        if param_serializados.is_valid():
            # print(param_serializados.validated_data)
            libros = LibroModel.objects.filter(libroEdicion__range=(
                param_serializados.validated_data.get('inicio'), param_serializados.validated_data.get('fin')))
            librosSerializados = LibroSerializer(instance=libros, many=True)
            return Response(data={
                "success": True,
                "message": None,
                "content": librosSerializados.data
            })
        else:
            # print(param_serializados.errors)
            return Response(data={
                "success": False,
                "message": param_serializados.errors,
                "content": None
            })


class UsuariosController(ListCreateAPIView):
    queryset = UsuarioModel.objects.all()
    serializer_class = UsuarioSerializer
    pagination_class = PaginacionPersonalizada


class PrestamosController(CreateAPIView):
    queryset = PrestamoModel.objects.all()
    serializer_class = PrestamoSerializer

    def post(self, request: Request):
        data = request.data
        nuevoPrestamo = PrestamoSerializer(data=data)
        # nuevoPrestamo.validacion()
        if nuevoPrestamo.is_valid():
            respuesta = nuevoPrestamo.save()
            print(type(respuesta))
            if type(respuesta) is PrestamoModel:
                # una vez realizado el prestamo, ahora tener que disminuir la cantidad de ese libro.
                return Response(data={
                    "success": True,
                    "content": nuevoPrestamo.data,
                    "message": "Prestamo agregado exitosamente"
                }, status=status.HTTP_201_CREATED)

        return Response(data={
            "success": False,
            "content": nuevoPrestamo.errors or respuesta if type(respuesta) is str else respuesta.args,
            "message": "Error al crear el prestamo"
        }, status=status.HTTP_400_BAD_REQUEST)


class PrestamoController(RetrieveAPIView):
    queryset = PrestamoModel.objects.all()
    serializer_class = PrestamoSerializer

    def get(self, request, id):
        pass
