import { Schema, model } from "mongoose";
import { hashSync } from "bcrypt";

const direccionSchema = new Schema(
  {
    zip: Schema.Types.String,
    calle: Schema.Types.String,
    numero: Schema.Types.Number,
  },
  { _id: false, timestamps: false }
);

const usuarioSchema = new Schema(
  {
    usuarioCorreo: {
      type: Schema.Types.String,
      alias: "correo",
      required: true,
      index: true,
      unique: true,
    },
    usuarioNombre: {
      type: Schema.Types.String,
      alias: "nombre",
      required: true,
    },
    usuarioApellido: {
      type: Schema.Types.String,
      alias: "apellido",
      required: true,
    },
    usuarioTelefono: {
      type: Schema.Types.String,
      alias: "telefono",
    },
    usuarioDni: {
      type: Schema.Types.String,
      alias: "dni",
      index: true,
      unique: true,
    },
    usuarioDireccion: {
      type: direccionSchema,
      alias: "direccion",
    },
    usuarioPassword: {
      type: Schema.Types.String,
      set: (valor: string) => hashSync(valor, 10),
      alias: "password",
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
