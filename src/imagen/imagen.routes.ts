import { Router } from "express";
import { subirImagen } from "./imagen.controller";
import Multer from "multer";
import { nanoid } from "nanoid";

const almacenamiento = Multer.diskStorage({
  destination: "media/",
  filename: (req, archivo, callback) => {
    const id = nanoid(5);

    const extension =
      archivo.originalname.split(".")[
        archivo.originalname.split(".").length - 1
      ];

    callback(null, `${id}.${extension}`);
  },
});

const multer = Multer({ storage: almacenamiento });
export const imagenRouter = Router();

imagenRouter.post("/subirImagen", multer.single("archivo"), subirImagen);
