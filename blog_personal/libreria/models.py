from django.db import models

# Create your models here.
class UsuarioModel(models.Model):
    usuarioId = models.AutoField(
        primary_key=True,
        null=False,
        unique=True,
        db_column='id'
    )
    usuarioNombre = models.CharField(
        max_length=25,
        null=False,
        db_column='nombre',
        # a continuacion son parametros para el panel administrativo
        verbose_name='Nombre del Lector', # mostrara para que sirve en el form del panel administrativo
        help_text='Aqui debes ingresar el nombre', # es el campo de ayuda que se mostrara en el formulario del panel administrativo
    )
    usuarioApellido = models.CharField(
        max_length=25,
        null=False, # indica que el campo no puede no tener valor (es requerido)
        db_column='apellido',
        verbose_name='Apellido del Lector',
        help_text='Debes ingresar el apellido',
    )
    usuarioCorreo = models.EmailField(
        max_length=50,
        db_column='correo',
        null=False,
        verbose_name='Correo del Lector',
        help_text='Debes ingresar un correo valido'
    )
    usuarioDni = models.CharField(
        max_length=8,
        db_column='dni',
        null=False,
        verbose_name='Dni del Lector',
        help_text='Ingrese un dni valido'
    )

    class Meta:
        # permite pasar metadatos al padre desde el hijo (setear atributos)
        # modifica el ordenamiento de mis registros de los usuarios
        ordering=['-usuarioCorreo', 'usuarioNombre']
        # indexacion => indexa cada registro segun una columna o columnas en especifico 
        indexes = [models.Index(fields=['usuarioCorreo','usuarioDni'])]
        # modifica el nombre de la tabla en la bd
        db_table = 'usuarios'
        # sirve para hacer unica una conjugacion de dos o mas columnas
        unique_together=[['usuarioCorreo','usuarioDni']]
        # sirve para el panel administrativo es el nombre que se mostrara en vez del nombre de la clase
        verbose_name="usuario"
        # el nombre pero en plural para los registros
        verbose_name_plural="usuarios"
