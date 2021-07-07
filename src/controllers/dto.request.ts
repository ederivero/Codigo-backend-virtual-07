import { Request, Response, NextFunction } from "express";
import { TRespuesta } from "./dto.response";

type TTipoRequest = {
  tipoDescripcion: string;
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
