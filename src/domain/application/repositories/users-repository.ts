import { User } from "@/entities/user/user.entity";

export abstract class UsersRepository {
  abstract create(user: User): Promise<User | null>;
  abstract findByCPF(CPF: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: number): Promise<User | null>;
  abstract findAll(): Promise<User[] | null>;
  abstract updateUser(data: User): Promise<User | null>;
}
