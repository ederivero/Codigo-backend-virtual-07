from facturacion.models import ComprobanteModel
from rest_framework import serializers
from cms.models import PedidoModel


class ComprobanteSerializer(serializers.Serializer):
    pedidoId = serializers.IntegerField()
    tipoComprobante = serializers.ChoiceField(choices=[1, 2])
    observaciones = serializers.CharField(max_length=1000, required=False)

    def validate(self, data):
        try:
            data['pedidoId'] = PedidoModel.objects.get(
                pedidoId=data.get('pedidoId'))
            return data
        except:
            raise serializers.ValidationError(detail='El pedido no existe')


class ComprobanteModelSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = ComprobanteModel
