# api-autenticacao

API REST de autenticação e tarefas, construída com Node.js, Express, SQLite e JWT.

## Requisitos

- Node.js `22.13` ou superior

## Como usar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie o arquivo `.env` a partir do exemplo e defina um segredo para os tokens:

   ```bash
   cp .env.example .env
   ```

   Depois, ajuste o valor de `JWT_SECRET` no arquivo `.env`.

3. Inicie a API:

   ```bash
   npm start
   ```

   Por padrão, ela ficará disponível em `http://localhost:3000`.

O banco SQLite é criado automaticamente em `data/banco.db` na primeira execução.

## Endpoints

### Cadastrar usuário

```bash
curl -X POST http://localhost:3000/usuarios \
  -H 'Content-Type: application/json' \
  -d '{"nome":"Maria Silva","email":"maria@example.com","senha":"senha-segura"}'
```

### Fazer login

```bash
curl -X POST http://localhost:3000/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"maria@example.com","senha":"senha-segura"}'
```

O login retorna um JWT. Use o valor de `token` nas rotas protegidas.

### Listar tarefas

```bash
curl http://localhost:3000/tarefas
```

### Criar tarefa autenticada

Substitua `SEU_TOKEN` pelo token retornado no login:

```bash
curl -X POST http://localhost:3000/tarefas \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer SEU_TOKEN' \
  -d '{"titulo":"Estudar autenticação"}'
```

## Estrutura

- `src/controllers`: recebe as requisições HTTP.
- `src/logic`: concentra as regras de negócio.
- `src/repositories`: acessa o SQLite.
- `src/middlewares`: valida o token JWT.
- `src/models`: valida os dados de usuário.
- `data/banco.sql`: cria as tabelas e tarefas iniciais.

O arquivo `.env` e o banco `data/banco.db` não são versionados.
