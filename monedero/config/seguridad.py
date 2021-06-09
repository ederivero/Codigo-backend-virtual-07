from models.usuario import UsuarioModel
from bcrypt import checkpw
from .conexion_bd import base_de_datos


class Usuario:
    def __init__(self, id, username):
        self.id = id
        self.username = username

    def __str__(self):
        return "Usuario con el id =%s y username= %s" % (self.id, self.username)


def autenticador(username, password):
    """Funcion encargado en mi JWT de validar las credenciales si estas son ingresadas correctamente (si hacen match con algun usuario"""
    # primero valido si hay un username y un password
    if username and password:
        # busco ese usuario en la bd segun su correo como username
        usuario = base_de_datos.session.query(
            UsuarioModel).filter_by(usuarioCorreo=username).first()
        # si hay el usuario
        if usuario:
            # valido su password
            # la funcion checkpw toma dos parametros, el primero es la contraseña actual y el segundo es la contraseña almacenada en la bd, internamente las validara y si son, retornara True, caso contrario retornara False
            if checkpw(bytes(password, 'utf-8'), usuario.usuarioPassword):
                # si la contraseña es correcta
                # esto me servira para agregarlo en el payload (la parte intermedia de la jwt)
                return Usuario(usuario.usuarioId, usuario.usuarioCorreo)
            else:
                print("La contraseña no coincide")
                return None
        else:
            print("El usuario no existe")
            return None
    else:
        print("Falta el usuario o la password")
        return None


def identificador(payload):
    """Sirve para que una vez el usuario ya este logeado y tenga su JWT pueda realizar peticiones a una ruta protegica y esta funcion sera la encargada de identificar a dicho usuario y devolver su informacion"""
    # el payload retornara un diccionario
    print(payload)
    if(payload['identity']):
        # identity se almacenara el id del usuario
        usuario = base_de_datos.session.query(UsuarioModel).filter_by(
            usuarioId=payload['identity']).first()
        if usuario:
            return usuario.json()
        else:
            # el usuario en la token no existe en mi bd ( IMPOSIBLE!! )
            return None
    else:
        # en mi payload no hay la llave identity
        return None
