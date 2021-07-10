import { NextFunction, Router, Request, Response } from "express";
import { subirImagen } from "../controllers/imagen";

import Multer from "multer";
const multer = Multer({
  storage: Multer.memoryStorage(),
  //   limits: {
  //     // fileSize tamaño maximo del archiv, expresado en bytes
  //     fileSize: 5 * 1024 * 1024,
  //   },
});

export const imagenRouter = Router();

imagenRouter.post(
  "/subirImagen",
  multer.single("imagen"),
  (req: Request, res: Response, next: NextFunction) => {
    // validar que el tamaño del archivo no sea mayor a 5242880
    const archivo = req.file;

    if (archivo?.size && archivo?.size > 5242880) {
      return res.status(400).json({
        message: "Archivo demasiado grande",
      });
    } else {
      next();
    }
  },
  subirImagen
);
