from django.core.files.uploadedfile import InMemoryUploadedFile
from .models import *
from rest_framework import serializers
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.conf import settings
# from os import path


class PlatoSerializer(serializers.ModelSerializer):
    platoFoto = serializers.CharField(max_length=100)

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
        token['user_mail'] = user.usuarioCorreo
        token['mensaje'] = 'Holis'
        return token


class RegistroUsuarioSerializer(serializers.ModelSerializer):
    # forma 1 para modificar algun atributo del model
    # password = serializers.CharField(write_only=True)

    def save(self):
        usuarioNombre = self.validated_data.get('usuarioNombre')
        usuarioApellido = self.validated_data.get('usuarioApellido')
        usuarioCorreo = self.validated_data.get('usuarioCorreo')
        usuarioTipo = self.validated_data.get('usuarioTipo')
        usuarioTelefono = self.validated_data.get('usuarioTelefono')
        password = self.validated_data.get('password')
        nuevoUsuario = UsuarioModel(
            usuarioNombre=usuarioNombre,
            usuarioCorreo=usuarioCorreo,
            usuarioApellido=usuarioApellido,
            usuarioTipo=usuarioTipo,
            usuarioTelefono=usuarioTelefono
        )
        nuevoUsuario.set_password(password)
        nuevoUsuario.save()
        return nuevoUsuario

    class Meta:
        model = UsuarioModel
        # fields = ['usuarioNombre', 'usuarioApellido']
        exclude = ['groups', 'user_permissions']
        # es para dar configuracion adicional a los atributos de un model serializer, usando el atributo extra_kwargs se puede editar la configuracion de si solo escritura, solo lectura, required, allow null, default y error messages
        # no es necesario volver a declarar las mismas configuraciones iniciales ()
        extra_kwargs = {
            'password': {
                'write_only': True
            },
            'usuarioId': {
                'read_only': True
            }
        }


class MesaSerializer(serializers.ModelSerializer):
    class Meta:
        model = MesaModel
        fields = '__all__'


class DetalleSerializer(serializers.Serializer):
    cantidad = serializers.IntegerField(min_value=1)
    plato = serializers.IntegerField(min_value=1)

    def validate(self, data):
        # ITERARLO
        # buscar si existe el plato (hacerlo en el serializer)
        try:
            data['plato'] = PlatoModel.objects.get(platoId=data.get('plato'))
        except:
            raise serializers.ValidationError(
                detail='El plato no existe'
            )
        if data['plato'].platoCantidad < data.get('cantidad'):
            raise serializers.ValidationError(
                detail='La cantidad es mayor que la disponible'
            )
        return data


class PedidoSerializer(serializers.Serializer):
    documento_cliente = serializers.CharField(
        required=False, min_length=8, max_length=11)
    mesa = serializers.IntegerField(min_value=1)
    detalle = DetalleSerializer(many=True)

    def validate(self, data):
        # for detalle_simple in data.get('detalle'):
        #     try:
        #         detalle_simple['plato'] = PlatoModel.objects.get(platoId=data.get('plato'))
        #     except:
        #         raise serializers.ValidationError(
        #             detail='El plato no existe'
        #         )
        #     if detalle_simple['plato'].platoCantidad < detalle_simple.get('cantidad'):
        #         raise serializers.ValidationError(
        #             detail='La cantidad es mayor que la disponible'
        #         )
        # validar si la mesa existe en la bd
        try:
            data['mesa'] = MesaModel.objects.get(mesaId=data.get('mesa'))
        except:
            raise serializers.ValidationError(
                detail='La mesa no existe'
            )

        # si hay un documento_cliente Y si es que alguna de la siguientes condiciones es verdadera: si la longitudo del documento es 8 O la longitudo del documento es 11
        if data.get('documento_cliente') and (len(data.get('documento_cliente')) == 8 or len(data.get('documento_cliente')) == 11):
            return data
        if data.get('documento_cliente') is None:
            return data
        raise serializers.ValidationError(
            detail='El documento debe ser 8 u 11 caracteres')
