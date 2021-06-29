import decimal
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
from rest_framework.permissions import AllowAny, IsAuthenticated
import os
from django.conf import settings
import requests
from dotenv import load_dotenv
from django.db import transaction
load_dotenv()


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
    # permision_classes => sirve para declarar las opciones de autorizacion que seran requeridas al consultar las rutas de este controlador
    permission_classes = [IsAuthenticated]

    def post(self, request: Request):
        data = self.serializer_class(data=request.data)
        print(request.user)
        # request.auth => mostrara la token que se esta enviando al controlador en el apartado de headers> Authorization
        # request.user => retornara la instancia de usuario si es que existe, caso contrario retornara None
        if data.is_valid():
            documento_cliente = data.validated_data.get('documento_cliente')
            detalles = data.validated_data.get('detalle')
            mesa = data.validated_data.get('mesa')
            if documento_cliente:
                if len(documento_cliente) == 8:
                    url = "https://apiperu.dev/api/dni/{}".format(
                        documento_cliente)

                elif len(documento_cliente) == 11:
                    url = "https://apiperu.dev/api/ruc/{}".format(
                        documento_cliente)
                headers = {
                    "Authorization": "Bearer " + os.environ.get('API_PERU', ''),
                    "Content-Type": "application/json"
                }
                try:
                    respuesta = requests.get(url=url, headers=headers)
                    json = respuesta.json()
                    # print(respuesta.ok)
                    print(respuesta.json())
                    # print(respuesta.status_code)

                    if(json.get('success') == False):
                        return Response(data='usuario incorrecto')

                    with transaction.atomic():
                        # colocar el nombre completo del cliente tanto como si fuese DNI o RUC
                        dataJson = json.get('data')
                        nuevoPedido = PedidoModel(pedidoTotal=0.0, pedidoNombreCliente=dataJson.get('nombre_completo') if dataJson.get('nombre_completo') else dataJson.get('nombre_o_razon_social'),
                                                  pedidoDocumentoCliente=documento_cliente,
                                                  usuario=request.user,
                                                  mesa=mesa)

                        nuevoPedido.save()
                        total_general = 0.00
                        for detalle in detalles:
                            # crear el detalle
                            plato: PlatoModel = detalle.get('plato')
                            subtotal = int(detalle.get('cantidad')) * \
                                plato.platoPrecio

                            nuevoDetalle = DetalleModel(
                                detalleCantidad=detalle.get('cantidad'),
                                detalleSubTotal=subtotal,
                                pedido=nuevoPedido,
                                plato=plato)

                            nuevoDetalle.save()

                            # descontar la cantidad del registro del plato
                            plato.platoCantidad -= int(detalle.get('cantidad'))
                            # plato.platoCantidad = plato.platoCantidad - int(detalle.get('cantidad'))
                            plato.save()

                            total_general += float(subtotal)

                        # agregar la cantidad a la cabecera del pedido
                        nuevoPedido.pedidoTotal += total_general
                        # nuevoPedido.pedidoTotal =  nuevoPedido.pedidoTotal + float(subtotal)
                        nuevoPedido.save()

                except Exception as e:
                    return Response(data={
                        "message": 'error al realizar la transaccion',
                        "success": False,
                        "content": e.args,
                    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response(data={
                "success": True,
                "content": None,
                "message": "Pedido Generado exitosamente"
            }, status=status.HTTP_201_CREATED)

        else:
            return Response(data={
                "success": False,
                "content": data.errors,
                "message": "Error al crear el pedido"
            }, status=status.HTTP_400_BAD_REQUEST)
