from flask import Flask
from flask_restful import Api
from controllers.usuario import RegistroController
from controllers.movimiento import MovimientosController
from models.sesion import SesionModel
from os import environ
from dotenv import load_dotenv
from config.conexion_bd import base_de_datos
from flask_jwt import JWT
from config.seguridad import autenticador, identificador
from config.custom_jwt import manejo_error_JWT
from datetime import timedelta
load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get("DATABASE_URI")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'claveSecreta'
# para modificar la fecha de caducidad de la token, su valor x default es 600 segundos
app.config['JWT_EXPIRATION_DELTA'] = timedelta(hours=1)
# para modificar el endpoint del login
app.config['JWT_AUTH_URL_RULE'] = '/login'
# para modificar la llave del username
app.config['JWT_AUTH_USERNAME_KEY'] = 'correo'
# para modificar la llave del password
app.config['JWT_AUTH_PASSWORD_KEY'] = 'pass'


jsonwebtoken = JWT(app=app, authentication_handler=autenticador,
                   identity_handler=identificador)


jsonwebtoken.jwt_error_callback = manejo_error_JWT
base_de_datos.init_app(app)
# base_de_datos.drop_all(app=app)
base_de_datos.create_all(app=app)

api = Api(app)

api.add_resource(RegistroController, "/registro")
api.add_resource(MovimientosController, "/movimientos")

if __name__ == '__main__':
    app.run(debug=True)
