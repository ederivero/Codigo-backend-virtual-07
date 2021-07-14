import { Sequelize, Options } from "sequelize";
require("dotenv").config();

const opciones: Options = {
  dialect: "postgres",
  dialectOptions: {
    ssl: true,
  },
  timezone: "-05:00",
  // sirve para indicar si queremos o no queremos ver la query en la consola
  logging: false,
  ssl: true,
};

export default new Sequelize(String(process.env.DATABASE_URL), opciones);
