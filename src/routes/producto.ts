import { Router } from "express";
import { productoRequestDto } from "../controllers/dto.request";
import { crearProducto } from "../controllers/producto";
import { authValidator } from "../utils/validador";

export const productoRouter = Router();

productoRouter
  .route("/productos")
  .post(authValidator, productoRequestDto, crearProducto);
