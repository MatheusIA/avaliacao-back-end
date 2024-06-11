import { beforeEach, describe, it, expect } from "vitest";
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";
import { RegisterUserUseCase } from "./register-user";
import { FakeHasher } from "@/test/cryptography/fake-hasher";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { compare, hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let sut: RegisterUserUseCase;

describe("Register User Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    sut = new RegisterUserUseCase(usersRepository, fakeHasher);
  });

  it("should be create a user", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      CPF: "619.181.350-37",
      email: "johndoe@example.com",
      password: "Teste@1234",
      active: true,
    });

    expect(user.id).toEqual(1);
  });

  it("should not be able to register with same CPF twice ", async () => {
    const CPF = "619.181.350-37";

    await sut.execute({
      name: "John Doe",
      CPF,
      email: "johndoe2@example.com",
      password: "Teste@1234",
      active: true,
    });

    await expect(
      sut.execute({
        name: "John Doe",
        CPF,
        email: "johndoe@example.com",
        password: "Teste@1234",
        active: true,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should compare hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      CPF: "619.181.350-37",
      email: "johndoe2@example.com",
      password: "Teste@1234",
      active: true,
    });

    const test = await hash(user.password, 8);

    const isPasswordCorrectlyHashed = await compare(`Teste@1234-hashed`, test);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
