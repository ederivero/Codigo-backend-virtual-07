from django.core.files.uploadedfile import InMemoryUploadedFile
from .models import *
from rest_framework import serializers
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.conf import settings
# from os import path


class PlatoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlatoModel
        fields = '__all__'


class ArchivoSerializer(serializers.Serializer):
    # max_length => indica el tamaño maximo del nombre del archivo
    # use_url => si es True, entonces el valor de la URL sera usado para mostrar la ubicacion del archivo, si es False entonces se usara el nombre del archivo para su representacion, su valor por defecto es UPLOADED_FILES_USE_URL que significa True en la configuracion interna de DRF
    archivo = serializers.ImageField(max_length=20, use_url=True)

    def save(self):
        archivo: InMemoryUploadedFile = self.validated_data.get('archivo')
        # para ver el tipo de archivo que es
        # print(archivo.content_type)
        # para ver el nombre del archivo
        # print(archivo.name)
        # para ver el tamaño del archivo en bytes
        # print(archivo.size)
        # para leer el archivo, una vez que se lee el archivo se elimina su informacion
        # archivo.read()

        ruta = default_storage.save(
            archivo.name, ContentFile(archivo.read()))
        return settings.MEDIA_URL + ruta
        # ruta_final = path.join(settings.MEDIA_ROOT, ruta)
        # print(ruta)
        # print(ruta_final)


class EliminarArchivoSerializer(serializers.Serializer):
    nombre = serializers.CharField()


class CustomPayloadSerializer(TokenObtainPairSerializer):
    # un funcion incorparada en python que devuelve un metodo de la clase de la cual se esta heredando
    # el metodo recibira la clase como primer argumento, cuando se llama a este metodo, se pasa a la clase como primer argumento en lugar de la instancia de la clase esto significa que puede utilizar la clase entera junto con sus propiedades dentro de este metodo sin tener que instanciar la clase
    @classmethod
    def get_token(cls, user: UsuarioModel):
        token = super(CustomPayloadSerializer, cls).get_token(user)
        print(token)
        token['usuarioTipo'] = user.usuarioTipo
        token['mensaje'] = 'Holis'
        return token
