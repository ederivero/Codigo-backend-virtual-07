import { Router } from "express";
import * as tareasController from "../controllers/tareas";

export const tareas_router = Router();

tareas_router
  .route("/tareas")
  .post(tareasController.serializadorTarea, tareasController.crearTarea)
  .get(tareasController.listarTareas);
