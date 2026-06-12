#  API REST DE ALMOXARIFADO - BANCO DE DADOS - JWT - BCRYPT

![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue)
![SQLite](https://img.shields.io/badge/SQLite-Database-lightgrey)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/Status-Acadêmico-success)

##  Sobre o Projeto

Este projeto consiste em uma API REST desenvolvida com **Node.js**, **Express**, **Prisma ORM** e **SQLite**, com o objetivo de realizar o gerenciamento de estoque de uma empresa.

A aplicação permite:

- Gerenciar categorias de produtos
- Gerenciar fornecedores
- Gerenciar produtos
- Registrar movimentações de estoque
- Controlar entradas e saídas automaticamente
- Autenticar usuários utilizando JWT
- Proteger rotas privadas
- Garantir a integridade do estoque

---

#  Objetivos

Implementar uma API REST completa aplicando os conceitos de:

- Arquitetura em camadas
- Banco de Dados Relacional
- ORM (Prisma)
- CRUD Completo
- Relacionamentos entre entidades
- Regras de negócio
- Autenticação e autorização
- Segurança com JWT e BCrypt

---

#  Tecnologias Utilizadas

| Tecnologia | Função |
|------------|---------|
| Node.js | Ambiente de execução |
| Express.js | Framework web |
| Prisma ORM | Acesso ao banco de dados |
| SQLite | Banco de dados |
| JWT | Autenticação |
| BCrypt | Criptografia de senhas |
| Postman | Testes da API |
| JavaScript | Linguagem de programação |

---

#  Estrutura do Projeto

```text
ATIVIDADE-PRATICA-API-REST-BANCO-DE-DADOS
│
├── prisma
│   ├── migrations
│   ├── schema.prisma
│   └── dev.db
│
├── src
│   ├── controllers
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── supplierController.js
│   │   ├── productController.js
│   │   └── stockMovementController.js
│   │
│   ├── middlewares
│   │   └── authenticate.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── supplierRoutes.js
│   │   ├── productRoutes.js
│   │   └── stockMovementRoutes.js
│   │
│   ├── app.js
│   └── prisma.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

#  Instalação

## 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

## 2. Entrar na pasta

```bash
cd Atividade-Pratica-API-REST-Banco-de-Dados
```

## 3. Instalar dependências

```bash
npm install
```

## 4. Criar arquivo .env

Crie um arquivo chamado:

```env
.env
```

Utilize como base:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave_secreta"
```

---

## 5. Executar as migrations

```bash
npx prisma migrate dev
```

---

## 6. Iniciar a aplicação

```bash
node server.js
```

Servidor disponível em:

```text
http://localhost:3000
```

---

#  Modelagem do Banco de Dados

## User

```text
id
email
password
createdAt
```

---

## Category

```text
id
name
description
createdAt
```

---

## Supplier

```text
id
name
cnpj
email
phone
createdAt
```

---

## Product

```text
id
name
description
unity
currentStock
minimumStock
categoryId
supplierId
createdAt
```

---

## StockMovement

```text
id
type
quantity
notes
productId
createdAt
```

---

#  Relacionamentos

### Category → Product

```text
1 Categoria possui N Produtos
```

---

### Supplier → Product

```text
1 Fornecedor possui N Produtos
```

---

### Product → StockMovement

```text
1 Produto possui N Movimentações
```

---

#  Autenticação JWT

A API utiliza autenticação baseada em JSON Web Token.

Após realizar o login, um token JWT é retornado e deve ser enviado no cabeçalho das requisições protegidas.

Exemplo:

```http
Authorization: Bearer SEU_TOKEN
```

---

#  Cadastro de Usuário

## Registrar usuário

```http
POST /auth/register
```

Body:

```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

---

#  Login

```http
POST /auth/login
```

Body:

```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "token": "JWT_TOKEN"
}
```

---

#  Endpoints da API

## Categories

| Método | Endpoint |
|----------|----------|
| POST | /categories |
| GET | /categories |
| GET | /categories/:id |
| PUT | /categories/:id |
| DELETE | /categories/:id |

---

## Suppliers

| Método | Endpoint |
|----------|----------|
| POST | /suppliers |
| GET | /suppliers |
| GET | /suppliers/:id |
| PUT | /suppliers/:id |
| DELETE | /suppliers/:id |

---

## Products

| Método | Endpoint |
|----------|----------|
| POST | /products |
| GET | /products |
| GET | /products/:id |
| PUT | /products/:id |
| DELETE | /products/:id |

---

## Stock Movements

| Método | Endpoint |
|----------|----------|
| POST | /stock-movements |
| GET | /stock-movements |
| GET | /stock-movements/:id |
| GET | /stock-movements/product/:productId |

---

#  Regras de Negócio

## Entrada de Estoque

Movimentações do tipo:

```text
IN
```

aumentam automaticamente a quantidade disponível do produto.

Exemplo:

```text
Estoque Atual: 50

Entrada: +20

Novo Estoque: 70
```

---

## Saída de Estoque

Movimentações do tipo:

```text
OUT
```

reduzem automaticamente a quantidade disponível.

Exemplo:

```text
Estoque Atual: 70

Saída: -10

Novo Estoque: 60
```

---

## Validação de Estoque

O sistema impede saídas superiores ao estoque disponível.

Exemplo:

```text
Estoque Atual: 30

Saída Solicitada: 50
```

Resposta:

```json
{
  "error": "Insufficient stock."
}
```

---

#  Testes Realizados

Todos os endpoints foram testados utilizando o Postman.

### Testes executados

✅ Cadastro de usuário

✅ Login

✅ Geração de JWT

✅ Proteção de rotas

✅ CRUD de categorias

✅ CRUD de fornecedores

✅ CRUD de produtos

✅ Entrada de estoque

✅ Saída de estoque

✅ Validação de estoque insuficiente

✅ Consulta de movimentações

✅ Relacionamentos entre entidades

---

#  Segurança

O projeto implementa:

- Senhas criptografadas com BCrypt
- Autenticação JWT
- Middleware de proteção de rotas
- Validação de credenciais
- Controle de acesso a endpoints privados

---

#  Autor

**Gabriel Vieira Aranha**

Projeto desenvolvido para a disciplina de Banco de Dados utilizando Node.js, Express, Prisma ORM, SQLite e autenticação JWT.

---

#  Licença

Projeto desenvolvido exclusivamente para fins acadêmicos.
