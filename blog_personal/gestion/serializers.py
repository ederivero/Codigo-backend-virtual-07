from datetime import date
from rest_framework import serializers
from .models import LibroModel, PrestamoModel, UsuarioModel
from django.utils.timezone import now
from django.db import transaction, Error


class LibroSerializer(serializers.ModelSerializer):
    class Meta:
        # model => definir en que modelo se basara para la serializacion
        model = LibroModel
        # fields => indica que campos seran necesarios para el funcionamiento de este serializer
        # fields = '__all__'
        exclude = ['deletedAt']
        # fields => si queremos usar la minoria de columnas se declarara en una lista o tupla
        # fields = ['col1'] | fields = ('col1',)
        # exclude => excluira la o las columnas definidas
        # exclude= ['libroId']
        # NOTA no se puede usar a la vez el atributo fields con el atributo exclude
        # en el exclude no existe la opcion de poner '__all__'


class BusquedaLibroSerializer(serializers.Serializer):
    inicio = serializers.IntegerField(
        required=True,
        help_text="Ingrese la fecha de inicio",
        min_value=1990,
        max_value=now().year,
        # error_message => modifica los mensajes de errores cuando no se de correctamente la info
        error_messages={
            # el tipo de dato es incorrecto
            'incorrect_type': 'Tipo de dato incorrecto, se esperaba un int pero se mando un {input_type}',
            # cuando required=True pero no se provee
            'required': 'Falta el inicio',
            # la variable no cumple con el tipo de dato
            'invalid': 'Tipo de dato incorrecto, se esperaba un int pero se mando un string',
            'max_value': 'error la data maxima es {max_value}'
        }
    )
    fin = serializers.IntegerField(
        required=True,
        help_text="Ingrese la fecha de fin",
        error_messages={
            'max_value': 'Error la data maxima es {max_value}',
            'min_value': 'Error el valor minimo es {min_value}'
        },
        min_value=1990,
        max_value=now().year
    )

    def validate(self, data):
        """Metodo que se ejecutara cuando nosotros llamemos al is_valid()"""
        if data.get('inicio') <= data.get('fin'):
            return data
        raise serializers.ValidationError(
            detail='Inicio debe de ser menor que fin')


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioModel
        fields = '__all__'


class PrestamoSerializer(serializers.ModelSerializer):
    # def validate(self, data):
    # mover las siguientes validaciones al metodo validate
    # validar si el usuario no tiene un prestamo activo
    # validar si el libro no fue inhabilitado (deleteAt)
    # no usar el self.validated_data sino el self.initial_data pero el initial_data no hace la busqueda del libro ni del usuario
    # return data

    # def validacion(self):
    #     pass
    def validate(self, data):
        prestamoActivo = PrestamoModel.objects.filter(
            usuario=self.initial_data.get('usuario'),
            prestamoEstado=True
        ).first()
        if prestamoActivo:
            raise serializers.ValidationError(
                {'usuario': "El usuario tiene un prestamo activo"})
        libro = LibroModel.objects.filter(
            libroId=self.initial_data.get('libro')).first()
        if libro.deletedAt:
            raise serializers.ValidationError(
                {'prestamo': "El libro no esta disponible"})
        return data

    def save(self):
        if self.validated_data.get('libro').libroCantidad > 0:
            try:
                with transaction.atomic():
                    self.validated_data.get('libro').libroCantidad = self.validated_data.get(
                        'libro').libroCantidad - 1
                    # guardamos esa modificacion del libro en la bd
                    self.validated_data.get('libro').save()
                    # creamos la nueva instancia de Prestamo model con todos sus parametros
                    nuevoPrestamo = PrestamoModel(
                        prestamoFechaInicio=self.validated_data.get(
                            'prestamoFechaInicio', date.today()),
                        prestamoFechaFin=self.validated_data.get(
                            'prestamoFechaFin'),
                        prestamoEstado=self.validated_data.get(
                            'prestamoEstado', True),
                        usuario=self.validated_data.get('usuario'),
                        libro=self.validated_data.get('libro'),
                    )
                    # guardamos esa instancia en la base de datos generando un nuevo prestamo
                    nuevoPrestamo.save()
                    # retornamos el nuevo prestamo creado
                    return nuevoPrestamo
            except Error as error:
                print(error)
                return error
        else:
            # lanzaremos un error de validacion cuando no exista el libro O el usuario
            return 'El libro no tiene suficientes unidades'

    class Meta:
        model = PrestamoModel
        fields = '__all__'
