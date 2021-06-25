from .models import PlatoModel
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import *


class PlatosController(ListCreateAPIView):
    queryset = PlatoModel.objects.all()
    serializer_class = PlatoSerializer

    def post(self, request: Request):
        # para ver que archivos me esta mandando el frontend
        print(request.FILES)
        return Response(data='ok')
