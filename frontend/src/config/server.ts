import express from "express";
import { Express, json, Request, Response } from "express";
import conexion from "./sequelize";
import { createServer, Server as HTTPServer } from "http";
import { Server as SocketIO } from "socket.io";
import {
  cerrarSesion,
  crearMensaje,
  iniciarSesion,
} from "../controllers/socket";
import { usuarioRouter } from "../routes/usuario";
import { Logger } from "tslog";
import { Cuarto, Mensaje, Usuario } from "./models";

export default class Server {
  app: Express;
  port: string | number;
  io: SocketIO;
  httpServer: HTTPServer;
  private static instance: Server;

  constructor(private readonly log: Logger = new Logger({ name: "Server" })) {
    this.app = express();
    this.port = process.env.PORT || 8000;
    this.httpServer = createServer(this.app);
    this.io = new SocketIO(this.httpServer, { cors: { origin: "*" } });
    this.bodyParser();
    this.CORS();
    this.rutas();
    this.escucharSockets();
    if (typeof Server.instance === "object") {
      // console.log("ya habia una instancia creada");
      return Server.instance;
    } else {
      // console.log("no habia");
      Server.instance = this;
      return this;
    }
  }

  bodyParser(): void {
    this.app.use(json());
  }

  CORS(): void {
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");

      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

      res.header("Access-Control-Allow-Methods", "GET, POST, PUT");

      next();
    });
  }

  escucharSockets(): void {
    // console.log("escuchando socket");
    this.io.on("connect", (cliente) => {
      this.log.info("Se conectó " + cliente.id);

      cliente.on("cuarto", async ({ cuarto }) => {
        cliente.rooms.forEach((room) => {
          cliente.leave(room);
        });

        cliente.join(cuarto);

        const cuartoEncontrado = await Cuarto.findOne({
          where: { cuartoNombre: cuarto },
        });

        const mensajes = await Mensaje.findAll({
          where: { cuartoId: cuartoEncontrado?.getDataValue("cuartoId") },
          include: {
            model: Usuario,
            attributes: { exclude: ["usuarioPassword", "usuarioId"] },
          },
        });

        cliente.to(cuarto).emit("emitir-mensajes", { mensajes });

        this.io.to(cuarto).emit(`Se conecto el cliente ${cliente.id}`);
      });

      cliente.on("login", (usuario) => {
        iniciarSesion(usuario);
      });
      cliente.on("logout", (usuario) => {
        cerrarSesion(usuario);
      });
      // cliente.on("crear-room", (room) => {
      //   crearRoom(room);
      // });
      cliente.on("crear-mensaje", (mensaje) => {
        crearMensaje(mensaje, cliente.rooms);
      });
      cliente.on("disconnect", () => {
        this.log.info("Se desconectó " + cliente.id);
      });
    });
  }

  rutas(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({
        success: true,
      });
    });
    this.app.use("/api", usuarioRouter);
  }

  async seed(): Promise<void> {
    await Promise.all([
      Cuarto.upsert({
        cuartoNombre: "Cuarto 1",
      }),
      Cuarto.upsert({
        cuartoNombre: "Cuarto 2",
      }),
      Cuarto.upsert({
        cuartoNombre: "Cuarto 3",
      }),
      Cuarto.upsert({
        cuartoNombre: "Cuarto 4",
      }),
      Cuarto.upsert({
        cuartoNombre: "Cuarto 5",
      }),
    ]);
    this.log.info("Database seeded 🌱");
  }

  start(): void {
    this.httpServer.listen(this.port, async () => {
      this.log.info("Servidor corriendo exitosamente 🚀");
      try {
        await conexion.sync();
        this.log.info("Base de datos sincronizada exitosamente");
        // await this.seed();
      } catch (e) {
        this.log.error(e);
      }
    });
  }
}
