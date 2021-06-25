from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .authManager import UsuarioManager


class PlatoModel(models.Model):
    platoId = models.AutoField(
        primary_key=True,
        null=False,
        db_column='id',
        unique=True)

    platoNombre = models.CharField(
        max_length=45,
        null=False,
        db_column='nombre',
        unique=True
    )

    platoPrecio = models.DecimalField(
        db_column='precio',
        null=False,
        max_digits=5,
        decimal_places=2
    )

    # ImageField => sirve para almacenar imagenes EN EL SERVIDOR, en la bd guardara la ubicacion del archivo y el archivo lo almacenara en el propio servidor
    platoFoto = models.ImageField(
        upload_to='platos/',  # indicara la carpeta en la cual se debe de guardar dicho archivo
        db_column='foto',
        null=True,
    )

    platoCantidad = models.IntegerField(
        db_column='cantidad',
        default=0,
        # permitira que el campo sea opcional PERO si es que no es proveido un valor pondra el valor definido en el default
    )

    updateAt = models.DateTimeField(
        auto_now=True,
        db_column='updated_at'
    )

    class Meta:
        db_table = 'platos'
        ordering = ['platoNombre']


class UsuarioModel(AbstractBaseUser, PermissionsMixin):
    """Modificar el modelo auth_user de la base de datos """
    # si nosotros queremos modificar solamente los campos necesarios del modelo auth_user deberemos usar el AbstractUser (first_name, last_name, password)
    # si yo quiero resetear por completo mi auth_user usare el AbstractBaseUser
    # PermissionsMixin => es la clase encargada de dar todos los permisos a nivel panel administrativo

    TIPO_PERSONAL = [
        (1, 'ADMINISTRADOR'),
        (2, 'CAJERO'),
        (3, 'MOZO')
    ]

    usuarioId = models.AutoField(
        primary_key=True,
        unique=True,
        db_column='id'
    )

    usuarioNombre = models.CharField(
        max_length=20,
        null=False,
        db_column='nombre',
        verbose_name='Nombre del usuario'
    )

    usuarioApellido = models.CharField(
        max_length=20,
        null=False,
        db_column='apellido',
        verbose_name='Apellido del usuario'
    )

    usuarioCorreo = models.EmailField(
        db_column='correo',
        null=False,
        unique=True,
        verbose_name='Correo del usuario'
    )

    usuarioTipo = models.IntegerField(
        choices=TIPO_PERSONAL,
        db_column='tipo',
        verbose_name='Tipo del usuario'
    )

    usuarioTelefono = models.CharField(
        max_length=10,
        db_column='telefono'
    )
    password = models.TextField()

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    updateAt = models.DateTimeField(
        auto_now=True,
        db_column='updated_at'
    )

    # comportamiento del modelo al momento de realizar la creacion del superuser x consola
    objects = UsuarioManager()

    # ahora defino que columna sera la encargada de valida que el usuario sea unico
    USERNAME_FIELD = 'usuarioCorreo'
    # sirve para indicar que campos se van a solicitar cuando se cree al superuser por consola
    REQUIRED_FIELDS = ['usuarioNombre', 'usuarioApellido', 'usuarioTipo']

    class Meta:
        db_table = 'usuarios'


class MesaModel(models.Model):
    mesaId = models.AutoField(
        primary_key=True,
        unique=True,
        null=False,
        db_column='id'
    )

    mesaDescripcion = models.CharField(
        max_length=10,
        null=False,
        db_column='descripcion'
    )

    mesaCapacidad = models.IntegerField(
        db_column='capacidad',
        null=False,
    )

    updateAt = models.DateTimeField(
        auto_now=True,
        db_column='updated_at'
    )

    class Meta:
        db_table = 'mesas'


class PedidoModel(models.Model):
    pedidoId = models.AutoField(
        primary_key=True,
        unique=True,
        db_column='id'
    )

    pedidoFecha = models.DateTimeField(
        auto_now=True,
        db_column='fecha',
    )

    pedidoTotal = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        db_column='total'
    )

    pedidoNombreCliente = models.CharField(
        max_length=45,
        db_column='nombre_cliente'
    )

    pedidoDocumentoCliente = models.CharField(
        max_length=12,
        db_column='documento_cliente'
    )

    usuario = models.ForeignKey(
        to=UsuarioModel,
        on_delete=models.PROTECT,
        related_name='usuarioPedidos',
        db_column='usuario_id'
    )

    mesa = models.ForeignKey(
        to=MesaModel,
        on_delete=models.PROTECT,
        related_name='mesaPedidos',
        db_column='mesa_id'
    )

    class Meta:
        db_table = 'pedidos'
        # ordenamiento del pedido mas reciente al pedido mas antiguo
        ordering = ['-pedidoFecha']


class DetalleModel(models.Model):
    detalleId = models.AutoField(
        primary_key=True,
        db_column='id',
        unique=True,
        null=False
    )

    detalleCantidad = models.IntegerField(
        db_column='cantidad',
        null=False,
    )

    detalleSubTotal = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        db_column='sub_total'
    )

    pedido = models.ForeignKey(
        to=PedidoModel,
        db_column='pedido_id',
        on_delete=models.PROTECT,
        related_name='pedidoDetalles'
    )

    plato = models.ForeignKey(
        to=PlatoModel,
        db_column='plato_id',
        on_delete=models.PROTECT,
        related_name='platoDetalles'
    )

    class Meta:
        db_table = 'detalles'
