import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";
import { EditUserUseCase } from "./edit-user";
import { FakeHasher } from "@/test/cryptography/fake-hasher";
import { hash } from "bcryptjs";
import { LogsService } from "@/logs/schemas/logs.service";

let usersRepository: InMemoryUsersRepository;
let logsService: LogsService;
let fakeHasher: FakeHasher;
let sut: EditUserUseCase;

describe("Edit user profile Use Case", async () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    sut = new EditUserUseCase(usersRepository, fakeHasher, logsService);
  });

  it("should be able to edit profile user", async () => {
    const userCreated = await usersRepository.create({
      id: 1,
      name: "John Doe",
      CPF: "619.181.350-37",
      email: "johndoe@example.com",
      password: "Teste@1234",
      active: true,
    });

    const { user } = await sut.execute({
      id: userCreated.id.toString(),
      name: "John Doe Update",
      CPF: "619.181.350-37",
      email: "johndoe@exampleUpdate.com",
      password: await hash("Teste@1234", 8),
    });

    console.log(user);

    expect(user.id).toEqual(1);
    expect(user.name).toEqual("John Doe Update");
  });
});
