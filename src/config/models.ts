import { DataTypes } from "sequelize";
import { hashSync } from "bcrypt";
import conexion from "../config/sequelize";

const productoModel = () =>
  conexion.define(
    "producto",
    {
      productoId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        field: "id",
      },
      productoNombre: {
        type: DataTypes.STRING(35),
        allowNull: false,
        field: "nombre",
      },
      productoPrecio: {
        type: DataTypes.DECIMAL(5, 2),
        field: "precio",
        allowNull: false,
        validate: {
          // https://sequelize.org/master/manual/validations-and-constraints.html#per-attribute-validations
          isFloat: true,
          validacionPersonalizada(valor: Number) {
            if (valor < 0) {
              throw new Error("El precio no puede ser negativo");
            }
          },
        },
      },
      productoEstado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "estado",
      },
      productoImagen: {
        type: DataTypes.TEXT,
        defaultValue: "https://loremflickr.com/500/500",
        field: "imagen",
      },
      productoDescripcion: {
        type: DataTypes.STRING(45),
        field: "descripcion",
      },
    },
    {
      tableName: "productos",
      timestamps: false,
    }
  );

const tipoModel = () =>
  conexion.define(
    "tipo",
    {
      tipoId: {
        type: DataTypes.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      tipoDescripcion: {
        type: DataTypes.STRING(45),
        field: "descripcion",
        unique: true,
      },
    },
    {
      tableName: "tipos",
      timestamps: false,
    }
  );

const accionModel = () =>
  conexion.define(
    "accion",
    {
      accionId: {
        type: DataTypes.INTEGER,
        field: "id",
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      accionDescripcion: {
        type: DataTypes.STRING(45),
        field: "descripcion",
      },
    },
    {
      tableName: "acciones",
      timestamps: false,
    }
  );

const usuarioModel = () =>
  conexion.define(
    "usuario",
    {
      usuarioId: {
        type: DataTypes.INTEGER,
        field: "id",
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      usuarioNombre: {
        type: DataTypes.STRING(45),
        field: "nombre",
        validate: {
          is: /([A-Z])\w+([ ])/,
          // isNumeric: false,
        },
        allowNull: false,
      },
      usuarioCorreo: {
        type: DataTypes.STRING(35),
        field: "correo",
        validate: {
          isEmail: true,
        },
        allowNull: false,
        unique: true,
      },
      usuarioPassword: {
        type: DataTypes.TEXT,
        field: "password",
        allowNull: false,
        set(passwordSinEncriptar) {
          // aca encriptare mi contraseña
          const passwordEncriptada = hashSync(String(passwordSinEncriptar), 10);
          console.log(passwordEncriptada);
          this.setDataValue("usuarioPassword", passwordEncriptada);
        },
      },
      usuarioImagen: {
        type: DataTypes.TEXT,
        field: "imagen",
        validate: {
          isUrl: true,
        },
      },
    },
    {
      tableName: "usuarios",
      timestamps: false,
    }
  );

const movimientoModel = () =>
  conexion.define(
    "movimiento",
    {
      movimientoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        field: "id",
        allowNull: false,
        autoIncrement: true,
      },
      movimientoFecha: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        field: "fecha",
        allowNull: false,
      },
      movimientoTipo: {
        field: "tipo",
        type: DataTypes.STRING(20),
        // validacion que solamente sea INGRESO | EGRESO
        validate: {
          isIn: [["INGRESO", "EGRESO"]],
        },
        allowNull: false,
      },
      movimientoTotal: {
        type: DataTypes.DECIMAL(5, 2),
        field: "total",
        allowNull: false,
      },
    },
    {
      tableName: "movimientos",
      timestamps: false,
    }
  );

const detalleMovimientoModel = () =>
  conexion.define(
    "detalleMovimiento",
    {
      detalleMovimientoId: {
        field: "id",
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      detalleMovimientoCantidad: {
        field: "cantidad",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      detalleMovimientoPrecio: {
        field: "precio",
        type: DataTypes.DECIMAL(5, 2),
      },
    },
    {
      tableName: "detalle_movimientos",
      timestamps: false,
    }
  );

const blackListModel = () =>
  conexion.define(
    "blackList",
    {
      blackListToken: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: "black_list",
      timestamps: false,
    }
  );

// RELACIONES

export const Producto = productoModel();
export const Tipo = tipoModel();
export const Accion = accionModel();
export const Usuario = usuarioModel();
export const Movimiento = movimientoModel();
export const DetalleMovimiento = detalleMovimientoModel();
export const BlackList = blackListModel();
// BlackList.sync({ force: true });

Producto.hasMany(DetalleMovimiento, {
  foreignKey: {
    name: "productoId",
    allowNull: false,
    field: "producto_id",
  },
});
DetalleMovimiento.belongsTo(Producto, {
  foreignKey: {
    name: "productoId",
    allowNull: false,
    field: "producto_id",
  },
});

Tipo.hasMany(Accion, {
  foreignKey: {
    name: "tipoId",
    allowNull: false,
    field: "tipo_id",
  },
});
Accion.belongsTo(Tipo, {
  foreignKey: { name: "tipoId", allowNull: false, field: "tipo_id" },
});

Tipo.hasMany(Usuario, {
  foreignKey: { name: "tipoId", allowNull: false, field: "tipo_id" },
});
Usuario.belongsTo(Tipo, {
  foreignKey: { name: "tipoId", allowNull: false, field: "tipo_id" },
});

Usuario.hasMany(Movimiento, {
  foreignKey: {
    name: "usuarioId",
    allowNull: false,
    field: "usuario_id",
  },
});
Movimiento.belongsTo(Usuario, {
  foreignKey: {
    name: "usuarioId",
    allowNull: false,
    field: "usuario_id",
  },
});

Movimiento.hasMany(DetalleMovimiento, {
  foreignKey: {
    name: "movimientoId",
    allowNull: false,
    field: "movimiento_id",
  },
});
DetalleMovimiento.belongsTo(Movimiento, {
  foreignKey: {
    name: "movimientoId",
    allowNull: false,
    field: "movimiento_id",
  },
});
