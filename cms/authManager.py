from django.contrib.auth.models import BaseUserManager
# BaseUserManager => sirve para modificar el comportamiento de la creacion de un usuario x consola


class UsuarioManager(BaseUserManager):
    """Clase que sirve para modificar el comportamiento del modelo auth_user de django"""

    def create_user(self, email, nombre, apellido, tipo, password=None):
        """Creacion de un usuario comun"""
        if not email:
            raise ValueError(
                "El usuario debe tener obligatoriamente un correo")
        # normalizo el coreo que a parte de validar si hay un @ y un . lo lleva todo a lowercase (minusculas) y quita espacios al inicio y al final si es que hubiese
        email = self.normalize_email(email)
        # creo mi objeto de usuario PERO aun no se guarda en la bd
        nuevoUsuario = self.model(usuarioCorreo=email,
                                  usuarioNombre=nombre, usuarioApellido=apellido, usuarioTipo=tipo)
        # ahora encripto la contraseña
        nuevoUsuario.set_password(password)
        # guardo en la bd
        # sirve para referenciar a la bd en el caso que nosotros tengamos varias conexiones en nuestro proyecto de django
        nuevoUsuario.save(using=self._db)
        return nuevoUsuario

    def create_superuser(self, usuarioCorreo, usuarioNombre, usuarioApellido, usuarioTipo, password):
        """Creacion de un nuevo super usuario para que pueda acceder al panel administrativo y algunas opciones adicionales"""
        usuario = self.create_user(
            # password=password,
            # apellido=usuarioApellido,
            # tipo=usuarioTipo,
            # nombre=usuarioNombre,
            # email=usuarioCorreo,
            usuarioCorreo, usuarioNombre, usuarioApellido, usuarioTipo, password
        )
        usuario.is_superuser = True
        usuario.is_staff = True
        usuario.save(using=self._db)
