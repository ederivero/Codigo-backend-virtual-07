import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { TRespuesta } from "../controllers/dto.response";
import { Usuario, BlackList, Tipo } from "../config/models";
import { Model, Op } from "sequelize";

export interface RequestCustom extends Request {
  user?: Model | null;
}

const verificarToken = (token: string) => {
  try {
    const payload = verify(token, String(process.env.JWT_SECRET));

    return payload;
  } catch (error) {
    console.log(error.message);

    return error.message;
  }
};

export const authValidator = async (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  // primero valido si me provee la token x la authorizations sino, retorno un estado 401
  if (!req.headers.authorization) {
    const rpta: TRespuesta = {
      content: null,
      message: "Se necesita una Token en authorizations",
      success: false,
    };
    return res.status(401).json(rpta);
  }
  // Bearer 1231.23123123.12312313
  const token = req.headers.authorization.split(" ")[1];
  // ["Bearer", "1231.23123123.12312313"]

  // TODO: agregar la funcionalidad para que si esa token ya esta en la blacklist  entonces no deberia proceder
  const blacklistToken = await BlackList.findByPk(token);
  // const blacklistToken2 = await BlackList.findOne({
  //   where: { blackListToken: token },
  // });

  if (blacklistToken) {
    const rpta: TRespuesta = {
      content: null,
      message: "Token invalida",
      success: false,
    };
    return res.status(401).json(rpta);
  }

  const respuesta = verificarToken(token);

  console.log(respuesta);
  if (typeof respuesta === "object") {
    // console.log("token valida");
    // Buscar ese usuario en la bd segun el payload
    const usuario = await Usuario.findByPk(respuesta.usuarioId, {
      attributes: { exclude: ["usuarioPassword"] },
      logging: true,
    });
    // console.log(usuario?.getDataValue("usuarioNombre"));
    // console.log(usuario);

    req.user = usuario;

    next();
  } else {
    const rpta: TRespuesta = {
      content: null,
      message: "Token invalida",
      success: false,
    };

    return res.status(401).json(rpta);
  }
};

export const isAdmin = async (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  const administrador = await Tipo.findOne({
    where: { tipoDescripcion: { [Op.like]: "%ADMINISTRADOR%" } },
  });

  if (
    req.user?.getDataValue("tipoId") === administrador?.getDataValue("tipoId")
  ) {
    next();
  } else {
    const rpta: TRespuesta = {
      content: null,
      message: "El usuario no es administrador",
      success: false,
    };

    return res.status(401).json(rpta);
  }
};
