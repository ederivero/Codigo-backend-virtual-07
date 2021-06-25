from .models import *
from rest_framework import serializers


class PlatoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlatoModel
        fields = '__all__'
