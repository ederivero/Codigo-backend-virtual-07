from flask import Flask
from flask_restful import Api
from controllers.usuario import RegistroController
from models.movimiento import MovimientoModel
from models.sesion import SesionModel
from os import environ
from dotenv import load_dotenv
from config.conexion_bd import base_de_datos


load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get("DATABASE_URI")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

base_de_datos.init_app(app)
# base_de_datos.drop_all(app=app)
base_de_datos.create_all(app=app)

api = Api(app)

api.add_resource(RegistroController, "/registro")

if __name__ == '__main__':
    app.run(debug=True)
