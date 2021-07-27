import express, { Request, Response } from "express";
import { Express } from "express";
import { Server as SocketIO } from "socket.io";
import { createServer, Server as HTTPServer } from "http";
interface IRegistro {
  username: string;
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
    this.io.on("connect", (cliente) => {
      console.log(`Se conecto el cliente! ${cliente.id}`);

      cliente.on("registrar", (objCliente: IRegistro) => {
        console.log(objCliente);
      });
    });
  }

  start() {
    this.httpServer.listen(this.port, () => {
      console.log("Servidor corriendo exitosamente");
    });
  }
}
