// import { json } from "body-parser";
import express from "express";
import { json, Express, Request, Response, NextFunction } from "express";
import { connect } from "mongoose";
import { imagenRouter } from "../imagen/imagen.routes";
import { productoRouter } from "../producto/producto.routes";
import { usuarioRouter } from "../usuario/usuario.routes";
import { movimientoRouter } from "../movimiento/movimiento.routes";
require("dotenv").config();

export default class Server {
  app: Express;
  port: Number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 8000;
    this.bodyParser();
    this.CORS();
    this.rutas();
  }

  bodyParser() {
    this.app.use(json());
  }

  rutas() {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({
        success: true,
      });
    });
    // console.log(__dirname.search("src"));
    // console.log(__dirname.slice(0, 78));
    const ubicacionProyecto = __dirname.slice(0, __dirname.search("src"));
    this.app.use("/assets", express.static(ubicacionProyecto + "/media"));
    this.app.use(
      "/api",
      productoRouter,
      usuarioRouter,
      imagenRouter,
      movimientoRouter
    );
  }

  CORS() {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH"
      );
      next();
    });
  }

  start() {
    this.app.listen(this.port, async () => {
      console.log("Servidor corriendo exitosamente 🚀");
      try {
        await connect(String(process.env.MONGO_URL), {
          useNewUrlParser: true, // usar el nuevo parseador de la URI
          useUnifiedTopology: true, // usar el nuevo Current Server Discovery
          serverSelectionTimeoutMS: 5000, // modificar el tiempo de espera de conexion al servidor de bd
          useFindAndModify: false, // cuando queremos usar findOneAndUpdate o findOneAndDelete tenemos que indicar esta opcion ya que proximamente sera deprecado
          useCreateIndex: true,
        });

        console.log("Base de datos sincronizada correctamente ✨");
      } catch (error) {
        console.log("Error al conectarse a la bd", error);
      }
    });
  }
}
