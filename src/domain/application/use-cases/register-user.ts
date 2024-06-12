import { Injectable } from "@nestjs/common";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { UsersRepository } from "../repositories/users-repository";
import { HashGenerator } from "../cryptography/hash-generator";
import { ValidateCPF } from "../validations/validate-cpf";
import { passwordValidation } from "../validations/password-validation";
import { removeCpfMask } from "../validations/remove-cpf-mask";
import { User } from "@/entities/user/user.entity";
import { UserEmailInvalidError } from "./errors/user-email-invalid-error";
import { LogsService } from "@/logs/schemas/logs.service";

interface RegisterUserUseCaseRequest {
  name: string;
  CPF: string;
  email: string;
  password: string;
  active: boolean;
}

interface RegisterUserUseCaseResponse {
  user: User;
}

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
    private logsService: LogsService,
  ) {}

  async execute({
    name,
    email,
    password,
    CPF,
    active,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    ValidateCPF(CPF);

    const cleanCPF = removeCpfMask(CPF);

    const userWithSameCPF = await this.usersRepository.findByCPF(cleanCPF);

    if (userWithSameCPF !== null) {
      await this.logsService.createLog({
        message: `User with CPF ${cleanCPF} already exists.`,
        timestamp: new Date(),
        level: "error",
        context: "RegisterUserUseCase",
      });
      throw new UserAlreadyExistsError();
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail !== null) {
      await this.logsService.createLog({
        message: `User with email ${email} already exists.`,
        timestamp: new Date(),
        level: "error",
        context: "RegisterUserUseCase",
      });
      throw new UserEmailInvalidError();
    }

    passwordValidation(password);

    const hashedPassword = await this.hashGenerator.hash(password);

    const user = User.create({
      name,
      email,
      password: hashedPassword,
      CPF: cleanCPF,
      active,
    });

    await this.usersRepository.create(user);

    await this.logsService.createLog({
      message: `User created successfully with email: ${email}`,
      timestamp: new Date(),
      level: "info",
      context: "RegisterUserUseCase",
    });

    return {
      user,
    };
  }
}
