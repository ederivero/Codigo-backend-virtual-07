import { Router } from "express";
import { crearAccion } from "../controllers/accion";
import { accionRequestDto } from "../controllers/dto.request";

export const accionRouter = Router();

accionRouter.route("/acciones").post(accionRequestDto, crearAccion);
