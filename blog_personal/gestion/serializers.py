from rest_framework import serializers
from .models import LibroModel


class LibroSerializer(serializers.ModelSerializer):
    class Meta:
        # model => definir en que modelo se basara para la serializacion
        model = LibroModel
        # fields => indica que campos seran necesarios para el funcionamiento de este serializer
        fields = '__all__'
        # fields => si queremos usar la minoria de columnas se declarara en una lista o tupla
        # fields = ['col1'] | fields = ('col1',)
        # exclude => excluira la o las columnas definidas
        # exclude= ['libroId']
        # NOTA no se puede usar a la vez el atributo fields con el atributo exclude
        # en el exclude no existe la opcion de poner '__all__'
