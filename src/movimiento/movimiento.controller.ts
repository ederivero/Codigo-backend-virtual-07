import { Request, Response } from "express";
import { Producto } from "../producto/producto.model";
import { RequestUser } from "../utils/validador";
import { IMovimiento, Movimiento } from "./movimiento.model";

// https://www.typescriptlang.org/docs/handbook/utility-types.html
interface ILMovimiento extends Omit<IMovimiento, "vendedorId"> {}

export const crearMovimiento = async (req: RequestUser, res: Response) => {
  // console.log(req.user._id);
  const vendedor = req.user._id;
  const {
    movimientoFecha,
    movimientoTipo,
    movimientoDetalles,
    usuarioId,
  }: ILMovimiento = req.body;
  try {
    await Promise.all(
      movimientoDetalles.map(async (detalle) => {
        console.log(detalle.productoId);
        console.log(detalle.detalleCantidad);
        const producto = await Producto.findById(detalle.productoId);
        if (!producto) {
          throw new Error(`No existe el producto ${detalle.productoId}`);
        }
        detalle.detallePrecio = Number(producto?.productoPrecio);
        console.log(Number(producto?.productoPrecio));
      })
    );

    const movimiento: IMovimiento = {
      movimientoFecha,
      movimientoTipo,
      movimientoDetalles,
      usuarioId,
      vendedorId: vendedor,
    };

    const nuevoMovimiento = await Movimiento.create(movimiento);
    console.log("hola como estan");

    return res.status(201).json({
      success: true,
      content: nuevoMovimiento,
      message: "Movimiento registrado exitosamente",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      content: error.message,
      message: "Error al crear el movimiento",
    });
  }
};

export const crearPreferencia = async (req: Request, res: Response) => {
  // solamente un PERSONAL puede crear una preferencia ✔
  // de acuerdo al id del movimiento por el body buscar en la bd si existe sino no proceder

  const { movimientoId } = req.body;
  try {
    const movimiento = await Movimiento.findById(movimientoId);
    if (!movimiento) {
      throw new Error();
    }
    // devolver todos los detalles con sus  respectivos productos
    // {
    //   movimientoId: "123123l2313k13j";
    // }
    return res.json({
      success: true,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      content: null,
      message: `El movimiento no existe`,
    });
  }
};
