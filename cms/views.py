from .models import PlatoModel
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView)
from .serializers import *
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
import os
from django.conf import settings


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
        # para ver que archivos me esta mandando el frontend
        print(request.FILES)
        return Response(data='ok')


class CustomPayloadController(TokenObtainPairView):
    """Sirve para modificar el payload de la token de acceso"""
    permission_classes = [AllowAny]
    serializer_class = CustomPayloadSerializer
