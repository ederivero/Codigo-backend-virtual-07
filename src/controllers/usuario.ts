import { compareSync } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { BlackList, Usuario, Imagen } from "../config/models";
import { RequestCustom } from "../utils/validador";
import { generarUrl } from "../utils/manejoArchivoFirebase";
import { TRespuesta } from "./dto.response";
require("dotenv").config();

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
      imagenId,
    } = req.body;
    // METODO 1

    const nuevoUsuario = await Usuario.create({
      usuarioCorreo,
      usuarioPassword,
      usuarioNombre,
      tipoId,
      imagenId,
    });
    // solamente el uso de joins (include) funciona en lo que seria los finds
    const usuarioEncontrado = await Usuario.findOne({
      attributes: { exclude: ["usuarioPassword"] },
      where: { usuarioId: nuevoUsuario.getDataValue("usuarioId") },
      include: { model: Imagen },
    });
    // imagenURL = "https://..."
    const imagen = usuarioEncontrado?.getDataValue("imagen");
    const url = await generarUrl(
      imagen.imagenPath,
      `${imagen.imagenNombre}.${imagen.imagenExtension}`
    );

    const respuesta = { ...usuarioEncontrado?.toJSON(), url };
    // quitar la password al momento de retornar el json
    // nuevoUsuario.setDataValue("usuarioPassword", null);

    // METODO 2
    // const nuevoUsuario = Usuario.build(req.body)
    // const passwordEncriptada = hashSync(req.body.usuarioPassword, 10);
    // nuevoUsuario.setDataValue("usuarioPassword",passwordEncriptada)
    // nuevoUsuario.save()

    const rpta: TRespuesta = {
      content: respuesta,
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
      console.log(process.env.JWT_SECRET);

      const token = sign(payload, String(process.env.JWT_SECRET), {
        expiresIn: 30,
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

export const perfil = async (
  req: RequestCustom,
  res: Response
): Promise<Response> => {
  // agregar la url de la imagen si es que tuviese
  const imagenId = req?.user?.getDataValue("imagenId");

  const imagenEncontrada = await Imagen.findByPk(imagenId);

  const url = await generarUrl(
    imagenEncontrada?.getDataValue("imagenPath"),
    `${imagenEncontrada?.getDataValue(
      "imagenNombre"
    )}.${imagenEncontrada?.getDataValue("imagenExtension")}`
  );

  const content = { ...req?.user?.toJSON(), url };

  const rpta: TRespuesta = {
    content,
    message: "",
    success: true,
  };
  return res.json(rpta);
};

export const logout = async (req: Request, res: Response) => {
  if (!req.headers.authorization) {
    const rpta: TRespuesta = {
      content: null,
      message: "Error al hacer el logout, se necesita una token en los headers",
      success: false,
    };
    return res.status(400).json(rpta);
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    await BlackList.create({ blackListToken: token });
    // el estado 204 se usa cuando para indicar que la operacion fue realizada exitosamente PERO no se retorno nada (no hay contenido)
    return res.status(204).end();
  } catch (error) {
    const rpta: TRespuesta = {
      content: null,
      message: "Error al hacer el logout",
      success: false,
    };
    return res.status(400).json(rpta);
  }
};
