import { DataTypes, Model, ModelCtor } from "sequelize";
import conexion from "../config/sequelize";

export const mensajeModel = (): ModelCtor<Model> =>
  conexion.define(
    "mensaje",
    {
      mensajeId: {
        type: DataTypes.INTEGER,
        field: "id",
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      mensajeTexto: {
        type: DataTypes.STRING(45),
        field: "mensaje",
        allowNull: false,
      },
    },
    {
      tableName: "mensajes",
      createdAt: "fecha",
      updatedAt: false,
    }
  );
