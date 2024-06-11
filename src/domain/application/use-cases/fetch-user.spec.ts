import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";
import { FetchUserUseCase } from "./fetch-user";
import { UserNotFoundError } from "./errors/user-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: FetchUserUseCase;

describe("Get User Use Case", async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new FetchUserUseCase(usersRepository);
  });

  it("should be able to fetch user", async () => {
    const result = await usersRepository.create({
      id: 1,
      name: "John Doe",
      CPF: "619.181.350-37",
      email: "johndoe2@example.com",
      password: "Teste@1234",
      active: true,
    });

    const { user } = await sut.execute({
      id: result.id.toString(),
    });

    expect(user.id).toEqual(1);
    expect(user.name).toEqual("John Doe");
  });

  it("should be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        id: "1",
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });
});
