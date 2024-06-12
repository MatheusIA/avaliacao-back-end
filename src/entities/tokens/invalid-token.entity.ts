import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface InvalidProps {
  token: string;
}

@Entity()
export class InvalidToken {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  token!: string;

  static create(props: InvalidProps): InvalidToken {
    const token = new InvalidToken();
    token.token = props.token;

    return token;
  }
}
