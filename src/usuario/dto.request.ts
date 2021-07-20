import { NextFunction, Request, Response } from "express";
import fetch from "node-fetch";
require("dotenv").config();

enum tipoUsuario {
  CLIENTE = "CLIENTE",
  PERSONAL = "PERSONAL",
}

type TRegistro = {
  usuarioCorreo: string;
  usuarioTelefono?: string;
  usuarioDni: string;
  usuarioNombre?: string;
  usuarioApellido?: string;
  usuarioDireccion?: {
    zip: string;
    calle: string;
    numero: number;
  };
  usuarioPassword?: string;
  usuarioTipo: tipoUsuario;
};

interface IRptaApiPeru {
  success: boolean;
  message?: string;
  data?: {
    numero: string;
    nombre_completo: string;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    codigo_verificacion: number;
  };
}

export const registroDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: TRegistro = req.body;

  if (data.usuarioDni && data.usuarioCorreo && data.usuarioTipo) {
    /* buscar ese usuario en la reniec */
    const respuesta = await fetch(
      `${process.env.BASE_URL_API_PERU}dni/${data.usuarioDni}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_PERU_TOKEN}`,
        },
      }
    );
    const json = (await respuesta.json()) as IRptaApiPeru;
    // const json1: IRptaApiPeru = await respuesta.json();
    console.log(json);

    if (json.success === false) {
      return res.status(400).json({
        success: false,
        content: null,
        message: json?.message,
      });
    }

    // TODO: imprimir los datos de API PERU
    // agregar el nombre, apellido a la data
    data.usuarioNombre = json.data?.nombres;
    data.usuarioApellido = `${json.data?.apellido_paterno} ${json.data?.apellido_materno}`;
    // fin de tarea
    if (data.usuarioTipo === tipoUsuario.PERSONAL && data?.usuarioPassword) {
      next();
    } else {
      if (data.usuarioTipo === tipoUsuario.CLIENTE) {
        if (data.usuarioDireccion && data.usuarioTelefono) {
          next();
        } else {
          return res.status(400).json({
            success: false,
            content: null,
            message: "Error al crear el cliente, faltan campos",
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          content: null,
          message: "Error al crear el personal, faltan campos",
        });
      }
    }
  } else {
    return res.status(400).json({
      success: false,
      content: null,
      message: "Error al crear el usuario, faltan campos",
    });
  }
};
