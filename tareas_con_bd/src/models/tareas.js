import { conexion } from "../config/sequelize";
import { DataTypes } from "sequelize";

// Data Types =>  https://sequelize.org/master/manual/model-basics.html#data-types
// Column Options => https://sequelize.org/master/manual/model-basics.html#column-options
export const tareaModel = () =>
  conexion.define(
    "tarea",
    {
      tareaId: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
        field: "id",
        type: DataTypes.INTEGER,
      },

      tareaNombre: {
        type: DataTypes.STRING(50),
        field: "nombre",
        allowNull: false,
      },

      tareaEstado: {
        type: DataTypes.BOOLEAN,
        field: "estado",
        defaultValue: false,
      },
    },
    {
      tableName: "tareas",
      timestamps: true,
      updatedAt: "fecha_actualizacion",
    }
  );
