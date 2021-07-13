import express, { Request, Response, Express } from "express";
import morgan from "morgan";
import { json } from "body-parser";
import { tipoRouter } from "../routes/tipo";
import { accionRouter } from "../routes/accion";
import { usuarioRouter } from "../routes/usuario";
import conexion from "./sequelize";
import { productoRouter } from "../routes/producto";
import { imagenRouter } from "../routes/imagen";
import { movimientoRouter } from "../routes/movimiento";

export default class Server {
  app: Express;
  port: string = "";

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";
    this.bodyParser();
    this.rutas();
  }

  bodyParser() {
    this.app.use(json());
    this.app.use(morgan("dev"));
  }

  rutas() {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Bienvenido a la api de zapateria");
    });
    this.app.use(tipoRouter);
    this.app.use(accionRouter);
    this.app.use(usuarioRouter);
    this.app.use(productoRouter);
    this.app.use(imagenRouter);
    this.app.use(movimientoRouter);
  }

  start() {
    this.app.listen(this.port, async () => {
      console.log("Servidor corriendo exitosamente");
      try {
        // el alter a diferencia del force lo que realizara sera que si una columna o varias es modificada y si es que tiene informacion es aceptable en la nueva variacion o si es que no tuviese informacion para casos de eliminacion de columnas
        // { alter: true }
        await conexion.sync();
        console.log("Base de datos sincronizada exitosamente");
      } catch (e) {
        console.error(e);
      }
    });
  }
}
