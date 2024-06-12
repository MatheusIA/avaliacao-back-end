import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "@/app.module";

describe("Create User (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close(); // Fechar a aplicação após cada teste
  });

  it("[POST] /users/create", async () => {
    const response = await request(app.getHttpServer())
      .post("/users/create")
      .send({
        name: "John Doe",
        CPF: "619.181.350-37",
        email: "johndoe@example.com",
        password: "Teste@1234",
        active: true,
      });

    expect(response.statusCode).toBe(201);
  });
});
