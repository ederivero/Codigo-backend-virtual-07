from sqlalchemy.sql.schema import ForeignKey
from config.conexion_bd import base_de_datos
from sqlalchemy import Column, types
from config.conexion_bd import base_de_datos


class PreparacionModel(base_de_datos.Model):
    __tablename__ = "preparaciones"
    # https://docs.sqlalchemy.org/en/14/core/metadata.html#sqlalchemy.schema.Column
    preparacionId = Column(name='id', type_=types.Integer,
                           unique=True, autoincrement=True, primary_key=True)

    preparacionOrden = Column(
        name='orden', type_=types.Integer, nullable=False)

    preparacionDescripcion = Column(
        name='descripcion', type_=types.Text, nullable=False)
    # Asi se crean las relaciones entre un modelo y otro
    # ondelete sirve para indicar que accion tomaran todas las FK cuando una pk sea eliminada
    # CASCADE => Eliminara en forma de cascada primero la PK y luego todas sus FK
    # DELETE => Se eliminara y dejara a las FK con el mismo valor generando informacion incorrecta
    # RESTRICT => restringir la eliminacion siempre y cuando tenga FK existentes
    # None => no hagas nada
    # https://docs.sqlalchemy.org/en/14/core/constraints.html?highlight=ondelete#sqlalchemy.schema.ForeignKey.params.ondelete
    postre = Column(ForeignKey(column='postres.id', ondelete="CASCADE"),
                    name='postre_id', type_=types.Integer, nullable=False)

    def __init__(self, orden, descripcion, postre_id):
        self.preparacionOrden = orden
        self.preparacionDescripcion = descripcion
        self.postre = postre_id

    def save(self):
        base_de_datos.session.add(self)
        base_de_datos.session.commit()

    def json(self):
        return {
            "id": self.preparacionId,
            "orden": self.preparacionOrden,
            "descripcion": self.preparacionDescripcion,
            "postre": self.postre
        }
