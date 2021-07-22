import { Request, Response } from "express";
import { Producto } from "../producto/producto.model";
import { RequestUser } from "../utils/validador";
import { IMovimiento, Movimiento } from "./movimiento.model";
import { configure } from "mercadopago";
import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";
require("dotenv").config();

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
  // access_token => esta token se creara POR CADA NEGOCIO tendra su token y esto serviria a MP para saber a que negocio tiene que a fin de periodo depositar el monto cobrado
  // integrator_id => identificacion del desarrollador que efectuo la integracion de la pasarela de pagos para reconocimientos y pagos adicionales
  configure({
    access_token: String(process.env.ACCESS_TOKEN_PR),
    integrator_id: String(process.env.INTEGRATOR_ID_PR),
  });

  const preferencia: CreatePreferencePayload = {
    auto_return: "approved",
    back_urls: {
      success: "http://127.0.0.1:8000/success",
      failure: "http://127.0.0.1:8000/failure",
      pending: "http://127.0.0.1:8000/pending",
    },
    items: [
      {
        id: "123123",
        title: "zapatito de bebe",
        description: "Zapato de moda primavera otoño 2021",
        picture_url: "http://imagen.com",
        category_id: "1",
        quantity: 1,
        currency_id: "PEN",
        unit_price: 40.8,
      },
    ],
    payer: {
      name: "Eduardo",
      surname: "De Rivero",
      email: "test_user_46542185@testuser.com",
      phone: {
        area_code: "51",
        number: "974207075",
      },
      identification: {
        type: "DNI",
        number: "22334445",
      },
      address: {
        zip_code: "04002",
        street_name: "Av Primavera",
        street_number: "1150",
      },
      date_created: "2021-07-21",
    },
    payment_methods: {
      excluded_payment_methods: [
        {
          id: "master",
        },
        {
          id: "debvisa",
        },
      ],
      installments: 5,
    },
  };
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
