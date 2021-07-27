import express, { Request, Response } from "express";
import { Express } from "express";
import { Server as SocketIO } from "socket.io";
import { createServer, Server as HTTPServer } from "http";
interface IRegistro {
  username: string;
}
interface IUsuario extends IRegistro {
  id: string;
}

export default class Server {
  app: Express;
  port: string | number;
  httpServer: HTTPServer;
  io: SocketIO;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;
    this.httpServer = createServer(this.app);
    this.io = new SocketIO(this.httpServer, {
      cors: { origin: ["http://127.0.0.1:5502", "http://localhost:5502"] },
    });
    this.rutas();
    this.escucharSockets();
  }

  rutas() {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({
        success: true,
        message: "Yo soy la respuesta desde un controlador REST",
      });
    });
  }

  escucharSockets() {
    // el metodo on se ejecutara cuando el cliente envie ese evento
    // nosotros podemos crear los eventos que querramos PEEEERO hay metodos ya creados que no se pueden modificar
    let usuarios: Array<IUsuario> = [];
    this.io.on("connect", (cliente) => {
      console.log(`Se conecto el cliente! ${cliente.id}`);

      cliente.on("registrar", (objCliente: IRegistro) => {
        // validamos si ese usuario no fue registrado previamente
        const usuarioEncontrado = usuarios.filter(
          (usuario) => usuario.id === cliente.id
        )[0];
        if (!usuarioEncontrado) {
          usuarios.push({
            username: objCliente.username,
            id: cliente.id,
          });
          console.log(usuarios);
          this.io.emit("lista-usuarios", usuarios);
        }
      });

      cliente.on("disconnect", (razon) => {
        console.log(razon);
        // cuando el usuario se desconecte, retirarlo de la lista de usuarios
        usuarios = usuarios.filter((usuario) => usuario.id !== cliente.id);
        console.log(usuarios);
        // estamos haciendo un broadcast estamos enviando el evento a todos los usuarios conectados
        this.io.emit("lista-usuarios", usuarios);
        console.log(`Se desconecto el usuario ${cliente.id}`);
      });
      // si nosotros queremos hacer la emision de un evento pero solamente al usuario que la ha solicitado entonces se realizara mediante ese cliente
      cliente.emit("lista-usuarios", usuarios);
      // cuando nosotros queremos emitir un evento a todos los demas usuarios EXCEPTO al usuario conectado entonces haremos un broadcast
      //  cliente.broadcast.emit("lista-usuarios", usuarios);
    });
  }

  start() {
    this.httpServer.listen(this.port, () => {
      console.log("Servidor corriendo exitosamente");
    });
  }
}
