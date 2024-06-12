import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "@/app.module";

describe("Create User (e2e)", async () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it("[POST] /users", async () => {
    const response = await request(app.getHttpServer()).post("/users").send({
      name: "John Doe",
      CPF: "619.181.350-37",
      email: "johndoe@example.com",
      password: "Teste@1234",
      active: true,
    });

    expect(response.statusCode).toBe(201);
  });
});
