import { model, Schema } from "mongoose";

const productoSchema = new Schema(
  {
    productoNombre: {
      type: Schema.Types.String,
      required: true,
      alias: "nombre",
      maxLength: 40,
    },
    productoPrecio: {
      type: Schema.Types.Decimal128,
      required: true,
      alias: "precio",
    },
    productoImagen: {
      type: Schema.Types.String,
      alias: "imagen",
      default: "default.png",
    },
    productoTipo: {
      type: Schema.Types.String,
      alias: "tipo",
      enum: ["LATTES", "COMIDA", "MERCHANDISING", "FRAPPS"],
    },
    detalles: {
      type: [Schema.Types.ObjectId],
    },
  },
  {
    versionKey: "__version",
  }
);

export const Producto = model("productos", productoSchema);
