import { UsersRepository } from "@/domain/application/repositories/users-repository";
import { User } from "@/entities/user/user.entity";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(user: User) {
    user.id = this.items.length + 1;
    this.items.push(user);

    return user;
  }

  async findByCPF(CPF: string) {
    const user = this.items.find((item) => item.CPF === CPF);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((user) => user.email === email) || null;
  }

  async findById(id: number): Promise<User | null> {
    return this.items.find((user) => user.id === id) || null;
  }

  async findAll(): Promise<User[] | null> {
    return this.items;
  }

  async updateUser(data: User): Promise<User | null> {
    const index = this.items.findIndex((user) => user.id === data.id);

    if (index !== -1) {
      this.items[index] = data;
      return data;
    }

    return null;
  }
}
