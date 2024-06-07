# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

# Requisitos

## 1.Registro de Usuário

- [X] A API deve ter um endpoint que permita aos usuários se registrarem, fornecendo seu cpf, nome, e-mail e senha.
- [X] Deve haver uma validação para garantir cpf exclusivos e requisitos de senha fortes (por exemplo, comprimento mínimo, caracteres especiais).
- [X] Armazenamento das informações do usuário de forma segura (por exemplo, hash de senha).

## 2.Login de Usuário

- [] A API deve ter um endpoint que permita que os usuários registrados façam login, fornecendo seu cpf ou e-mail e senha.
- [] Deve ser realizada a verificação das credenciais do usuário e a emissão um JWT após o login bem-sucedido.
- [] Deve ser implementado o tratamento de erros para credenciais incorretas.

## 3.Gerenciamento de JWT

- [] A API deve ter um endpoint para validar JWTs.
- [] Deve haver a expiração e renovação de tokens.

## 4.Perfil do Usuário

- [] A API deve ter um endpoint protegido por autenticação para recuperar os detalhes do usuário, retornando as seguintes informações: