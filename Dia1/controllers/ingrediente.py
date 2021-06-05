from flask_restful import Resource, reqparse
from models.ingrediente import IngredienteModel
from config.conexion_bd import base_de_datos
# POST TODOS /ingredientes
# GET TODOS /ingredientes
# PUT ID  /ingredientes/<int:id>
# GET ID  /ingredientes/<int:id>
serializer = reqparse.RequestParser(bundle_errors=True)
serializer.add_argument(
    'nombre',
    required=True,
    location='json',
    help='Falta el nombre',
    type=str,
)


class IngredientesController(Resource):
    def post(self):
        data = serializer.parse_args()
        nuevoIngrediente = IngredienteModel(data.get('nombre'))
        nuevoIngrediente.save()
        return {
            "success": True,
            "content": nuevoIngrediente.json(),
            "message": "Ingrediente registrado exitosamente"
        }, 201

    def get(self):
        ingredientes = base_de_datos.session.query(IngredienteModel).all()
        resultado = []
        for ingrediente in ingredientes:
            resultado.append(ingrediente.json())
        return {
            "success": True,
            "content": resultado,
            "message": None
        }


class IngredienteController(Resource):
    def get(self, id):
        ingrediente = base_de_datos.session.query(
            IngredienteModel).filter_by(ingredienteId=id).first()
        if ingrediente:
            return {
                "success": True,
                "content": ingrediente.json(),
                "message": None
            }
        else:
            return {
                "success": False,
                "content": None,
                "message": "Ingrediente no encontrado"
            }, 404

    def put(self, id):
        ingrediente = base_de_datos.session.query(
            IngredienteModel).filter_by(ingredienteId=id).first()
        if ingrediente:
            data = serializer.parse_args()
            ingrediente.ingredienteNombre = data.get('nombre')
            ingrediente.save()
            return {
                "success": True,
                "content": ingrediente.json(),
                "message": None
            }
        else:
            return {
                "success": False,
                "content": None,
                "message": "Ingrediente no encontrado"
            }, 404
