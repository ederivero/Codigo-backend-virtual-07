from config.conexion_bd import base_de_datos
from sqlalchemy import Column, types

class SesionModel(base_de_datos.Model):
    __tablename__="sesiones"

    sesionId = Column(name='id', type_=types.Integer, primary_key=True,
                           unique=True, autoincrement=True, nullable=False)
    sesionToken = Column(name='token', type_=types.Text, nullable=False)
    sesionEstado = Column(name='estado', type_=types.Boolean, nullable=False)
    sesionVencimiento = Column(name='vencimiento', type_=types.DateTime, nullable=False)

    