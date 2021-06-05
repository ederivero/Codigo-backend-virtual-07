from config.conexion_bd import base_de_datos
from sqlalchemy import Column, types, orm


class IngredienteModel(base_de_datos.Model):
    __tablename__ = "ingredientes"

    ingredienteId = Column(name='id', type_=types.Integer, primary_key=True,
                           unique=True, autoincrement=True, nullable=False)
    ingredienteNombre = Column(
        name='nombre', type_=types.String(length=45), unique=True)

    recetas = orm.relationship('RecetaModel', backref='recetaIngrediente')

    def __init__(self, nombre):
        self.ingredienteNombre = nombre

    def save(self):
        base_de_datos.session.add(self)
        base_de_datos.session.commit()

    def json(self):
        return {
            "id": self.ingredienteId,
            "nombre": self.ingredienteNombre
        }
