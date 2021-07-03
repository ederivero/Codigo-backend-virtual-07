import express from "express";
import { json } from "body-parser";
import { conexion } from "./sequelize";
import { tareas_router } from "../routes/tareas";

export class Server {
  constructor() {
    this.app = express();
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR
    // valida si existe o es verdadero el contenido de la izquierda, si lo es entonces el valor de la variable sera ese contenido, sino sera el proximo
    this.port = process.env.PORT || 8000;
    this.bodyParser();
    this.rutas();
  }
  bodyParser() {
    this.app.use(json());
  }

  rutas() {
    this.app.get("/", (req, res) => {
      res.send("bienvenido a mi API");
    });
    this.app.use(tareas_router);
  }

  start() {
    this.app.listen(this.port, async () => {
      console.log(`Servidor corriendo exitosamente en el puerto ${this.port}`);
      // el metodo sync sirve para sincronizar todos los modelos registrados con las tablas en la bd
      // alter => si hubo algun cambio en la bd en alguna tabla volver a generar SOLAMENTE esos cambios
      // force => eliminara todas las tablas (DROP) y las volvera a crear de nuevo
      try {
        await conexion.sync();
        console.log("Base de datos sincronizada correctamente");
      } catch (error) {
        console.error(error);
      }
    });
  }
}
