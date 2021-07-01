import express from "express";
import { tareas_router } from "../routes/tareas";

export class Server {
  constructor() {
    this.app = express();
    this.puerto = 8000;
    this.rutas();
  }
  rutas() {
    this.app.get("/", (req, res) => {
      res.status(201).send("Bienvenido a mi API");
    });
    this.app.use(tareas_router);
  }

  start() {
    // el metodo listen sirve para levantar el servidor y dejarlo escuchando alguna peticion
    this.app.listen(this.puerto, () => {
      console.log(
        `Servidor corriendo exitosamente en el puerto ${this.puerto}`
      );
    });
  }
}
