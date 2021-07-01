import { Router } from "express";
import { crearTarea } from "../controllers/tareas";

export const tareas_router = Router();

tareas_router.post("/tareas", crearTarea);
