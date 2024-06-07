import { Entity } from "../../../core/entities/entity";

export interface UserProps {
  name: string;
  CPF: string;
  email: string;
  password: string;
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get CPF() {
    return this.props.CPF;
  }

  get password() {
    return this.props.password;
  }

  static create(props: UserProps) {
    const user = new User(props);

    return user;
  }
}
