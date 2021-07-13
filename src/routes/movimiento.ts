import { Router } from "express";
import { movimientoRequestDto } from "../controllers/dto.request";
import { crearMovimiento, listarMovimientos } from "../controllers/movimiento";
import { authValidator, isAdmin } from "../utils/validador";

export const movimientoRouter = Router();

movimientoRouter
  .route("/movimientos")
  .post(authValidator, movimientoRequestDto, crearMovimiento)
  .get(authValidator, isAdmin, listarMovimientos);
