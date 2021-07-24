import { Schema, model } from "mongoose";

interface Detalle {
  detalleCantidad: number;
  detallePrecio: number;
  productoId: string;
}

interface Pasarela {
  paymentMethodId?: string;
  paymentTypeId?: string;
  status?: string;
  statusDetail?: string;
  collectorId?: string;
  firstSixDigits?: string;
}

export interface IMovimiento {
  movimientoFecha?: Date;
  movimientoTipo: string;
  usuarioId: string;
  vendedorId: string;
  movimientoDetalles: Array<Detalle>;
  movimientoPasarela: Pasarela;
}

const detalleSchema = new Schema<Detalle>(
  {
    detalleCantidad: {
      type: Schema.Types.Number,
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
  },
  { _id: false }
);

const pasarelaSchema = new Schema<Pasarela>(
  {
    paymentMethodId: {
      type: Schema.Types.String,
      alias: "payment_method_id",
    },
    paymentTypeId: {
      type: Schema.Types.String,
      alias: "payment_type_id",
    },
    status: {
      type: Schema.Types.String,
    },
    statusDetail: {
      type: Schema.Types.String,
      alias: "status_detail",
    },
    collectorId: {
      type: Schema.Types.String,
      alias: "collector_id",
    },
    firstSixDigits: {
      type: Schema.Types.String,
      alias: "first_six_digits",
    },
  },
  { _id: false }
);

const movimientoSchema = new Schema<IMovimiento>({
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

export const Movimiento = model<IMovimiento>("movimientos", movimientoSchema);
