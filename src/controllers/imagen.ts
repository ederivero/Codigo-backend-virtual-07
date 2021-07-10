import { Request, Response } from "express";
import { Imagen } from "../config/models";
import { subirArchivoUtil } from "../utils/manejoArchivoFirebase";
import { TRespuesta } from "./dto.response";

export const subirImagen = async (req: Request, res: Response) => {
  // /subirImagen?carpeta=usuario
  // /subirImagen?carpeta=producto
  // console.log(req.file);
  console.log(req.query);

  const { carpeta } = req.query;
  console.log(carpeta);

  if (!carpeta) {
    return res.status(400).json({
      message: "Falta la carpeta de destino",
    });
  }

  if (req.file) {
    const archivo = req.file;
    try {
      const respuesta = await subirArchivoUtil(archivo, String(carpeta));
      // luego de subir el archivo a firebase, guardar la imagen
      let nombre: string[] | string = archivo.originalname.split(".");

      const extension = nombre[nombre.length - 1];

      nombre = archivo.originalname.replace(`.${extension}`, "");

      await Imagen.create({
        imagenNombre: nombre,
        imagenExtension: extension,
        imagenPath: carpeta,
      });

      const rpta: TRespuesta = {
        content: respuesta,
        message: "Archivo subido exitosamente",
        success: true,
      };

      return res.status(200).json(rpta);
    } catch (error) {
      const rpta: TRespuesta = {
        content: null,
        message: "error al crear la imagen",
        success: false,
      };

      return res.status(400).json(rpta);
    }
  }
};
