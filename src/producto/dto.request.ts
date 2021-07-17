import { Request, Response, NextFunction } from "express";

const TIPOS = ["LATTES", "COMIDA", "MERCHANDISING", "FRAPPS"];

export type TActualizarProducto = {
  productoNombre: string;
  productoPrecio: number;
  productoImagen: string;
  productoTipo: string;
};

export const actualizarProductoDto = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: TActualizarProducto = req.body;

  const resultadoTipo = TIPOS.filter((tipo) => tipo === data.productoTipo)[0];

  if (
    data.productoNombre &&
    data.productoImagen &&
    data.productoPrecio &&
    data.productoTipo &&
    resultadoTipo
  ) {
    next();
  } else {
    const rpta = {
      success: false,
      content: null,
      message: "Falta campos",
    };
    return res.status(400).json(rpta);
  }
};
