import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsBoolean, IsNumber } from "class-validator";

export class FetchUserDto {
  @ApiProperty()
  @IsNumber()
  id: number;

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
    this.id = 0;
    this.name = "";
    this.email = "";
    this.password = "";
    this.CPF = "";
    this.active = false;
  }
}
