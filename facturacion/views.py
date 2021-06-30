from rest_framework.generics import CreateAPIView


class ComprobanteController(CreateAPIView):
    def post(self, request):
        # mandar por el body => {
        # pedidoId,
        # tipoComprobante,
        # observaciones,
        # }
        # Validate => validar que el pedido exista, que el tipoComprobante sea 1 o 2 y las obs puedan ser opcionales
        pass
