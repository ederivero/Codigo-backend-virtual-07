# un controlador es el comportamiento que va a tener mi API cuando se llame a determinada ruta
# /postres GET => mostrar los postres
from flask_restful import Resource, reqparse
from models.postre import PostreModel
from config.conexion_bd import base_de_datos
# serializer (serializador)
# https://flask-restful.readthedocs.io/en/latest/reqparse.html
serializerPostres = reqparse.RequestParser(bundle_errors=True)
serializerPostres.add_argument(
    'nombre',  # nombre del atributo en el body
    type=str,  # tipo de dato que me tiene que mandar
    required=True,  # si es de caracter obligatorio o no
    # mensaje de ayuda en el caso fuese obligatorio y no me lo mandase
    help="Falta el nombre",
    # en que parte del request me mandara, ya sea json (body) o url
    location='json'
)
serializerPostres.add_argument(
    'porcion',
    type=str,
    required=True,
    help="Falta la porcion {error_msg}",
    choices=('Familiar', 'Personal', 'Mediano'),
    location='json'
)


class PostresController(Resource):
    """Sera la encarga de la gestion de todos los postres y su creacion"""

    def get(self):
        # SELECT * FROM postres;
        # base_de_datos.session.query(PostreModel).all()
        postres = PostreModel.query.all()
        print(postres)
        resultado = []
        for postre in postres:
            print(postre.json())
            resultado.append(postre.json())
        return {
            'success': True,
            'content': resultado,
            'message': None
        }

    def post(self):
        data = serializerPostres.parse_args()
        nuevoPostre = PostreModel(nombre=data.get(
            'nombre'), porcion=data.get('porcion'))
        print(nuevoPostre)
        nuevoPostre.save()

        return {
            'success': True,
            'content': nuevoPostre.json(),
            'message': 'Postre creado exitosamente'
        }, 201


class PostreController(Resource):
    def get(self, id):
        # asi es como se usa con la documentacion nativa de SQLAlchemy
        # https://docs.sqlalchemy.org/en/14/orm/query.html?highlight=filter_by#sqlalchemy.orm.Query.filter_by
        # SELECT * from postres where id = 1;
        # otro_postre = base_de_datos.session.query(
        #     PostreModel).filter(PostreModel.postreId == id).first()
        postre = base_de_datos.session.query(
            PostreModel).filter_by(postreId=id).first()
        # como la documentacion de flask sql alchemy
        # https://flask-sqlalchemy.palletsprojects.com/en/2.x/queries/#querying-records
        # postre = PostreModel.query.filter_by(postreId=id).first()
        return ({
            'success': True,
            'content': postre.json(),
            'message': None
        }, 200) if postre else ({
            'success': False,
            'content':  None,
            'message': 'Postre no encontrado'
        }, 404)

    def put(self, id):
        postre = base_de_datos.session.query(
            PostreModel).filter_by(postreId=id).first()
        if postre:
            data = serializerPostres.parse_args()
            postre.postreNombre = data.get('nombre')
            postre.postrePorcion = data.get('porcion')
            postre.save()

            return {
                'success': True,
                'content': postre.json(),
                'message': 'Postre actualizado correctamente'
            }, 201
        else:
            return {
                'success': False,
                'content': None,
                'message': 'Postre no encontrado'
            }, 404

    def delete(self, id):
        # METODO 1
        # postre = base_de_datos.session.query(
        #     PostreModel).filter_by(postreId=id).delete()
        # base_de_datos.session.commit()
        # print(postre)
        # METODO 2
        postre = base_de_datos.session.query(
            PostreModel).filter_by(postreId=id).first()
        if postre:
            postre.delete()
            return {
                'success': True,
                'content': postre.json(),
                'message': 'Postre eliminado exitosamente'
            }
        else:
            return {
                'success': False,
                'content': None,
                'message': 'Postre no existe'
            }


class BusquedaPostre(Resource):
    serializerBusqueda = reqparse.RequestParser()
    # se van a ubicar en el query string
    serializerBusqueda.add_argument(
        'nombre',
        type=str,
        location='args',
        required=False,
    )
    serializerBusqueda.add_argument(
        'porcion',
        type=str,
        location='args',
        required=False,
        choices=('Familiar', 'Personal', 'Mediano'),
        help='Opcion invalida, las opciones son Familiar, Personal, Mediano'
    )

    def get(self):
        # Ejercicio
        # primero validar si hay nombre, porcion o ambos
        # SELECT * FROM postres where porcion = '' and nombre = ''
        # luego devolver todos los postres que hagan match con la busqueda
        filtros = self.serializerBusqueda.parse_args()
        print(filtros)
        # from sqlalchemy import or_
        # base_de_datos.session.query(PostreModel).filter_by(or_(postreNombre="3 leches", postreNombre="Selva Negra"))
        if filtros.get('nombre') and filtros.get('porcion'):
            resultado = base_de_datos.session.query(PostreModel).filter_by(
                postreNombre=filtros.get('nombre'), postrePorcion=filtros.get('porcion')).all()

        elif filtros.get('nombre'):
            resultado = base_de_datos.session.query(PostreModel).filter_by(
                postreNombre=filtros.get('nombre')).all()

        elif filtros.get('porcion'):
            resultado = base_de_datos.session.query(PostreModel).filter_by(
                postrePorcion=filtros.get('porcion')).all()
        else:
            return {
                'message': 'Necesitas dar al menos un parametro'
            }, 400

        postres = []
        for postre in resultado:
            postres.append(postre.json())
        return {
            "message": None,
            "content": postres,
            "success": True
        }
