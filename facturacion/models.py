from typing import Tuple
from django.db import models
from cms.models import PedidoModel


class ComprobanteModel(models.Model):
    TIPO_COMPROBANTE = [
        (1, 'BOLETA'),
        (2, 'FACTURA')
    ]
    comprobanteId = models.AutoField(
        primary_key=True,
        unique=True,
        db_column='id'
    )

    comprobanteSerie = models.CharField(
        max_length=4,
        db_column='serie',
        null=False
    )

    comprobanteNumero = models.IntegerField(
        db_column='numero',
        null=False
    )

    comprobanteTipo = models.IntegerField(
        choices=TIPO_COMPROBANTE,
        db_column='tipo',
        null=False
    )

    comprobantePDF = models.TextField(
        db_column='PDF',
        null=False
    )

    comprobanteCDR = models.TextField(
        db_column='CDR',
        null=True
    )

    comprobanteXML = models.TextField(
        db_column='XML',
        null=False
    )

    comprobanteDocCliente = models.CharField(
        max_length=11,
        db_column='doc_cliente'
    )

    pedido = models.OneToOneField(
        to=PedidoModel,
        db_column='pedido_id',
        on_delete=models.CASCADE,
        unique=True,
        related_name='pedidoComprobantes'
    )

    class Meta:
        db_table = 'comprobantes'
