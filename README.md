## Pré Requisitos

Verifique se você tem instalado em sua máquina:

- Node.js (versão 20.11.0 ou superior)
- npm (geralmente vem junto com o Node.js)
- Docker

## Instalação

git clone https://github.com/MatheusIA/avaliacao-back-end.git
cd seu-repositorio
npm install para baixar todas as dependencias necessárias

## Variaveis de Ambiente

Crie um arquivo .env na raiz do seu projeto com as seguintes variaveis:

NODE_ENV=test
DATABASE_CLIENT=pg

# URL para acesso ao PostgreSQL
DATABASE_URL="postgres://postgres:docker@localhost:5432/avaliable-nest"

# URL para acesso ao MongoDB
MONGOSE_URL="mongodb+srv://userroot:ibt3rH8aiugLMBdC@ac-o7piu9e.ksgmxxl.mongodb.net/mydatabase?retryWrites=true&w=majority"

## Execução

# Inicialização do Docker

Para ser possivel iniciar o docker, é necessário rodar o comando: *'docker-compose up'* em seu terminal.
Para verificar, os containers inicializados, utilize o comando: *'docker-ps'*

*Após o inicio com sucesso do docker*

Para executar o arquivo localmente: *'npm run start:prod', ou 'npm run start:dev para o modo watch*

Com isso, o serviço estará disponivel em "http://localhost:3333"

*Executando testes unitários*

npm run test

## Documentação

Ao rodar o comando para executar o arquivo localmente, a documentação referente a API, estará disponivel em: http://localhost:3333/api

## Implantação do serviço em nuvem, através da plataforma Render

# Banco de Dados PostgreSQL

Acesse o link: *https://dashboard.render.com/*

Nos métodos de acesso, escolha algumas das opções disponiveis (aconselho acessar através do github)

![alt text](image.png)

Após a criação da conta, clique na opção *New*.

![alt text](image-1.png)

Após isso, selecione a opção *PostgreSQL*

![alt text](image-2.png)

Preencha as informações necessárias, como:

Name, Database, User

*Atenção para selecionar a melhor Região disponivel, para diminuir a latencia, e também o Instace Type como Free*

![alt text](image-3.png)

*Como o serviço é gratuito, o banco de dados ficara ativo durante apenas 30 dias.*

Após a criação bem sucedida, o banco ficará disponivel na aba *Dashboard*

Na opção *Info*, você terá acesso as configurações de acesso ao seu banco de dados:

Hostname;
Port;
Database;
Username;
Password;
*Internal Database URL*
*External Database URL (Utilizada para acessar o banco de dados, através da sua API e também através da sua maquina, caso ache necessário)*

# API

Clicando na opção *New* novamente, selecione a opção *Web Service*

![alt text](image-4.png)

Caso tenha criado sua conta ao Render, com a opção GitHub, você verá os seus repositórios *Publicos*, disponiveis para serem utilizados.

Caso tenha criado sua conta ao Render, com a opção Google, você poderá clonar o repositório do seu projeto, através da opção *Public Git Repositóry*

![alt text](image-5.png)

Após isso, você ira dar um nome para o seu 'Web Service'.

Na opção *Region*, selecione a *mesma região*, que foi selecionado na criação do seu banco de dados, para não ter problema de latencia.

Na opção *Build Command*, coloque o *comando necessário*, para realizar o build da sua aplicação

Na opção *Start Command*, coloque o *comando necessário*, para realizar dar o start na sua aplicação.

Caso queira que o Render faça o *Deploy* da sua aplicação automaticamente, deixe a opção *Auto-Deploy* marcada como *Yes*. Dessa forma, toda vez que o repositório
mapeado tiver um novo *push*, o Render atualizará sua aplicação de forma automatica.

![alt text](image-6.png)

Após isso, na seção *Environment Variables*, adicione as variaveis ambientes presentes em seu projeto.

*Importante* Para conectar seu *Web Service* ao banco PostgreSQL criado anteriormente, você deve colocar em suas variaves ambiente a URL *External Database URL*,
que foi gerada automaticamente na criação do seu banco PostgreSQL.

![alt text](image-7.png)

Após a criação, através da opção *Logs*, você consegue acompanhar o processo de deploy da sua aplicação.

![alt text](image-8.png)

