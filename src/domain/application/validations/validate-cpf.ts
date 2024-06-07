import { BadRequestException } from "@nestjs/common";
import { removeCpfMask } from "./remove-cpf-mask";

export function ValidateCPF(CPF: string): void {
  CPF = removeCpfMask(CPF);

  if (
    CPF.length !== 11 ||
    CPF === "00000000000" ||
    CPF === "11111111111" ||
    CPF === "22222222222" ||
    CPF === "33333333333" ||
    CPF === "44444444444" ||
    CPF === "55555555555" ||
    CPF === "66666666666" ||
    CPF === "77777777777" ||
    CPF === "88888888888" ||
    CPF === "99999999999"
  ) {
    throw new BadRequestException("Invalid CPF");
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(CPF.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(CPF.substring(9, 10))) {
    throw new BadRequestException("Invalid CPF");
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(CPF.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(CPF.substring(10, 11))) {
    throw new BadRequestException("Invalid CPF");
  }
}
