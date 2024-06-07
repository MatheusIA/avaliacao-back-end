export function removeCpfMask(CPF: string): string {
  return CPF.replace(/[^\d]/g, "");
}
