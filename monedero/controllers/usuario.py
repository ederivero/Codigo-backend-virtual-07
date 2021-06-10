from flask_restful import Resource, reqparse
from models.usuario import UsuarioModel
from re import search, fullmatch
from sqlalchemy.exc import IntegrityError


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
        patron_correo = '^[a-zA-Z0-9]+[\._]?[a-zA-Z0-9]+[@]\w+[.]\w{2,3}$'
        nombre = data.get('nombre')
        apellido = data.get('apellido')
        password = data.get('password')
        # VALIDAR MEDIANTE REGEXP si la contraseña tiene al menos 8 caracteres de longitud y al menos un numero, una letra min, una letra mayus
        # al menos una minus, mayus, un numero y un caracter especial @$!%*#&?
        # (m,n) => coincidencia entre esos patrones
        # * => match entre 0 y mas repeticiones
        # . => match con cualquier caracter excepto un salto de linea
        # [...] => match con cualquiera de los caracteres indicados dentro de los corchetes
        patron_password = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#&?])[A-Za-z\d@$!%*#&?]{6,}$'
        # fullmatch => require el string completo para que cumpla la expresion regular y no solamente una porcion
        if search(patron_correo, correo) and fullmatch(patron_password, password):
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
