import { Injectable } from "@nestjs/common";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { UsersRepository } from "../repositories/users-repository";
import { HashGenerator } from "../cryptography/hash-generator";
import { ValidateCPF } from "../validations/validate-cpf";
import { passwordValidation } from "../validations/password-validation";
import { removeCpfMask } from "../validations/remove-cpf-mask";
import { User } from "@/entities/user/user.entity";

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
      throw new UserAlreadyExistsError();
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

    return {
      user,
    };
  }
}
