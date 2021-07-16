import { Schema, model } from "mongoose";

const detalleSchema = new Schema({
  detalleCantidad: {
    types: Schema.Types.Number,
    alias: "cantidad",
    required: true,
  },
  detallePrecio: {
    type: Schema.Types.Decimal128,
    alias: "precio",
    required: true,
  },
  productoId: {
    type: Schema.Types.ObjectId,
    alias: "producto_id",
    required: true,
  },
});

const pasarellaSchema = new Schema({
  pagador: {
    type: Schema.Types.String,
    alias: "payer",
  },
});

const movimientoSchema = new Schema({
  movimientoFecha: {
    type: Schema.Types.Date,
    alias: "fecha",
    default: new Date(),
  },
  movimientoTipo: {
    type: Schema.Types.String,
    alias: "tipo",
    enum: ["INGRESO", "EGRESO"],
    required: true,
  },
  usuarioId: {
    type: Schema.Types.ObjectId,
    alias: "usuario_id",
    required: true,
  },
  vendedorId: {
    type: Schema.Types.ObjectId,
    alias: "vendedor_id",
    required: true,
  },
  movimientoDetalles: {
    type: [detalleSchema],
    alias: "detalles",
  },

  movimientoPasarela: {
    type: pasarellaSchema,
    alias: "pago",
  },
});

export const Movimiento = model("movimientos", movimientoSchema);
