import { UsersRepository } from "@/domain/application/repositories/users-repository";
import { User } from "@/entities/user/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TypeORMUsersRepository implements UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly ormRepository: Repository<User>,
  ) {}

  async create(user: User) {
    return await this.ormRepository.save(user);
  }

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

  async findByEmail(email: string) {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return user;
    }

    return null;
  }

  async findById(id: number) {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async updateUser(data: User) {
    try {
      await this.ormRepository.update(data.id, data);

      return data;
    } catch (err) {
      console.log("Erro ao atualizar os dados do usuário: ", err);
      return null;
    }
  }
}
