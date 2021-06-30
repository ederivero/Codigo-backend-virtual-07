from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ComprobanteSerializer
from .generarComprobante import crearComprobante


class ComprobanteController(CreateAPIView):
    serializer_class = ComprobanteSerializer

    def post(self, request):
        data = self.serializer_class(data=request.data)
        if data.is_valid():
            crearComprobante(
                tipo_comprobante=data.validated_data.get(
                    'tipoComprobante'),
                pedido=data.validated_data.get('pedidoId'),
                observaciones=data.validated_data.get('observaciones'))
            return Response(data={
                "success": True
            })
        else:
            return Response(data={
                "success": False,
                "content": data.errors,
                "message": "error al crear el comprobante"
            }, status=status.HTTP_400_BAD_REQUEST)
