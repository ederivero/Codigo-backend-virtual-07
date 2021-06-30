from facturacion.models import ComprobanteModel
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ComprobanteSerializer, ComprobanteModelSerializer
from .generarComprobante import crearComprobante


class ComprobanteController(CreateAPIView):
    serializer_class = ComprobanteSerializer

    def post(self, request):
        data = self.serializer_class(data=request.data)
        # TODO: validar que si el pedido ya tiene un comprobante entonces no proceder
        if data.is_valid():
            comprobante = crearComprobante(
                tipo_comprobante=data.validated_data.get(
                    'tipoComprobante'),
                pedido=data.validated_data.get('pedidoId'),
                observaciones=data.validated_data.get('observaciones'))
            print(comprobante)

            if type(comprobante) == ComprobanteModel:
                data = ComprobanteModelSerializer(instance=comprobante)

                return Response(data={
                    "success": True,
                    "content": data.data,
                    "message": "Comprobante creado exitosamente"
                }, status=status.HTTP_201_CREATED)
            else:
                return Response(data={
                    "success": True,
                    "content": comprobante,
                    "message": "Comprobante creado exitosamente"
                }, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(data={
                "success": False,
                "content": data.errors,
                "message": "error al crear el comprobante"
            }, status=status.HTTP_400_BAD_REQUEST)
