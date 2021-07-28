import request, { SuperTest, Test } from "supertest";
import Server from "./server";

describe("Test", () => {
  let application: SuperTest<Test>;
  beforeAll(() => {
    const server = new Server();

    application = request(server.app);
  });
  it("should be response the server", async () => {
    const response = await application.get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({ success: true });
  });
});
