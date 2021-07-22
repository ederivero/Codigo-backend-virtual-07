import { Router } from "express";
import { authValidator, personalValidator } from "../utils/validador";
import { crearMovimiento, crearPreferencia } from "./movimiento.controller";

export const movimientoRouter = Router();

movimientoRouter.route("/movimientos").post(authValidator, crearMovimiento);

movimientoRouter.post(
  "/venta",
  authValidator,
  personalValidator,
  crearPreferencia
);
