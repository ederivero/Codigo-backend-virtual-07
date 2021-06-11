from flask_restful import Resource, reqparse
from models.movimiento import MovimientoModel
from datetime import datetime
from flask_jwt import jwt_required, current_identity


# CREATE
# READ
class MovimientosController(Resource):
    movimientoSerializer = reqparse.RequestParser(bundle_errors=True)

    movimientoSerializer.add_argument(
        'nombre',
        type=str,
        required=True,
        help='Falta el nombre',
        location='json',
    )
    movimientoSerializer.add_argument(
        'monto',
        type=float,
        required=True,
        help='Falta el monto',
        location='json',
    )
    movimientoSerializer.add_argument(
        'fecha',
        type=str,
        required=False,
        location='json',
    )
    movimientoSerializer.add_argument(
        'imagen',
        type=str,
        required=False,
        location='json',
    )
    movimientoSerializer.add_argument(
        'tipo',
        type=str,
        required=True,
        help='Falta el tipo',
        location='json',
        choices=['ingreso', 'egreso']
    )

    # con el decorador jwt_required estoy indicando que este metodo de esta clase tiene que recibir una token (es protegida)
    @jwt_required()
    def post(self):
        print("La identidad es ")
        # esto funcionara en base al identificador de config/segudirad.py ya que al validar la identificacion me retornara el objeto del usuario con su metodo json
        print(current_identity)
        data = self.movimientoSerializer.parse_args()
        print(data)
        # %Y => año
        # %m => mes
        # %d => dia
        # %H => hora
        # %M => minuto
        # %S => segundo
        try:
            # strptime => convierte de un STRING a una FECHA mediante un formato
            # strftime => conviente de una FECHA a un STRING
            fecha = datetime.strptime(data['fecha'], '%Y-%m-%d %H:%M:%S')
            # fecha_en_texto = fecha.strftime('%Y-%m-%d %H:%M:%S')
            nuevoMovimiento = MovimientoModel(data['nombre'], data['monto'], fecha,
                                              data['imagen'], data['tipo'], current_identity.get
                                              ('usuarioId'))
            nuevoMovimiento.save()
            return {
                "success": True,
                "message": "Movimiento registrado exitosamente",
                "content": nuevoMovimiento.json(),
            }
        except:
            return {
                "success": False,
                "message": "Formato de fecha incorrecto, el formato es YYYY-MM-DD HH:MM:SS",
                "content": None
            }

    def get(self):
        pass
