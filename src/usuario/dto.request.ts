import { NextFunction, Request, Response } from "express";

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
  usuarioPassword: string;
  usuarioTipo: tipoUsuario;
};

export const registroDto = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: TRegistro = req.body;

  if (
    data.usuarioDni &&
    data.usuarioCorreo &&
    data.usuarioPassword &&
    data.usuarioTipo
  ) {
    /* buscar ese usuario en la reniec */
    // TODO: imprimir los datos de API PERU
    // agregar el nombre, apellido a la data
    data.usuarioNombre = "Juanito";
    data.usuarioApellido = "Zegarra Fuentes";
    // fin de tarea
    if (data.usuarioTipo === tipoUsuario.PERSONAL) {
      next();
    }
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
    }
  }

  return res.status(400).json({
    success: false,
    content: null,
    message: "Error al crear el usuario, faltan campos",
  });
};
