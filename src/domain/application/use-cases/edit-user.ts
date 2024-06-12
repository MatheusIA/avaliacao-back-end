import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositories/users-repository";
import { HashGenerator } from "../cryptography/hash-generator";
import { ValidateCPF } from "../validations/validate-cpf";
import { removeCpfMask } from "../validations/remove-cpf-mask";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { passwordValidation } from "../validations/password-validation";
import { UserNotFoundError } from "./errors/user-not-found-error";
import { User } from "@/entities/user/user.entity";
import { LogsService } from "@/logs/schemas/logs.service";

interface EditUserUseCaseRequest {
  id: string;
  name: string;
  email: string;
  CPF: string;
  password: string;
}

interface EditUserUseCaseResponse {
  user: User;
}

@Injectable()
export class EditUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
    private logsService: LogsService,
  ) {}

  async execute({
    id,
    name,
    email,
    CPF,
    password,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.usersRepository.findById(parseInt(id, 10));

    if (!user) {
      await this.logsService.createLog({
        message: `User not found`,
        timestamp: new Date(),
        level: "error",
        context: "EditUserUseCase",
      });
      throw new UserNotFoundError();
    }

    ValidateCPF(CPF);

    const cleanCPF = removeCpfMask(CPF);

    const userWithSameCPF = await this.usersRepository.findByCPF(cleanCPF);

    if (userWithSameCPF && userWithSameCPF.id !== parseInt(id, 10)) {
      await this.logsService.createLog({
        message: `User with CPF ${cleanCPF} already exists.`,
        timestamp: new Date(),
        level: "error",
        context: "EditUserUseCase",
      });
      throw new UserAlreadyExistsError();
    }

    passwordValidation(password);

    const hashedPassword = await this.hashGenerator.hash(password);

    user.name = name;
    user.CPF = cleanCPF;
    user.email = email;
    user.password = hashedPassword;

    await this.usersRepository.updateUser(user);

    await this.logsService.createLog({
      message: `User updated successfully`,
      timestamp: new Date(),
      level: "info",
      context: "EditUserUseCase",
    });

    return {
      user,
    };
  }
}
