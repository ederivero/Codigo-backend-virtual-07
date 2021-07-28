import { DataTypes, Model, ModelCtor } from "sequelize";
import conexion from "../config/sequelize";

export const cuartoModel = (): ModelCtor<Model> =>
  conexion.define(
    "cuarto",
    {
      cuartoId: {
        type: DataTypes.INTEGER,
        field: "id",
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      cuartoNombre: {
        type: DataTypes.STRING(45),
        field: "nombre",
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "cuartos",
      timestamps: false,
    }
  );
