from sqlalchemy.sql.schema import ForeignKey
from config.conexion_bd import base_de_datos
from sqlalchemy import Column, types
from datetime import datetime


class BlackListModel(base_de_datos.Model):
    __tablename__ = "black_lists"

    blackListId = Column(name='id', type_=types.Integer, primary_key=True,
                         unique=True, autoincrement=True, nullable=False)
    blackListToken = Column(name='token', type_=types.Text, nullable=False)
    blackListFecha = Column(name='fecha', type_=types.DateTime, nullable=False)
    usuario = Column(ForeignKey(column='usuarios.id', ondelete="CASCADE"),
                     name='usuario_id', type_=types.Integer, nullable=False)

    def __init__(self, token, usuarioId):
        self.blackListToken = token
        self.usuario = usuarioId
        self.blackListFecha = datetime.now()

    def save(self):
        base_de_datos.session.add(self)
        base_de_datos.session.commit()
