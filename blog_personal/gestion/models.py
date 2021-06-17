from datetime import date
from django.utils.timezone import now
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
        # mostrara para que sirve en el form del panel administrativo
        verbose_name='Nombre del Lector',
        # es el campo de ayuda que se mostrara en el formulario del panel administrativo
        help_text='Aqui debes ingresar el nombre',
    )
    usuarioApellido = models.CharField(
        max_length=25,
        # indica que el campo no puede no tener valor (es requerido)
        null=False,
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

    def __str__(self):
        return self.usuarioNombre+' '+self.usuarioApellido

    class Meta:
        # permite pasar metadatos al padre desde el hijo (setear atributos)
        # modifica el ordenamiento de mis registros de los usuarios
        ordering = ['-usuarioCorreo', 'usuarioNombre']
        # indexacion => indexa cada registro segun una columna o columnas en especifico
        indexes = [models.Index(fields=['usuarioCorreo', 'usuarioDni'])]
        # modifica el nombre de la tabla en la bd
        db_table = 'usuarios'
        # sirve para hacer unica una conjugacion de dos o mas columnas
        unique_together = [['usuarioCorreo', 'usuarioDni']]
        # sirve para el panel administrativo es el nombre que se mostrara en vez del nombre de la clase
        verbose_name = "usuario"
        # el nombre pero en plural para los registros
        verbose_name_plural = "usuarios"


def anio_actual():
    return date.today().year


def opciones_anio():
    return [(anio, anio) for anio in range(1990, date.today().year+1)]


class LibroModel(models.Model):
    libroId = models.AutoField(
        primary_key=True,
        unique=True,
        null=False,
        db_column='id'
    )
    libroNombre = models.CharField(
        max_length=45,
        null=False,
        db_column='nombre',
        verbose_name='Nombre del libro',
        help_text='Ingrese un nombre valido'
    )
    libroEdicion = models.IntegerField(
        db_column='edicion',
        choices=opciones_anio(),
        verbose_name='Año de edicion',
        help_text='Ingrese el año de la edicion',
        default=anio_actual,
    )
    libroAutor = models.TextField(
        db_column='autor',
        null=False,
        verbose_name='Auto del libro',
        help_text='Ingrese el autor'
    )
    libroCantidad = models.IntegerField(
        db_column='cantidad',
        verbose_name='Cantidad',
        default=0,
    )

    def __str__(self):
        return self.libroNombre

    class Meta:
        db_table = 'libros'
        # La fiesta del chivo       | 2015  |   MVLL     ✅
        # La fiesta del chivo       | 2015  |   MVLL     ❌
        # La fiesta del chivo       | 2015  |   ABE      ✅
        # La fiesta del chivo       | 2014  |   MVLL     ✅
        # No me esperen en abril    | 2014  |   ABE      ✅

        unique_together = [['libroNombre', 'libroEdicion', 'libroAutor']]
        verbose_name = 'libro'
        verbose_name_plural = 'libros'
        # Edicion de manera descendente y la cantidad de manera descendente, nombre ascendente
        ordering = ['-libroEdicion', '-libroCantidad', 'libroNombre']


class PrestamoModel(models.Model):
    prestamoId = models.AutoField(
        primary_key=True,
        unique=True,
        db_column='id'
    )
    prestamoFechaInicio = models.DateField(
        default=now,
        db_column='fecha_inicio',
        verbose_name='Fecha de inicio del prestamo',
    )
    prestamoFechaFin = models.DateField(
        db_column='fecha_fin',
        verbose_name='Fecha de fin del prestamo',
        null=False
    )
    prestamoEstado = models.BooleanField(
        default=True,
        db_column='estado',
        verbose_name='Estado del prestamo',
        help_text='Indique el estado del prestamo'
    )
    # opciones para la eliminacion de una PK con relacion
    # CASCADE => se elimina primero la pk y luego las fk's
    # PROTECT => no permite la eliminacion de la pk si tiene relaciones
    # SET_NULL => elimina la pk y posteriormente todas sus fk cambian de valor a null
    # DO_NOTHING => elimina la pk y aun mantiene el valor de sus fk (mala integridad)
    # RESTRICT => no permite la eliminacion como el protect pero lanzara un error de tipo RestrictedError
    # https://docs.djangoproject.com/en/3.2/ref/models/fields/#arguments
    # el related_name me servira para poder acceder desde la clase donde se hace la relacion a todas sus llaves foraneas
    usuario = models.ForeignKey(
        to=UsuarioModel,
        db_column='usuario_id',
        on_delete=models.CASCADE,
        related_name='usuarioPrestamos',
        verbose_name='Usuario',
        help_text='Seleccione el usuario a prestar'
    )
    libro = models.ForeignKey(
        to=LibroModel,
        db_column='libro_id',
        on_delete=models.PROTECT,
        related_name='libroPrestamos',
        verbose_name='Libro',
        help_text='Seleccione el libro a prestar'
    )

    class Meta:
        db_table = "prestamos"
        verbose_name = "prestamo"
        verbose_name_plural = "prestamos"
        ordering = ['-prestamoFechaInicio']
