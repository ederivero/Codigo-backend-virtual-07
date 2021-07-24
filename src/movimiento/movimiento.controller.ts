import { Request, Response } from "express";
import { Producto } from "../producto/producto.model";
import { RequestUser } from "../utils/validador";
import { IMovimiento, Movimiento } from "./movimiento.model";
import { configure, preferences } from "mercadopago";
import {
  CreatePreferencePayload,
  PreferenceItem,
} from "mercadopago/models/preferences/create-payload.model";
import { Usuario } from "../usuario/usuario.model";
import fetch from "node-fetch";
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
    // validar si el usuario existe
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      throw new Error("El usuario no existe");
    }

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
    access_token: String(process.env.ACCESS_TOKEN_MP),
    integrator_id: String(process.env.INTEGRATOR_ID_MP),
  });

  const payload: any = {
    auto_return: "approved",
    notification_url: process.env.NOTIFICATION_URL,
    back_urls: {
      success: process.env.SUCCESS_URL,
      failure: process.env.FAILURE_URL,
      pending: process.env.PENDING_URL,
    },
    // items: [
    //   {
    //     id: "123123",
    //     title: "zapatito de bebe",
    //     description: "Zapato de moda primavera otoño 2021",
    //     picture_url: "http://imagen.com",
    //     category_id: "1",
    //     quantity: 1,
    //     currency_id: "PEN",
    //     unit_price: 40.8,
    //   },
    // ],
    // payer: {
    //   name: "Eduardo",
    //   surname: "De Rivero",
    //   email: "test_user_46542185@testuser.com",
    //   phone: {
    //     area_code: "51",
    //     number: 974207075,
    //   },
    //   identification: {
    //     type: "DNI",
    //     number: "22334445",
    //   },
    //   address: {
    //     zip_code: "04002",
    //     street_name: "Av Primavera",
    //     street_number: 1150,
    //   },
    //   date_created: "2021-07-21",
    // },
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
    const usuario = await Usuario.findById(movimiento.usuarioId);
    console.log(usuario);
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }
    payload.payer = {
      name: usuario.usuarioNombre,
      surname: usuario.usuarioApellido,
      address: {
        zip_code: usuario.usuarioDireccion?.zip ?? "",
        street_name: usuario.usuarioDireccion?.calle ?? "",
        street_number: usuario.usuarioDireccion?.numero ?? 0,
      },
      phone: {
        area_code: "51",
        number: usuario.usuarioTelefono ? +usuario.usuarioTelefono : 0,
      },
      email: "test_user_46542185@testuser.com",
      identification: {
        type: "DNI",
        number: usuario.usuarioDni,
      },
    };

    // completar los items
    const items: PreferenceItem[] = [];
    console.log(req.get("host"));
    const host = req.get("host") ?? "";

    await Promise.all(
      movimiento.movimientoDetalles.map(async (detalle) => {
        const producto = await Producto.findById(detalle.productoId);
        if (producto) {
          const item: PreferenceItem = {
            id: detalle.productoId,
            title: producto?.productoNombre,
            description: "",
            picture_url: host + producto?.productoImagen,
            category_id: producto?.productoTipo,
            quantity: detalle.detalleCantidad,
            currency_id: "PEN",
            unit_price: Number(detalle.detallePrecio),
          };
          items.push(item);
        }
      })
    );

    payload.items = items;

    const preferencia = await preferences.create(payload);

    console.log(movimiento);
    console.log(preferencia);

    return res.json({
      success: true,
      content: preferencia.response.init_point,
      message: null,
    });
  } catch (error) {
    console.log(error);

    return res.status(404).json({
      success: false,
      content: error,
      message: error.message,
    });
  }
};

export const mpEventos = async (req: Request, res: Response) => {
  const { id, topic } = req.query;
  console.log("----------------------------------------");
  console.log("BODY:");
  console.log(req.body);
  console.log("----------------------------------------");
  console.log("QUERY PARAMS:");
  console.log(req.query);
  // cuando nos llegue por los query params el topic paymen y el id haremos la consulta del estado del pago a la ruta:
  // https://api.mercadopago.com/v1/payments/<id>
  // "payment_method_id": "pagoefectivo_atm", | "visa" | "mastercard" | "american_express"
  // "payment_type_id": "atm", | "credit_card"
  // "status": "pending", | "approved"
  // "status_detail": "pending_waiting_payment", | "accredited"
  // "collector_id": 677408439,
  // si es un pago con tarjeta entonces guardaremos los 6 primeros digitos de la tarjeta
  if (topic === "payment") {
    console.log("=========================================");
    console.log("Fue un pago");
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${id}`,
      { headers: { Authorization: process.env.ACCESS_TOKEN_MP ?? "" } }
    );
    const json = await response.json();
    console.log(json.status);
    console.log("=========================================");
  }

  return res.status(200).json({});
};
