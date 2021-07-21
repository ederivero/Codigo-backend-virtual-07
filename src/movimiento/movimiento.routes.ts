import { Router } from "express";
import { authValidator } from "../utils/validador";
import { crearMovimiento } from "./movimiento.controller";

export const movimientoRouter = Router();

movimientoRouter.route("/movimientos").post(authValidator, crearMovimiento);
