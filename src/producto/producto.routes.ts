import { Router } from "express";
import { crearProducto, mostrarProductos } from "./producto.controllers";

export const productoRouter = Router();

productoRouter.route("/productos").post(crearProducto).get(mostrarProductos);
