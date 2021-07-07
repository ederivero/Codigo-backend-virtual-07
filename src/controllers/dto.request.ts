import { Request, Response, NextFunction } from "express";
import { TRespuesta } from "./dto.response";

type TTipoRequest = {
  tipoDescripcion: string;
};

type TAccionRequest = {
  accionDescripcion: string;
};

export const tipoRequestDto = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => {
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
) => {
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
