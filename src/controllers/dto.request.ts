import { Request, Response, NextFunction } from "express";
import { TRespuesta } from "./dto.response";

type TTipoRequest = {
  tipoDescripcion: string;
};

type TAccionRequest = {
  accionDescripcion: string;
};

type TLoginRequest = {
  email: string;
  password: string;
};

export const tipoRequestDto = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { ...data }: TTipoRequest = req.body;
  if (data?.tipoDescripcion) {
    next();
  } else {
    const rpta: TRespuesta = {
      success: false,
      content: null,
      message: "Falta el tipoDescripcion",
    };

    return res.status(400).json(rpta);
  }
};

export const accionRequestDto = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { ...data }: TAccionRequest = req.body;

  if (data?.accionDescripcion) {
    next();
  } else {
    const rpta: TRespuesta = {
      success: false,
      content: null,
      message: "Falta la accionDescripcion",
    };

    return res.status(400).json(rpta);
  }
};

export const loginRequestDto = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { ...data }: TLoginRequest = req.body;

  if (data?.email && data?.password) {
    next();
  } else {
    const rpta: TRespuesta = {
      content: null,
      message: "Falta el email y la password",
      success: false,
    };
    return res.status(400).json(rpta);
  }
};
