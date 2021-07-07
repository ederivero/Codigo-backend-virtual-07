import { Router } from "express";
import { crearTipo, listarTipos } from "../controllers/tipo";
import { tipoRequestDto } from "../controllers/dto.request";

export const tipoRouter: Router = Router();

tipoRouter.route("/tipos").post(tipoRequestDto, crearTipo).get(listarTipos);
