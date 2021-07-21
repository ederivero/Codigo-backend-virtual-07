import { Schema, model } from "mongoose";

interface Detalle {
  detalleCantidad: number;
  detallePrecio: number;
  productoId: string;
}

interface Pasarela {
  pagador?: string;
}

interface Movimiento {
  movimientoFecha?: Date;
  movimientoTipo: string;
  usuarioId: string;
  vendedorId: string;
  movimientoDetalles: Array<Detalle>;
  movimientoPasarela?: Pasarela;
}

const detalleSchema = new Schema<Detalle>({
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

const pasarelaSchema = new Schema<Pasarela>({
  pagador: {
    type: Schema.Types.String,
    alias: "payer",
  },
});

const movimientoSchema = new Schema<Movimiento>({
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
    required: true,
  },

  movimientoPasarela: {
    type: pasarelaSchema,
    alias: "pago",
  },
});

export const Movimiento = model<Movimiento>("movimientos", movimientoSchema);
