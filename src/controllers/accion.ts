import { Request, Response } from "express";
import { Accion } from "../config/models";
import { TRespuesta } from "./dto.response";

export const crearAccion = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const nuevaAccion = await Accion.create(req.body);

    const rpta: TRespuesta = {
      success: true,
      content: nuevaAccion,
      message: "Accion creada exitosamente",
    };

    return res.status(201).json(rpta);
  } catch (error) {
    const rpta: TRespuesta = {
      success: false,
      content: error.message,
      message: "Error al crear la accion",
    };
    return res.status(400).json(rpta);
  }
};
