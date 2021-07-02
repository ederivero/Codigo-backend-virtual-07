import { conexion } from "../config/sequelize";
import { DataTypes } from "sequelize";

export const tareaModel = () =>
  conexion.define("tarea", {
    tareaId: {
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
      field: "id",
      type: DataTypes.INTEGER,
    },
  });
