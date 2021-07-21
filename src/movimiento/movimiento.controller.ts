import { Request, Response } from "express";
import { RequestUser } from "../utils/validador";
import { Movimiento } from "./movimiento.model";

export const crearMovimiento = async (req: RequestUser, res: Response) => {
  //   const token = "asdasd.asdasda.asdasd"; // sacare el vendedor_id
  //   const body = {
  //     fecha: "2021-07-20 19:45",
  //     tipo: "EGRESO",
  //     clienteId: "1456as4d6a5s4d",
  //     detalle: [
  //       {
  //         cantidad: 2,
  //         producto: "1asd67a8s7d",
  //       },
  //       {
  //         cantidad: 1,
  //         producto: "a9s8d7a89d",
  //       },
  //       {
  //         cantidad: 3,
  //         producto: "87ghd89fg78g",
  //       },
  //     ],
  //   };
  console.log(req.user);
  const { movimientoFecha, movimientoTipo, movimientoDetalles, usuarioId } =
    req.body;

  movimientoDetalles.forEach(
    (detalle: { detalleCantidad: number; detalleProducto: string }) => {}
  );
  return res.json({
    success: true,
  });
};
