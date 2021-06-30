import requests
from cms.models import DetalleModel, PedidoModel
from .models import ComprobanteModel
from dotenv import load_dotenv
from os import environ
load_dotenv()


def crearComprobante(tipo_comprobante: int, pedido: PedidoModel, observaciones: str):
    # sunat_transaction => sirve para indicar que tipo de transaccion se va a realizar, generalmente es 1
    # moneda => 1. SOLES | 2. DOLARES | 3. EUROS
    # formato_de_pdf => el formato en el cual se generara la venta (A4, A5, TICKET)

    # validar el tipo con el documentoCliente
    # pedido: PedidoModel = PedidoModel.objects.filter(pedidoId=pedidoId).first()
    # if pedido is None:
    #     raise Exception('No se encontro el pedido')

    cliente_denominacion = pedido.pedidoNombreCliente
    documento = pedido.pedidoDocumentoCliente
    fecha_de_emision = pedido.pedidoFecha
    # si en el caso nuestros productos tuviesen un igv, para ver el igv deberiamos hacerlo asi => total_gravada = total / 1.18  (total del producto sin el igv)
    # para agregar el igv => total * 1.18
    total = float(pedido.pedidoTotal)
    pedidos: list[DetalleModel] = pedido.pedidoDetalles.all()
    items = []
    for detalle in pedidos:
        unidad_de_medida = "NIU"
        codigo = detalle.plato.platoId
        descripcion = detalle.plato.platoNombre
        cantidad = detalle.detalleCantidad
        # valor_unitario => sin IGV
        # quitar igv del prodcuto = precio / 1.18
        valor_unitario = float(detalle.plato.platoPrecio) / 1.18
        # precio_unitario => con IGV
        precio_unitario = float(detalle.plato.platoPrecio)
        subtotal = valor_unitario * cantidad
        tipo_de_igv = 1
        # esto es el IGV pero del item
        igv = (valor_unitario * cantidad) * 0.18
        # total = detalle.detalleSubTotal
        anticipo_regularizacion = False
        json = {
            "unidad_de_medida": unidad_de_medida,
            "codigo": codigo,
            "descripcion": descripcion,
            "cantidad": cantidad,
            "valor_unitario": valor_unitario,
            "precio_unitario": precio_unitario,
            "subtotal": subtotal,
            "tipo_de_igv": tipo_de_igv,
            "igv": igv,
            "total": precio_unitario * cantidad,
            "anticipo_regularizacion": anticipo_regularizacion,
        }

        items.append(json)

    serie = ""
    # buscar la boleta O la factura mas reciente y de acuerdo al ultimo numero incrementar en 1, si es la primera vez que se crea una boleta o factura entonces colocar el numero 1
    # ComprobanteModel.objects.order_by('-comprobanteNumero')
    if tipo_comprobante == 1:
        serie = "FFF1"
        tipo_documento = 6
    elif tipo_comprobante == 2:
        serie = "BBB1"
        tipo_documento = 1
    ultimoComprobante = ComprobanteModel.objects.filter(
        comprobanteSerie=serie).order_by('-comprobanteNumero').first()
    if ultimoComprobante is None:
        numero = 1
    else:
        numero = ultimoComprobante.comprobanteNumero + 1

    total_gravada = total / 1.18
    comprobante = {
        "operacion": "generar_comprobante",
        "tipo_de_comprobante": tipo_comprobante,
        "serie": serie,
        "numero": numero,
        "sunat_transaction": 1,
        "cliente_tipo_de_documento": tipo_documento,
        "cliente_numero_de_documento": documento,
        "cliente_denominacion": cliente_denominacion,
        "cliente_email": "ederiveroman@gmail.com",
        "fecha_de_emision": fecha_de_emision.strftime("%d-%m-%Y"),
        "moneda": 1,
        "porcentaje_de_igv": 18.00,
        "total": total,
        "observaciones": observaciones,
        "enviar_automaticamente_a_la_sunat": True,
        "enviar_automaticamente_al_cliente": True,
        "total_igv": total - total_gravada,
        "total_gravada": total_gravada,
        "items": items
    }

    headers_nubefact = {
        "Authorization": environ.get('TOKEN_NUBEFACT'),
        "Content-Type": "application/json"
    }
    respuesta = requests.post(environ.get(
        'URL_NUBEFACT'), json=comprobante, headers=headers_nubefact)

    # print(respuesta.json())
    # almacenar ese comprobante en la tabla comprobanteModel
    rpta_json = respuesta.json()
    if rpta_json.get('errors'):
        return rpta_json

    nuevoComprobante = ComprobanteModel(
        comprobanteSerie=serie,
        comprobanteNumero=numero,
        comprobanteTipo=tipo_comprobante,
        comprobantePDF=rpta_json.get('enlace_del_pdf'),
        comprobanteCDR=rpta_json.get('enlace_del_cdr'),
        comprobanteXML=rpta_json.get('enlace_del_xml'),
        comprobanteDocCliente=documento,
        pedido=pedido
    )
    nuevoComprobante.save()
    return nuevoComprobante
