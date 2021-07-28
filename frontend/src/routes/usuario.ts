import { Router } from "express";
import { login, registro } from "../controllers/usuario";

export const usuarioRouter = Router();

usuarioRouter.post("/registro", registro);
usuarioRouter.post("/login", login);
