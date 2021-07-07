import { Tipo } from "../config/models";
import { Request, Response } from "express";
import { TRespuesta } from "./dto.response";

// type prueba = {
//   nombre: string;
//   edad: number;
//   fecha_nacimiento?: Date;
// };

// let persona: prueba = {
//   edad: 18,
//   nombre: "eduardo"
// };

export const crearTipo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // siempre que usemos async-await usar try-catch generalmente para metodos de CREACION, EDICION, ELIMINACION
  try {
    const nuevoTipo = await Tipo.create(req.body);

    const rpta: TRespuesta = {
      success: true,
      message: "Tipo creado exitosamente",
      content: nuevoTipo,
    };

    return res.status(201).json(rpta);
  } catch (error) {
    console.log(error.message);
    const rpta: TRespuesta = {
      success: false,
      message: "Error al crear el tipo",
      content: error.message,
    };

    return res.status(400).json(rpta);
  }
};

// retornar todos los tipos
export const listarTipos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const tipos = await Tipo.findAll();
  const rpta: TRespuesta = {
    success: true,
    content: tipos,
    message: "",
  };

  return res.status(200).json(rpta);
};
