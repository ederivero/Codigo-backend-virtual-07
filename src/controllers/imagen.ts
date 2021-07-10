import { Request, Response } from "express";
import { subirArchivoUtil } from "../utils/manejoArchivoFirebase";

export const subirImagen = async (req: Request, res: Response) => {
  console.log(req.file);
  let respuesta;
  if (req.file) {
    respuesta = await subirArchivoUtil(req.file);
  }
  return res.status(200).json({
    message: respuesta,
  });
};
