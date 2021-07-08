import { compareSync, hashSync } from "bcrypt";
import { Request, Response } from "express";
import { Usuario } from "../config/models";
import { TRespuesta } from "./dto.response";
import { sign } from "jsonwebtoken";

export const registro = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      email: usuarioCorreo,
      password: usuarioPassword,
      nombre: usuarioNombre,
      tipo: tipoId,
    } = req.body;
    // METODO 1

    const nuevoUsuario = await Usuario.create({
      usuarioCorreo,
      usuarioPassword,
      usuarioNombre,
      tipoId,
    });

    // quitar la password al momento de retornar el json
    nuevoUsuario.setDataValue("usuarioPassword", null);

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

export const login = async (req: Request, res: Response) => {
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
      const rpta: TRespuesta = {
        success: true,
        content: token,
        message: "",
      };
      return res.json(rpta);
    }
  }

  const rpta: TRespuesta = {
    success: false,
    content: null,
    message: "Credenciales incorrectas",
  };
  return res.status(404).json(rpta);
};
