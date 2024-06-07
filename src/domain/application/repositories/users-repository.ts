import { User } from "../../enterprise/entities/user";

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;
  abstract findByCPF(CPF: string): Promise<User | null>;
}
