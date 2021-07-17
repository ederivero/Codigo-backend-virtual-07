import { Router } from "express";
import { actualizarProductoDto } from "./dto.request";
import {
  crearProducto,
  actualizarProducto,
  mostrarProductos,
  eliminarProducto,
} from "./producto.controllers";

export const productoRouter = Router();

productoRouter.route("/productos").post(crearProducto).get(mostrarProductos);

productoRouter
  .route("/productos/:id")
  .patch(actualizarProducto)
  .put(actualizarProductoDto, actualizarProducto)
  .delete(eliminarProducto);
