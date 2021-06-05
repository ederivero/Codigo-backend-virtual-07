from flask_restful import Resource, reqparse
from models.preparacion import PreparacionModel
from models.postre import PostreModel
from config.conexion_bd import base_de_datos

serializerPreparacion = reqparse.RequestParser(bundle_errors=True)
serializerPreparacion.add_argument(
    'orden',
    type=int,
    required=True,
    help='Falta el orden',
    location='json'
)
serializerPreparacion.add_argument(
    'descripcion',
    type=str,
    required=True,
    help='Falta la descripcion',
    location='json'
)
serializerPreparacion.add_argument(
    'postre_id',
    type=int,
    required=True,
    help='Falta el postre_id',
    location='json'
)


def validarPostre(postre_id):
    return base_de_datos.session.query(PostreModel).filter_by(postreId=postre_id).first()


class PreparacionesController(Resource):
    def post(self):
        data = serializerPreparacion.parse_args()
        nuevaPreparacion = PreparacionModel(
            data.get('orden'), data.get('descripcion'), data.get('postre_id'))
        if validarPostre(postre_id=data.get('postre_id')):
            # antes de guardar la nueva preparacion primero validar si el numero de orden ya esta guardado,
            orden = base_de_datos.session.query(PreparacionModel).filter_by(
                postre=data.get('postre_id'), preparacionOrden=data.get('orden')).first()
            if orden:
                return {
                    "success": False,
                    "content": None,
                    "message": "El orden %s para el postre %s ya fue tomado" % (data.get('orden'), data.get('postre_id'))
                }, 400
            #  # AVANZADO: ademas si es correlativo del anterior ejemplo: # orden 6: tengo q ver si ya esta el orden 5
            # SELECT * FROM PREPARACIONES WHERE POSTRE_ID = '' ORDER BY ORDEN DESC LIMIT 1;
            ultimoOrden = base_de_datos.session.query(PreparacionModel).filter_by(
                postre=data.get('postre_id')).order_by(PreparacionModel.preparacionOrden.desc()).first()
            if ultimoOrden:
                if ultimoOrden.preparacionOrden == int(data.get('orden'))-1:
                    # esta todo bien
                    nuevaPreparacion.save()
                else:
                    return {
                        "success": False,
                        "message": "El orden no es el que deberia ser",
                        "content": None
                    }
            else:
                if data.get('orden') == 1:
                    nuevaPreparacion.save()
                else:
                    return {
                        "success": False,
                        "message": "El orden inicial debe de ser 1",
                        "content": None
                    }
            return {
                "success": True,
                "content": nuevaPreparacion.json(),
                "message": "Preparacion creada exitosamente"
            }, 201
        else:
            return {
                "success": False,
                "content": None,
                "message": "Postre no existe"
            }, 400

    def get(self, postre_id):
        # SELECT orden, descripcion FROM preparaciones where postre_id = %s;
        # print(base_de_datos.session.query(PreparacionModel).filter_by(
        #     postre=postre_id).with_entities(PreparacionModel.preparacionDescripcion, PreparacionModel.preparacionOrden).all())
        data = base_de_datos.session.query(PreparacionModel).filter_by(
            postre=postre_id).order_by(PreparacionModel.preparacionOrden.asc()).all()
        if data:
            resultadoGeneral = data[0].preparacionPostre.json()
            resultado = []
            for preparacion in data:
                print(preparacion.preparacionPostre.json())
                resultado.append(preparacion.json())

            resultadoGeneral['preparaciones'] = resultado
            return {
                "success": True,
                "content": resultadoGeneral,
                "message": None
            }
        else:
            return {
                "success": True,
                "content": None,
                "message": "El postre aun no tiene preparaciones"
            }, 200
