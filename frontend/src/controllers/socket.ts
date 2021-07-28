import { Cuarto, Mensaje, Usuario } from "../config/models";
import Server from "../config/server";
import { EAccion } from "../utils/enums";
import { ILogin, IMensaje } from "../utils/interfaces";
import { Logger } from "tslog";

// export const crearRoom = async (data: ICuarto) => {
//   const objServidor = new Server();
//   const { nombre } = data;
//   await Cuarto.create({ cuartoNombre: nombre });
//   const rooms = await Cuarto.findAll();
//   objServidor.io.emit("emitirRooms", { rooms });
// };
const logger: Logger = new Logger({ name: "Socket" });
export const crearMensaje = async (
  data: IMensaje,
  rooms: Set<string>
): Promise<void> => {
  const objServidor = new Server();

  const { usuarioId, mensaje, roomId } = data;

  const [usuario, cuarto] = await Promise.all([
    Usuario.findByPk(usuarioId),
    Cuarto.findByPk(roomId),
  ]);

  if (!usuario || !cuarto) {
    logger.error("error");
  }
  await Mensaje.create({
    mensajeTexto: mensaje,
    cuartoId: cuarto?.getDataValue("cuartoId"),
    usuarioId: usuario?.getDataValue("usuarioId"),
  });

  const mensajes = await Mensaje.findAll({
    where: { cuartoId: cuarto?.getDataValue("cuartoId") },
    include: {
      model: Usuario,
      attributes: { exclude: ["usuarioPassword", "usuarioId"] },
    },
  });
  let room = "";
  switch (true) {
    case rooms.has("Cuarto 1"):
      room = "Cuarto 1";
      break;
    case rooms.has("Cuarto 2"):
      room = "Cuarto 2";
      break;
    case rooms.has("Cuarto 3"):
      room = "Cuarto 3";
      break;
    case rooms.has("Cuarto 4"):
      room = "Cuarto 4";
      break;
    case rooms.has("Cuarto 5"):
      room = "Cuarto 5";
      break;
    default:
      break;
  }
  objServidor.io.to(room).emit("emitir-mensajes", { mensajes });
};

const sesiones = async (usuario: ILogin, accion: EAccion): Promise<void> => {
  const objServidor = new Server();
  const { usuarioCorreo } = usuario;
  const usuarioEncontrado = await Usuario.findOne({
    where: { usuarioCorreo },
  });
  if (usuarioEncontrado) {
    if (accion === EAccion.LOGIN) {
      await Usuario.update(
        {
          usuarioLastLogin: new Date(),
          usuarioOnline: true,
        },
        { where: { usuarioId: 1 } }
      );
    }
    if (accion === EAccion.LOGOUT) {
      await Usuario.update(
        { usuarioOnline: true },
        { where: { usuarioId: 1 } }
      );
    }
    const usuariosActivos = await Usuario.findAll({
      where: { usuarioOnline: true },
      attributes: { exclude: ["usuarioPassword"] },
    });

    objServidor.io.emit("emitir-usuarios", { usuariosActivos });
  } else {
    objServidor.io.disconnectSockets(true);
  }
};

export const iniciarSesion = (usuario: ILogin): void => {
  sesiones(usuario, EAccion.LOGIN);
};

export const cerrarSesion = (usuario: ILogin): void => {
  sesiones(usuario, EAccion.LOGOUT);
};
