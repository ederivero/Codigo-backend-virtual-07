from flask_restful import Resource, reqparse, request
from models.usuario import UsuarioModel
from re import search, fullmatch
from sqlalchemy.exc import IntegrityError
from cryptography.fernet import Fernet
from os import environ
from dotenv import load_dotenv
import json
from config.conexion_bd import base_de_datos
from datetime import datetime, timedelta
from utils.enviar_correo_puro import enviarCorreo
import bcrypt
load_dotenv()

PATRON_CORREO = '^[a-zA-Z0-9]+[\._]?[a-zA-Z0-9]+[@]\w+[.]\w{2,3}$'
PATRON_PASSWORD = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#&?])[A-Za-z\d@$!%*#&?]{6,}$'


class RegistroController(Resource):
    serializer = reqparse.RequestParser(bundle_errors=True)
    serializer.add_argument(
        'nombre',
        type=str,
        required=True,
        location='json',
        help='Falta el nombre'
    )
    serializer.add_argument(
        'apellido',
        type=str,
        required=True,
        location='json',
        help='Falta el apellido'
    )
    serializer.add_argument(
        'correo',
        type=str,
        required=True,
        location='json',
        help='Falta el correo'
    )
    serializer.add_argument(
        'password',
        type=str,
        required=True,
        location='json',
        help='Falta el password'
    )

    def post(self):
        data = self.serializer.parse_args()
        correo = data.get('correo')
        # ^ => tiene que coincidir el comienzo de la cadena
        # [a-zA-Z0-9] => significa que el texto tiene que coincidir con una letra minuscula y una letra mayuscula y un numero+
        # [\._] => coincidir con el punto o sub guion
        # ? => encontrar 0 o 1 coincidencia
        # + => la combinacion del texto anterior se puede repetir mas de una vez
        # [@] => que luego si o si tiene que haber un arroba
        # \w => coincida con cualquier caracter alfanumerico
        # [.] => luego si o si tiene que haber un .
        # {2,3} => indico que ese texto alfanumerico va a tener una longitud minima de 2 y una maxima de 3 caracteres
        # $ => indica que tiene que coincidir el final de la cadena
        nombre = data.get('nombre')
        apellido = data.get('apellido')
        password = data.get('password')
        # VALIDAR MEDIANTE REGEXP si la contraseña tiene al menos 8 caracteres de longitud y al menos un numero, una letra min, una letra mayus
        # al menos una minus, mayus, un numero y un caracter especial @$!%*#&?
        # (m,n) => coincidencia entre esos patrones
        # * => match entre 0 y mas repeticiones
        # . => match con cualquier caracter excepto un salto de linea
        # [...] => match con cualquiera de los caracteres indicados dentro de los corchetes

        # fullmatch => require el string completo para que cumpla la expresion regular y no solamente una porcion
        if search(PATRON_CORREO, correo) and fullmatch(PATRON_PASSWORD, password):
            try:
                nuevoUsuario = UsuarioModel(nombre, apellido, correo, password)
                nuevoUsuario.save()
                return {
                    "success": True,
                    "content": nuevoUsuario.json(),
                    "message": "Usuario registrado exitosamente"
                }, 201
            except IntegrityError as error:
                print(error)
                return {
                    "success": False,
                    "content": None,
                    "message": "Correo ya existe"
                }, 400
            except:
                return{
                    "success": False,
                    "content": None,
                    "message": "Error inesperado!"
                }, 400
        else:
            return {
                "success": False,
                "content": None,
                "message": "Correo o password incorrecto"
            }, 400


class ForgotPasswordController(Resource):
    serializer = reqparse.RequestParser(bundle_errors=True)
    serializer.add_argument(
        "correo",
        type=str,
        required=True,
        location='json',
        help='Falta el correo'
    )

    def post(self):
        data = self.serializer.parse_args()
        correo = data['correo']

        if search(PATRON_CORREO, correo):
            # es un correo valido
            usuario = base_de_datos.session.query(
                UsuarioModel).filter_by(usuarioCorreo=correo).first()
            if not usuario:
                return {
                    "success": False,
                    "content": None,
                    "message": "Usuario no registrado"
                }, 400
            fernet = Fernet(environ.get("FERNET_SECRET"))
            # creo un payload que sera lo que mandare por el correo indicando la fecha de caducidad, y el correo
            payload = {
                "fecha_caducidad": str(datetime.now()+timedelta(minutes=30)),
                "correo": correo
            }
            # print(payload)
            # el metodo dumps convierte un diccionario a un json
            payload_json = json.dumps(payload)
            # encripto ese payload a un hash listo para mandarlo por el correo
            token = fernet.encrypt(bytes(payload_json, 'utf-8'))
            # print(token)
            link = request.host_url+'recuperarPassword/'+token.decode('utf-8')
            respuesta = enviarCorreo(
                usuario.usuarioCorreo, usuario.usuarioNombre, link)
            if respuesta:
                return {
                    "success": True,
                    "content": None,
                    "message": "Correo enviado exitosamente"
                }
            else:
                return {
                    "success": False,
                    "content": None,
                    "message": "Error al enviar el correo, intente nuevamente"
                }, 500
        else:
            return {
                "success": False,
                "content": None,
                "message": "Formato de correo incorrecto"
            }, 400


class ResetPasswordController(Resource):
    serializer = reqparse.RequestParser(bundle_errors=True)
    serializer.add_argument(
        'correo',
        type=str,
        required=True,
        help='Falta el correo',
        location='json'
    )
    serializer.add_argument(
        'new_password',
        type=str,
        required=True,
        help='Falta el correo',
        location='json'
    )

    def post(self):
        data = self.serializer.parse_args()
        if search(PATRON_CORREO, data['correo']):
            usuario = base_de_datos.session.query(UsuarioModel).filter_by(
                usuarioCorreo=data['correo']).first()
            if usuario:
                if fullmatch(PATRON_PASSWORD, data['new_password']):
                    passwordBytes = bytes(data['new_password'], "utf-8")
                    passwordHash = bcrypt.hashpw(
                        passwordBytes, bcrypt.gensalt())
                    passwordString = passwordHash.decode("utf-8")
                    usuario.usuarioPassword = passwordString
                    usuario.save()
                    return {
                        "success": True,
                        "content": usuario.json(),
                        "message": "La contraseña se actualizo exitosamente"
                    }
                else:
                    return {
                        "success": False,
                        "content": None,
                        "message": "La contraseña debe de tener al menos 6 caracteres , una mayus, una minus, un numero y un caracter especial"
                    }
            else:
                return {
                    "success": False,
                    "content": None,
                    "message": "Usuario no encontrado"
                }, 400
        else:
            return {
                "success": False,
                "content": None,
                "message": "Formato de correo incorrecto"
            }, 400
