import { Router } from "express";
import { crearTarea, listarTareas, devolverTarea } from "../controllers/tareas";

export const tareas_router = Router();

// tareas_router.post("/tareas", crearTarea);
// tareas_router.get("/tareas", listarTareas);

tareas_router.route("/tareas").get(listarTareas).post(crearTarea);
tareas_router.route("/tareas/:id").get(devolverTarea);
