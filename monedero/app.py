from flask import Flask, request
from flask_restful import Api
from controllers.usuario import RegistroController
from controllers.movimiento import MovimientosController
from models.sesion import SesionModel
from os import environ, path
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
# Si estamos subiendo archivos, para poner un tope usaremos la variable MAX_CONTENT_LENGTH
# 1 byte  * 1024 => 1Kb * 1024 => 1 Mb * 1024 => 1 Gb
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024

jsonwebtoken = JWT(app=app, authentication_handler=autenticador,
                   identity_handler=identificador)


jsonwebtoken.jwt_error_callback = manejo_error_JWT
base_de_datos.init_app(app)
# base_de_datos.drop_all(app=app)
base_de_datos.create_all(app=app)

EXTENSIONES_PERMITIDAS = ['png', 'jpg', 'pdf']


def archivos_permitidos(filename):
    # rsplit puede recibir dos parametros, el primer parametro es el caracter a dividir y el segundo opcional es el que especifica en cuantas partes debe de ser dividido
    return '.' in filename and filename.rsplit('.', 1)[-1].lower() in EXTENSIONES_PERMITIDAS


api = Api(app)


@app.route("/subirArchivo", methods=['POST'])
def subir_archivo():
    print(request.files)
    archivo = request.files['archivo']
    # Solamente registrar los archivos que son JPG, PNG y PDF
    # para saber el nombre del archivo
    print(archivo.filename)
    # para saber el tipo de archivo
    print(archivo.mimetype)  # image/jpg image/png  application/vnd.rar
    if archivos_permitidos(archivo.filename):
        archivo.save(path.join("multimedia", archivo.filename))
        return 'ok'
    else:
        return 'archivo no permitido'


api.add_resource(RegistroController, "/registro")
api.add_resource(MovimientosController, "/movimientos")

if __name__ == '__main__':
    app.run(debug=True)
