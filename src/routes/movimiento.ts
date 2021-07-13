import { Router } from "express";
import { movimientoRequestDto } from "../controllers/dto.request";
import { crearMovimiento } from "../controllers/movimiento";
import { authValidator } from "../utils/validador";

export const movimientoRouter = Router();

movimientoRouter
  .route("/movimientos")
  .post(authValidator, movimientoRequestDto, crearMovimiento);
