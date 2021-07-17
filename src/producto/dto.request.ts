import { Request, Response, NextFunction } from "express";

enum tipos {
  LATTES = "LATTES",
  COMIDA = "COMIDA",
  MERCHANDISING = "MERCHANDISING",
  FRAPPS = "FRAPPS",
}

export type TActualizarProducto = {
  productoNombre: string;
  productoPrecio: number;
  productoImagen: string;
  productoTipo: tipos;
};

export const actualizarProductoDto = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: TActualizarProducto = req.body;

  const tipos = ["LATTES", "COMIDA", "MERCHANDISING", "FRAPPS"];

  const resultadoTipo = tipos.filter((tipo) => tipo === data.productoTipo)[0];

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
