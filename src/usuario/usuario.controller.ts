import { Request, Response } from "express";
import { Usuario } from "./usuario.model";

export const registro = async (req: Request, res: Response) => {
  // crear el dto y validar los campos necesarios
  console.log(req.body);
  const nuevoUsuario = await Usuario.create(req.body);

  delete nuevoUsuario._doc["usuarioPassword"];

  return res.status(201).json({
    success: true,
    content: nuevoUsuario,
    message: "Usuario creado exitosamente",
  });
  // guardar el usuario en la bd y devolver todo el usuario menos la password
};

export const login = (req: Request, res: Response) => {
  const { correo, password } = req.body;
};
