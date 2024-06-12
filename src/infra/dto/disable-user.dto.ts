import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsNumber } from "class-validator";

export class DisabeUserDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsBoolean()
  active: boolean;

  constructor() {
    this.id = 1;
    this.token = "";
    this.active = false;
  }
}
