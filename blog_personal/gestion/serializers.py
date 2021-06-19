from rest_framework import serializers
from .models import LibroModel
from django.utils.timezone import now


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
