import { DataTypes } from "sequelize";
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
        unique: true,
      },
      tipoDescripcion: {
        type: DataTypes.STRING(45),
        field: "descripcion",
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
      },
      usuarioNombre: {
        type: DataTypes.STRING(45),
        field: "nombre",
        validate: {
          // is: /([A-Z])\w+([ ])/,
          isNumeric: false,
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
      },
      usuarioPassword: {
        type: DataTypes.TEXT,
        field: "password",
        validate: {
          isAlpha: true,
        },
        allowNull: false,
      },
      usuarioImagen: {
        type: DataTypes.TEXT,
        field: "imagen",
        allowNull: false,
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

// RELACIONES
