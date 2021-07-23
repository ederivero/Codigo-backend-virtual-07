import { Router } from "express";
import { authValidator, personalValidator } from "../utils/validador";
import {
  crearMovimiento,
  crearPreferencia,
  mpEventos,
} from "./movimiento.controller";

export const movimientoRouter = Router();

movimientoRouter.route("/movimientos").post(authValidator, crearMovimiento);

movimientoRouter.post(
  "/venta",
  authValidator,
  personalValidator,
  crearPreferencia
);

// movimientoRouter.route("/mercadopago-ipn").post(mpEventos)

movimientoRouter.post("/mercadopago-ipn", mpEventos);
