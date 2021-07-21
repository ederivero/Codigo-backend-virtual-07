import { Request, Response } from "express";

export const subirImagen = (req: Request, res: Response) => {
  const archivo = req.file;
  console.log(archivo);

  return res.status(201).json({
    success: true,
    content: archivo?.path,
    message: "archivo subido exitosamente",
  });
};
