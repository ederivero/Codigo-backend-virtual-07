import { Router } from "express";
import * as tareasController from "../controllers/tareas";

export const tareas_router = Router();

tareas_router
  .route("/tareas")
  .post(tareasController.serializadorTarea, tareasController.crearTarea)
  .get(tareasController.listarTareas);

tareas_router
  .route("/tareas/:id")
  .put(tareasController.actualizarTarea)
  .delete(tareasController.eliminarTarea);

tareas_router.get("/buscarTarea", tareasController.tareaBusqueda);
