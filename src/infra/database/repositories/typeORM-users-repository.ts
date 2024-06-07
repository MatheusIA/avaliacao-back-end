import { UsersRepository } from "@/domain/application/repositories/users-repository";
import { User } from "@/domain/enterprise/entities/user";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TypeORMUsersRepository implements UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly ormRepository: Repository<User>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(user: User): Promise<void> {
    await this.ormRepository.save(user);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findByCPF(CPF: string) {
    const findCPF = await this.ormRepository.find({
      where: {
        CPF,
      },
    });

    if (findCPF.length > 0) {
      return findCPF[0];
    }

    return null;
  }
}
