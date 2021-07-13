import { Request, Response } from "express";
import { Op } from "sequelize/types";
import { Movimiento, DetalleMovimiento, Tipo } from "../config/models";
import conexion from "../config/sequelize";
import { RequestCustom } from "../utils/validador";
import { TMovimientoRequest } from "./dto.request";
import { TRespuesta } from "./dto.response";

export const crearMovimiento = async (req: RequestCustom, res: Response) => {
  const transaccion = await conexion.transaction();
  try {
    const {
      movimientoFecha,
      movimientoTipo,
      movimientoDetalle,
    }: TMovimientoRequest = req.body;
    const nuevoMovimiento = await Movimiento.create(
      {
        movimientoFecha,
        movimientoTipo,
        movimientoTotal: 0.0,
        usuarioId: req.user?.getDataValue("usuarioId"),
      },
      { transaction: transaccion }
    );
    // movimientoDetalle.forEach(async (detalle) => {
    //   await DetalleMovimiento.create({
    //     detalleMovimientoCantidad: detalle.detalleMovimientoCantidad,
    //     detalleMovimientoPrecio: detalle.detalleMovimientoPrecio,
    //     productoId: detalle.productoId,
    //     movimientoId: nuevoMovimiento.getDataValue("movimientoId"),
    //   });
    // });
    // El foreEach crea una funcion en cada elemento del arreglo mientras que el map retorna un arreglo con los resultados de la iteracion del arreglo original
    let total = 0.0;
    const movimientoDetalles = await Promise.all(
      movimientoDetalle.map(
        async ({
          detalleMovimientoCantidad,
          detalleMovimientoPrecio,
          productoId,
        }) => {
          // en cada creacion modificar el total
          total += detalleMovimientoCantidad * detalleMovimientoPrecio;
          return await DetalleMovimiento.create(
            {
              detalleMovimientoCantidad,
              detalleMovimientoPrecio,
              productoId,
              movimientoId: nuevoMovimiento.getDataValue("movimientoId"),
            },
            { transaction: transaccion }
          );
        }
      )
    );

    nuevoMovimiento.setDataValue("movimientoTotal", total);

    await nuevoMovimiento.save({ transaction: transaccion });

    await transaccion.commit();

    const rpta: TRespuesta = {
      content: {
        nuevoMovimiento,
        detalleMovimiento: movimientoDetalles,
      },
      message: "Movimiento creado exitosamente",
      success: true,
    };

    return res.status(201).json(rpta);
  } catch (error) {
    await transaccion.rollback();

    const rpta: TRespuesta = {
      content: null,
      message: "Error al crear el movimiento",
      success: false,
    };

    return res.status(400).json(rpta);
  }
};

export const listarMovimientos = async (req: RequestCustom, res: Response) => {
  // 127.0.0.1:8000/movimientos?pagina=2&porPagina=5
  const { pagina, porPagina } = req.query;
  // limit => cuantos elementos por pagina
  // offset => cuantos elementos se saltara
  // HELPER DE PAGINACION
  if (pagina && porPagina) {
    const offset = (+pagina - 1) * +porPagina;
    const limit = +porPagina;

    const [movimientos, total] = await Promise.all([
      Movimiento.findAll({
        limit,
        offset,
      }),
      Movimiento.count(),
    ]);

    const itemsXPagina = +total >= +porPagina ? +porPagina : total;
    const totalDePaginas = Math.ceil(+total / itemsXPagina);
    const paginaPrevia = +pagina > 1 && +pagina <= total ? +pagina - 1 : null;
    const paginaSiguiente =
      total > 1 && +pagina < totalDePaginas ? +pagina + 1 : null;

    const paginacionSerializer = {
      porPagina: itemsXPagina,
      total,
      pagina,
      paginaPrevia,
      paginaSiguiente,
      totalDePaginas,
    };

    return res
      .status(200)
      .json({ paginacion: paginacionSerializer, data: movimientos });
  }
};
