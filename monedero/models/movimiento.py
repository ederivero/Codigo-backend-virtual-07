from sqlalchemy.sql.schema import ForeignKey
from config.conexion_bd import base_de_datos
from sqlalchemy import Column, types


class MovimientoModel(base_de_datos.Model):
    __tablename__ = "movimientos"

    movimientoId = Column(name='id', type_=types.Integer, primary_key=True,
                          unique=True, autoincrement=True, nullable=False)
    movimientoNombre = Column(
        name='nombre', type_=types.String(45), nullable=False)
    movimientoMonto = Column(name='monto', type_=types.Float, nullable=False)
    movimientoFecha = Column(
        name='fecha', type_=types.DateTime, nullable=False)
    movimientoImagen = Column(name='imagen', type_=types.Text, nullable=False)
    moviemientoTipo = Column(
        name='tipo', type_=types.String(45), nullable=False)

    usuario = Column(ForeignKey(column='usuarios.id', ondelete="CASCADE"),
                     name='usuario_id', type_=types.Integer, nullable=False)
