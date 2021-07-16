import { Request, Response } from "express";
import { Producto } from "../config/models";
import { RequestCustom } from "../utils/validador";
import { TRespuesta } from "./dto.response";

export const crearProducto = async (
  req: RequestCustom,
  res: Response
): Promise<Response> => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    console.log(req.user);

    const rpta: TRespuesta = {
      content: nuevoProducto,
      success: true,
      message: "Producto creado exitosamente",
    };

    return res.status(201).json(rpta);
  } catch (error) {
    const rpta: TRespuesta = {
      content: error,
      success: false,
      message: "Error al crear el producto",
    };

    return res.status(400).json(rpta);
  }
};

export const listarProductos = async (req: RequestCustom, res: Response) => {
  let { pagina, porPagina } = req.query;
  if (!pagina) {
    pagina = "1";
  }
  if (!porPagina) {
    porPagina = "2";
  }
  const offset = (+pagina - 1) * +porPagina;
  const limit = +porPagina;

  const [productos, total] = await Promise.all([
    Producto.findAll({
      limit,
      offset,
    }),
    Producto.count(),
  ]);

  const itemsXPagina = +total >= +porPagina ? +porPagina : total;
  const totalDePaginas = Math.ceil(+total / itemsXPagina);
  const paginaPrevia = +pagina > 1 && +pagina <= total ? +pagina - 1 : null;
  const paginaSiguiente =
    total > 1 && +pagina < totalDePaginas ? +pagina + 1 : null;

  const paginacionSerializer = {
    porPagina: itemsXPagina,
    total,
    pagina: +pagina,
    paginaPrevia,
    paginaSiguiente,
    totalDePaginas,
  };

  return res
    .status(200)
    .json({ paginacion: paginacionSerializer, data: productos });
};
