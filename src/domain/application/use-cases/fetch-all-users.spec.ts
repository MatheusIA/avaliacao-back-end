import { LogsService } from "@/logs/schemas/logs.service";
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";
import { FetchAllUserUseCase } from "./fetch-all-users";

let usersRepository: InMemoryUsersRepository;
let logsServerice: LogsService;
let sut: FetchAllUserUseCase;

describe("Fetch All Users", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new FetchAllUserUseCase(usersRepository, logsServerice);
  });

  it("should be able to fetch all users", async () => {
    await usersRepository.create({
      id: 1,
      name: "John Doe",
      CPF: "619.181.350-37",
      email: "johndoe1@example.com",
      password: "Teste@1234",
      active: true,
    });

    await usersRepository.create({
      id: 1,
      name: "John Doe",
      CPF: "343.652.480-81",
      email: "johndoe2@example.com",
      password: "Teste@1234",
      active: true,
    });

    const { users } = await sut.execute();

    expect(users.length).toBe(2);
    expect(users[0].email).toBe("johndoe1@example.com");
    expect(users[1].email).toBe("johndoe2@example.com");
  });
});
