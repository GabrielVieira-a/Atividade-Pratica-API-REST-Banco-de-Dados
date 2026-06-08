#  Sistema de Controle de Estoque - API REST

##  Sobre o Projeto

Este projeto consiste em uma API REST desenvolvida em Node.js com Express e Prisma ORM para gerenciamento de estoque.

A aplicação permite realizar o cadastro e gerenciamento de:

- Categorias de produtos
- Fornecedores
- Produtos
- Movimentações de estoque

Além disso, o sistema realiza automaticamente o controle de entrada e saída de produtos, atualizando o estoque disponível e impedindo saídas superiores à quantidade em estoque.

---

#  Tecnologias Utilizadas

- Node.js
- Express.js
- Prisma ORM
- SQLite
- JavaScript
- Postman (testes da API)

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
│   │   ├── categoryController.js
│   │   ├── supplierController.js
│   │   ├── productController.js
│   │   └── stockMovementController.js
│   │
│   ├── routes
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
└── server.js
```

---

#  Instalação

## 1. Clonar o repositório

```bash
git clone https://github.com/GabrielVieira-a/Atividade-Pratica-API-REST-Banco-de-Dados.git
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

```text
.env
```

Conteúdo:

```env
DATABASE_URL="file:./dev.db"
```

## 5. Executar as migrations

```bash
npx prisma migrate dev
```

## 6. Iniciar o servidor

```bash
node server.js
```

Servidor disponível em:

```text
http://localhost:3000
```

---

#  Banco de Dados

O banco foi modelado utilizando Prisma ORM.

## Entidades

### Category

```text
- id
- name
- description
- createdAt
```

### Supplier

```text
- id
- name
- cnpj
- email
- phone
- createdAt
```

### Product

```text
- id
- name
- description
- unity
- currentStock
- minimumStock
- categoryId
- supplierId
- createdAt
```

### StockMovement

```text
- id
- type (IN | OUT)
- quantity
- notes
- productId
- createdAt
```

---

#  Relacionamentos

### Category → Product

Uma categoria pode possuir vários produtos.

```text
Category 1:N Product
```

### Supplier → Product

Um fornecedor pode fornecer vários produtos.

```text
Supplier 1:N Product
```

### Product → StockMovement

Um produto pode possuir várias movimentações.

```text
Product 1:N StockMovement
```

---

#  Endpoints da API

## Categories

### Criar categoria

```http
POST /categories
```

### Listar categorias

```http
GET /categories
```

### Buscar categoria por ID

```http
GET /categories/:id
```

### Atualizar categoria

```http
PUT /categories/:id
```

### Remover categoria

```http
DELETE /categories/:id
```

---

## Suppliers

### Criar fornecedor

```http
POST /suppliers
```

### Listar fornecedores

```http
GET /suppliers
```

### Buscar fornecedor por ID

```http
GET /suppliers/:id
```

### Atualizar fornecedor

```http
PUT /suppliers/:id
```

### Remover fornecedor

```http
DELETE /suppliers/:id
```

---

## Products

### Criar produto

```http
POST /products
```

### Listar produtos

```http
GET /products
```

### Buscar produto por ID

```http
GET /products/:id
```

### Atualizar produto

```http
PUT /products/:id
```

### Remover produto

```http
DELETE /products/:id
```

---

## Stock Movements

### Registrar movimentação

```http
POST /stock-movements
```

### Listar movimentações

```http
GET /stock-movements
```

### Buscar movimentação por ID

```http
GET /stock-movements/:id
```

### Buscar movimentações de um produto

```http
GET /stock-movements/product/:productId
```

---

#  Regras de Negócio

## Entrada de Estoque

Quando uma movimentação do tipo:

```text
IN
```

é registrada, a quantidade é adicionada ao estoque atual do produto.

Exemplo:

```text
Estoque atual: 50
Entrada: +20

Novo estoque: 70
```

---

## Saída de Estoque

Quando uma movimentação do tipo:

```text
OUT
```

é registrada, a quantidade é removida do estoque.

Exemplo:

```text
Estoque atual: 70
Saída: -10

Novo estoque: 60
```

---

## Validação de Estoque

O sistema não permite saída superior ao estoque disponível.

Exemplo:

```text
Estoque atual: 30
Saída solicitada: 50
```

Resposta:

```json
{
  "error": "Insufficient stock."
}
```

---

#  Testes

Todos os endpoints foram testados utilizando o Postman.

Os testes realizados incluem:

- Criação de registros
- Listagem de registros
- Busca por ID
- Atualização de registros
- Exclusão de registros
- Entrada de estoque
- Saída de estoque
- Validação de estoque insuficiente
- Relacionamentos entre entidades

---

#  Autor

**Gabriel Vieira**

Projeto desenvolvido como atividade prática da disciplina de Banco de Dados utilizando Node.js, Express, Prisma ORM e SQLite.
