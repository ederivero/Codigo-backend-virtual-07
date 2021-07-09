import { Request, Response } from "express";
import { Producto } from "../config/models";
import { RequestCustom } from "../utils/validador";
import { TRespuesta } from "./dto.response";

export const crearProducto = async (
  req: RequestCustom,
  res: Response
): Promise<Response> => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    console.log(req.user);

    const rpta: TRespuesta = {
      content: nuevoProducto,
      success: true,
      message: "Producto creado exitosamente",
    };

    return res.status(201).json(rpta);
  } catch (error) {
    const rpta: TRespuesta = {
      content: error,
      success: false,
      message: "Error al crear el producto",
    };

    return res.status(400).json(rpta);
  }
};
