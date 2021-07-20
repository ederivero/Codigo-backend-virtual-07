import { Router } from "express";
import { registroDto } from "./dto.request";
import { registro } from "./usuario.controller";

export const usuarioRouter = Router();
usuarioRouter.post("/registro", registroDto, registro);
