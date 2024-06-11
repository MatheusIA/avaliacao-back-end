import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface UserProps {
  name: string;
  email: string;
  CPF: string;
  password: string;
  active: boolean;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  CPF!: string;

  @Column({ default: true })
  active!: boolean;

  static create(props: UserProps): User {
    const user = new User();
    user.name = props.name;
    user.email = props.email;
    user.password = props.password;
    user.CPF = props.CPF;
    user.active = props.active;

    return user;
  }
}
