from config.conexion_bd import base_de_datos
from sqlalchemy import Column, types, orm


class PostreModel(base_de_datos.Model):
    # para cambiar el nombre de la tabla en la bd
    __tablename__ = "postres"

    postreId = Column(name='id', primary_key=True,
                      autoincrement=True, unique=True, type_=types.Integer)
    # https://docs.sqlalchemy.org/en/14/core/type_basics.html?highlight=datatypes#sqlalchemy.types.String
    postreNombre = Column(name='nombre', type_=types.String(length=45))
    postrePorcion = Column(name='porcion', type_=types.String(length=25))

    # El relationship sirve para indicar todos los "hijos" que puede tener ese modelo (todas sus FK) que puedan existir en determinado modelo
    # el backref creara un atributo virtual en el model del hijo (Preparacion) para que pueda acceder a todo el objeto de PostreModel sin la necesidad de hacer una sub consulta (creara un join cuando sea necesario)
    # lazy => define cuando SQLAlchemy va a cargar la data adyacente de la base de datos
    # True / 'select' => cargara todos los datos adyacentes
    # False / 'joined' => solamente cargara cuando sea necesario (cuando se utilicen dichos datos)
    # 'subquery' => trabajara los datos PERO en una sub consulta
    # 'dynamic' => en este se pueden agregar filtros adicionales. SQLALchemy devolvera otro objeto dentro de la clase
    preparaciones = orm.relationship(
        'PreparacionModel', backref='preparacionPostre', lazy=True)

    recetas = orm.relationship('RecetaModel', backref='recetaPostre')

    def __init__(self, nombre, porcion):
        self.postreNombre = nombre
        self.postrePorcion = porcion

    def __str__(self):
        return "El postre es %s" % self.postreNombre
        # return "El postre es {}".format(self.postreNombre)

    def save(self):
        # agregar un registro a la bd PERO todavia lo no guarda porque esta trabajandose mediante Transactions entonces esperara a que se guarden de manera permanente haciendo un commit o rechazando todos los cambios realizados mediante un rollback
        # la informacion ya exisitira en la bd (select * from postres where nombre = '3 leches') pero en un stage (etapa) volatil
        base_de_datos.session.add(self)
        # ahora si todos los pasos de escritura, actualizacion y eliminacion de la bd fueron exitosos entonces se guardaran todos los cambios de manera PERMANENTE
        # todas las sesiones dentro de la misma instancia o entorno que esten pendiente de guardar PERMANENTE sus cambios en la bd al usar el commit se guardar de forma permanente
        base_de_datos.session.commit()
        # metodo que sirve para cerrar la sesion de la bd
        # no puedes volver a realizar una peticion a menos que te vuelvas a conectar (add)
        # base_de_datos.session.close()

    def json(self):
        return {
            "postreId": self.postreId,
            "postreNombre": self.postreNombre,
            "postrePorcion": self.postrePorcion
        }

    # este metodo va con el segundo metodo de eliminacion del controller
    def delete(self):
        base_de_datos.session.delete(self)
        base_de_datos.session.commit()
