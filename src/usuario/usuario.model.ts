import { Schema, model } from "mongoose";
import { hashSync } from "bcrypt";

const usuarioSchema = new Schema(
  {
    usuarioCorreo: {
      type: Schema.Types.String,
      alias: "correo",
      required: true,
    },
    usuarioNombre: {
      type: Schema.Types.String,
      alias: "nombre",
      required: true,
    },
    usuarioPassword: {
      type: Schema.Types.String,
      set: (valor: string) => hashSync(valor, 10),
      alias: "password",
      required: true,
    },
    usuarioTipo: {
      type: Schema.Types.String,
      alias: "tipo",
      enum: ["CLIENTE", "PERSONAL"],
      required: true,
    },
  },
  { timestamps: { createdAt: "fecha_creacion", updatedAt: false } }
);

export const Usuario = model("usuarios", usuarioSchema);
