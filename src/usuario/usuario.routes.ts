import { Router } from "express";
import { registroDto } from "./dto.request";
import { login, registro } from "./usuario.controller";

export const usuarioRouter = Router();
usuarioRouter.post("/registro", registroDto, registro);
usuarioRouter.post("/login", login);
