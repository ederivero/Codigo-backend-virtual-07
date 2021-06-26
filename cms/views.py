from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListCreateAPIView,
    ListAPIView)
from rest_framework.pagination import PageNumberPagination
from .serializers import *
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
import os
from django.conf import settings
import requests


class ArchivosController(CreateAPIView):
    serializer_class = ArchivoSerializer

    def post(self, request: Request):

        data = self.serializer_class(data=request.FILES)
        if data.is_valid():

            url = request.META.get('HTTP_HOST')
            # retornar la ruta (el nombre del archivo)
            archivo = data.save()
            return Response(data={
                "success": True,
                "content": url + archivo,
                "message": "Archivo subido exitosamente"
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(data={
                "success": False,
                "content": data.errors,
                "message": "Error al subir el archivo"
            }, status=status.HTTP_400_BAD_REQUEST)

# hacer la eliminacion de un archivo


class EliminarArchivoController(DestroyAPIView):
    serializer_class = EliminarArchivoSerializer

    def delete(self, request: Request):
        # definir el controlador y la ruta
        # mediante el nombre del archivo intentar eliminarlo , si no se encuentra el archivo retornar un mensaje que ya fue eliminado con un stado 200
        data = self.serializer_class(data=request.data)

        try:
            if data.is_valid():
                os.remove(settings.MEDIA_ROOT /
                          data.validated_data.get('nombre'))
                return Response(data={
                    "success": True,
                    "content": None,
                    "message": "Imagen eliminada exitosamente"
                })
            else:
                return Response(data={
                    "success": False,
                    "content": data.errors,
                    "message": "Error al eliminar la imagen"
                }, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(data={
                "success": False,
                "content": None,
                "message": "Imagen ya fue eliminada previamente"
            })


class PlatosController(ListCreateAPIView):
    queryset = PlatoModel.objects.all()
    serializer_class = PlatoSerializer

    def post(self, request: Request):
        data = self.serializer_class(data=request.data)
        if data.is_valid():
            data.save()
            return Response(data={
                "success": True,
                "content": data.data,
                "message": "Creacion de plato exitosa"
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(data={
                "success": False,
                "content": data.errors,
                "message": "Error al crear el plato"
            }, status=status.HTTP_400_BAD_REQUEST)


class CustomPayloadController(TokenObtainPairView):
    """Sirve para modificar el payload de la token de acceso"""
    permission_classes = [AllowAny]
    serializer_class = CustomPayloadSerializer

    def post(self, request):
        data = self.serializer_class(data=request.data)
        if data.is_valid():
            print(data.validated_data)
            return Response(data={
                "success": True,
                "content": data.validated_data,
                "message": "Login exitoso"
            })

        else:
            # no indicara si es que el usario es incorrecto
            return Response(data={
                "success": False,
                "content": data.errors,
                "message": "error de generacion de la jwt"
            })


class RegistroUsuarioController(CreateAPIView):
    serializer_class = RegistroUsuarioSerializer

    def post(self, request: Request):
        data = self.serializer_class(data=request.data)
        if data.is_valid():
            data.save()
            return Response({
                "message": "Usuario Creado exitosamente",
                "content": data.data,
                "success": True
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                "message": "Error al crear el usuario",
                "content": data.errors,
                "success": False
            })


class PaginacionMesa(PageNumberPagination):
    page_query_param = "pagina"
    page_size = 3
    max_page_size = 5
    page_size_query_param = "cantidad"

    def get_paginated_response(self, data):
        return Response(data={
            "data": {
                "success": True,
                "content": data,
                "message": None
            },
            "paginacion": {
                "pagPrev": self.get_previous_link(),
                "pagSig": self.get_next_link(),
                "total": self.page.paginator.count
            }
        })


class MesaController(ListAPIView):
    # hacer el metodo de devolucion de las mesas PAGINADO el numero de registro x defecto sea 3 y un maximo de 5 y respetar el formato data: {success, content, message} paginacion: {...}
    pagination_class = PaginacionMesa
    serializer_class = MesaSerializer
    queryset = MesaModel.objects.all()


class PedidoController(CreateAPIView):
    serializer_class = PedidoSerializer

    def post(self, request: Request):
        data = self.serializer_class(data=request.data)
        if data.is_valid():
            documento_cliente = data.validated_data.get('documento_cliente')
            if documento_cliente:
                if len(documento_cliente) == 8:
                    url = "https://apiperu1.dev/api/dni/{}".format(
                        documento_cliente)

                elif len(documento_cliente) == 11:
                    url = "https://apiperu.dev/api/ruc/{}".format(
                        documento_cliente)
                headers = {
                    "Authorization": "Bearer 6287da8da77342f7e4aab59b670dbe153f0e803c2553e7a7dcbcc7d2510ba793",
                    "Content-Type": "application/json"
                }
                try:
                    respuesta = requests.get(url=url, headers=headers)
                    print(respuesta.ok)
                    print(respuesta.json())
                    print(respuesta.status_code)
                except:
                    print('error la api se cayo')

            return Response(data='ok')
        else:
            return Response(data={
                "success": False,
                "content": data.errors,
                "message": "Error al crear el pedido"
            })
