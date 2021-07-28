import { compareSync } from "bcrypt";
import { Request, Response } from "express";
import { Usuario } from "../config/models";
import { sign } from "jsonwebtoken";
// import { Logger } from "tslog";

// const log = new Logger({ name: "logger" });

export const registro = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { usuarioCorreo, usuarioPassword, usuarioNombre, imagenId } =
      req.body;

    const nuevoUsuario = await Usuario.create({
      usuarioCorreo,
      usuarioPassword,
      usuarioNombre,
      imagenId,
    });

    const usuarioEncontrado = await Usuario.findOne({
      attributes: { exclude: ["usuarioPassword"] },
      where: { usuarioId: nuevoUsuario.getDataValue("usuarioId") },
    });

    const rpta = {
      content: usuarioEncontrado?.toJSON(),
      message: "Usuario creado exitosamente",
      success: true,
    };
    return res.status(201).json(rpta);
  } catch (error) {
    const rpta = {
      content: error,
      message: "Error al crear el usuario",
      success: false,
    };

    return res.status(400).json(rpta);
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({
    where: {
      usuarioCorreo: email,
    },
  });

  if (usuario) {
    const resultado = compareSync(
      password,
      usuario.getDataValue("usuarioPassword")
    );
    if (resultado) {
      // entonces es el usuario y su contraseña es la correcta
      const payload = {
        usuarioId: usuario.getDataValue("usuarioId"),
      };

      const token = sign(payload, String(process.env.JWT_SECRET), {
        expiresIn: "1h",
      });
      const rpta = {
        success: true,
        content: token,
        message: "",
      };
      return res.json(rpta);
    }
  }

  const rpta = {
    success: false,
    content: null,
    message: "Credenciales incorrectas",
  };
  return res.status(404).json(rpta);
};
