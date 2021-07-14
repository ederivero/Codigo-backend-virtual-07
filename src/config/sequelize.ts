import { Sequelize, Options } from "sequelize";
require("dotenv").config();

const opciones: Options = {
  dialectOptions:
    process.env.NODE_ENV !== "production"
      ? {}
      : {
          ssl: {
            rejectUnauthorized: false,
          },
        },
  timezone: "-05:00",
  // sirve para indicar si queremos o no queremos ver la query en la consola
  logging: false,
};

export default new Sequelize(String(process.env.DATABASE_URL), opciones);
