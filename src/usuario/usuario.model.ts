import { Schema, model } from "mongoose";
import { hashSync } from "bcrypt";

interface Direccion {
  zip?: string;
  calle?: string;
  numero?: string;
}
interface Usuario {
  usuarioCorreo: string;
  usuarioNombre: string;
  usuarioApellido: string;
  usuarioTelefono?: string;
  usuarioDni: string;
  usuarioDireccion?: Direccion;
  usuarioPassword?: string;
  usuarioTipo: string;
}

const direccionSchema = new Schema<Direccion>(
  {
    zip: Schema.Types.String,
    calle: Schema.Types.String,
    numero: Schema.Types.Number,
  },
  { _id: false, timestamps: false }
);

const usuarioSchema = new Schema<Usuario>(
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
      required: true,
    },
    usuarioDireccion: {
      type: direccionSchema,
      alias: "direccion",
    },
    usuarioPassword: {
      type: Schema.Types.String,
      set: (valor: string) => hashSync(valor, 10),
      alias: "password",
      select: false,
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

export const Usuario = model<Usuario>("usuarios", usuarioSchema);
