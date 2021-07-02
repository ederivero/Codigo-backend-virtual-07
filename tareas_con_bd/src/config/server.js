import express from "express";
import { json } from "body-parser";

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
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo exitosamente en el puerto ${this.port}`);
    });
  }
}
