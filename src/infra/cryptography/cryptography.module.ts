import { Module } from "@nestjs/common";
import { BcryptHasher } from "./bcrypt-hasher";
import { HashGenerator } from "@/domain/application/cryptography/hash-generator";

@Module({
  providers: [{ provide: HashGenerator, useClass: BcryptHasher }],
  exports: [HashGenerator],
})
export class CryptographyModule {}
