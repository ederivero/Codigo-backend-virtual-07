import { Router } from "express";
import { registro } from "../controllers/usuario";

export const usuarioRouter = Router();

usuarioRouter.post("/registro", registro);
