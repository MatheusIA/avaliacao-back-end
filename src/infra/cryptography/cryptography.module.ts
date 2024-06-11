import { Module } from "@nestjs/common";
import { BcryptHasher } from "./bcrypt-hasher";
import { HashGenerator } from "@/domain/application/cryptography/hash-generator";
import { Encrypter } from "@/domain/application/cryptography/encrypter";
import { HashComparer } from "@/domain/application/cryptography/hash-comparer";
import { JwtEncrypet } from "./jwt-encrypter";
import { RefreshTokenService } from "./refresh-token.service";

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypet },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
    RefreshTokenService,
  ],
  exports: [Encrypter, HashComparer, HashGenerator, RefreshTokenService],
})
export class CryptographyModule {}
