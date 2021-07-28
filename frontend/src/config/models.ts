import { cuartoModel } from "../models/cuarto";
import { mensajeModel } from "../models/mensaje";
import { usuarioModel } from "../models/usuario";

export const Usuario = usuarioModel();
export const Cuarto = cuartoModel();
export const Mensaje = mensajeModel();

Usuario.hasMany(Mensaje, {
  foreignKey: {
    name: "usuarioId",
    allowNull: false,
    field: "usuario_id",
  },
});
Mensaje.belongsTo(Usuario, {
  foreignKey: {
    name: "usuarioId",
    allowNull: false,
    field: "usuario_id",
  },
});

Cuarto.hasMany(Mensaje, {
  foreignKey: {
    name: "cuartoId",
    allowNull: false,
    field: "cuarto_id",
  },
});
Mensaje.belongsTo(Cuarto, {
  foreignKey: {
    name: "cuartoId",
    allowNull: false,
    field: "cuarto_id",
  },
});
