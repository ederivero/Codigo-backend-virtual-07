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
        postres = PostreModel.query.all()
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
        otro_postre = base_de_datos.session.query(
            PostreModel).filter(PostreModel.postreId == id).first()
        otro_postre_2 = base_de_datos.session.query(
            PostreModel).filter_by(postreId=id).first()
        # como la documentacion de flask sql alchemy
        # https://flask-sqlalchemy.palletsprojects.com/en/2.x/queries/#querying-records
        postre = PostreModel.query.filter_by(postreId=id).first()
        print(postre)
        print(otro_postre)
        print(otro_postre_2)
        return 'ok'
