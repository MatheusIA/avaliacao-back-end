import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsBoolean } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  CPF: string;

  @ApiProperty()
  @IsBoolean()
  active: boolean;

  constructor() {
    this.name = "";
    this.email = "";
    this.password = "";
    this.CPF = "";
    this.active = false;
  }
}
