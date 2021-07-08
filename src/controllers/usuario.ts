import { hashSync } from "bcrypt";
import { Request, Response } from "express";
import { Usuario } from "../config/models";
import { TRespuesta } from "./dto.response";

export const registro = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // METODO 1
    const nuevoUsuario = await Usuario.create(req.body);

    // METODO 2
    // const nuevoUsuario = Usuario.build(req.body)
    // const passwordEncriptada = hashSync(req.body.usuarioPassword, 10);
    // nuevoUsuario.setDataValue("usuarioPassword",passwordEncriptada)
    // nuevoUsuario.save()

    const rpta: TRespuesta = {
      content: nuevoUsuario,
      message: "Usuario creado exitosamente",
      success: true,
    };
    console.log(await Usuario.findAll());
    return res.status(201).json(rpta);
  } catch (error) {
    const rpta: TRespuesta = {
      content: error,
      message: "Error al crear el usuario",
      success: false,
    };

    return res.status(400).json(rpta);
  }
};
