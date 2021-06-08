from config.conexion_bd import base_de_datos
from sqlalchemy import Column, types, orm

class UsuarioModel(base_de_datos.Model):
    __tablename__="usuarios"

    usuarioId = Column(name='id', type_=types.Integer, primary_key=True,
                           unique=True, autoincrement=True, nullable=False)
    usuarioNombre = Column(name='nombre', type_=types.String(45), nullable=False)
    usuarioApellido = Column(name='apellido', type_=types.String(45), nullable=False)
    usuarioCorreo = Column(name='correo', type_=types.String(25), nullable=False)
    usuarioPassword = Column(name='password', type_=types.TEXT, nullable=False)

    movimientos = orm.relationship('MovimientoModel', backref='movimientoUsuario')
