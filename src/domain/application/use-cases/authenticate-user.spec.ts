import { beforeEach, describe, it, expect, vi } from "vitest";
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";
import { AuthenticateUserUseCase } from "./authenticate-user";
import { FakeHasher } from "@/test/cryptography/fake-hasher";
import { FakeEncrypter } from "@/test/cryptography/fake-encrypter";
import { RefreshTokenService } from "@/infra/cryptography/refresh-token.service";
import { JwtService } from "@nestjs/jwt";
import { LogsService } from "@/logs/schemas/logs.service";

let usersRepository: InMemoryUsersRepository;
let logsService: LogsService;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let refreshToken: RefreshTokenService;
let jwtService: JwtService;
let sut: AuthenticateUserUseCase;

describe("Authenticate Use Case", async () => {
  beforeEach(() => {
    jwtService = {
      signAsync: vi.fn().mockResolvedValue("fake-jwt-token"),
    } as unknown as JwtService;

    usersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();
    refreshToken = new RefreshTokenService(jwtService);
    sut = new AuthenticateUserUseCase(
      usersRepository,
      fakeHasher,
      fakeEncrypter,
      refreshToken,
      logsService,
    );
  });

  it("shoudl be able to authenticate a user", async () => {
    const plainPassword = "Teste@1234";
    const passwordHash = await new FakeHasher().hash(plainPassword);

    await usersRepository.create({
      id: 1,
      name: "John Doe",
      CPF: "619.181.350-37",
      email: "johndoe@example.com",
      password: passwordHash,
      active: true,
    });

    const { accessToken, refreshToken } = await sut.execute({
      email: "johndoe@example.com",
      password: plainPassword,
    });

    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();
  });
});
