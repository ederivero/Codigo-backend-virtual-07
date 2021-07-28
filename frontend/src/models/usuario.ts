import { DataTypes, Model, ModelCtor } from "sequelize";
import conexion from "../config/sequelize";
import { hashSync } from "bcrypt";

export const usuarioModel = (): ModelCtor<Model> =>
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
        type: DataTypes.STRING(60),
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
          const passwordEncriptada = hashSync(String(passwordSinEncriptar), 10);
          this.setDataValue("usuarioPassword", passwordEncriptada);
        },
      },
      usuarioLastLogin: {
        type: DataTypes.DATE,
        field: "ultima_vez",
      },

      usuarioOnline: {
        type: DataTypes.BOOLEAN,
        field: "online",
      },
    },
    {
      tableName: "usuarios",
      timestamps: false,
      schema: process.env.SCHEMA,
    }
  );
