import request, { SuperTest, Test } from "supertest";
import Server from "../config/server";
import * as faker from "faker";
import conexion from "../config/sequelize";

describe("UserController", () => {
  let application: SuperTest<Test>;
  let server: Server;
  beforeAll(async () => {
    server = new Server();
    application = request(server.app);
    await conexion.createSchema(String(process.env.SCHEMA), {});
    await conexion.sync({ schema: "test" });
  });
  describe("Register", () => {
    it("should be register an user", async () => {
      const response = await application.post("/api/registro").send({
        usuarioCorreo: faker.internet.email(),
        usuarioPassword: "123",
        usuarioNombre: faker.name.findName(),
      });

      expect(response.statusCode).toBe(201);
      expect(response.body).toMatchObject({ success: true });
    });
  });

  afterAll(async () => {
    await conexion.dropSchema(String(process.env.SCHEMA), {});
    await conexion.close();
  });
});
