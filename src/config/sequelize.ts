import { Sequelize, Options } from "sequelize";
require("dotenv").config();

const opciones: Options = {
  dialect: "postgres",
  timezone: "-05:00",
  logging: false,
};

export default new Sequelize(String(process.env.DATABASE_URL), opciones);
