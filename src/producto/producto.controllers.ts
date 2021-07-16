import { Producto } from "./producto.model";
import { Request, Response } from "express";

export const crearProducto = async (req: Request, res: Response) => {
  try {
    const nuevoProducto = await Producto.create(req.body);

    return res.status(201).json({
      success: true,
      content: nuevoProducto,
      message: "Producto creado exitosamente",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      content: error,
      message: "Error al crear el producto",
    });
  }
};

export const mostrarProductos = async (req: Request, res: Response) => {
  const resultado = await Producto.find({}, {}, { skip: 2, limit: 1 });
  return res.status(201).json({
    success: true,
    content: resultado,
    message: null,
  });
};
