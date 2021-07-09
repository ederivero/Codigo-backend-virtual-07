import { Router } from "express";
import { login, perfil, registro } from "../controllers/usuario";
import { loginRequestDto } from "../controllers/dto.request";
import { authValidator } from "../utils/validador";

export const usuarioRouter = Router();

usuarioRouter.post("/registro", registro);
usuarioRouter.post("/login", loginRequestDto, login);
usuarioRouter.get("/perfil", authValidator, perfil);
