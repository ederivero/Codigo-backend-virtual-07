import { Router } from "express";
import { login, registro } from "../controllers/usuario";
import { loginRequestDto } from "../controllers/dto.request";

export const usuarioRouter = Router();

usuarioRouter.post("/registro", registro);
usuarioRouter.post("/login", loginRequestDto, login);
