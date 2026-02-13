# Financy

Sistema de controle financeiro pessoal desenvolvido com GraphQL, React e TypeScript. Permite gerenciar transações, categorias e acompanhar suas finanças de forma organizada.

## Stack

### Front-end
- **React 19** com TypeScript
- **Vite** - Build tool e dev server
- **TanStack Router** - Roteamento type-safe
- **TanStack Query** - Gerenciamento de estado server
- **Apollo Client** - Cliente GraphQL
- **TailwindCSS** - Estilização
- **shadcn/ui** - Componentes UI
- **Zod** - Validação de schemas
- **Zustand** - Estado global

### Back-end
- **Node.js** com TypeScript
- **Express** - Framework web
- **Apollo Server** - Servidor GraphQL
- **TypeGraphQL** - GraphQL com decorators
- **Prisma** - ORM
- **SQLite/Turso** - Banco de dados
- **JWT** - Autenticação
- **bcryptjs** - Hashing de senhas

### Ferramentas
- **Bun** - Package manager e runtime
- **Biome** - Linter e formatter
- **Monorepo** - Estrutura com workspaces

## Pré-requisitos

- [Bun](https://bun.sh/) v1.3.2 ou superior
- Node.js 18+ (caso não use Bun como runtime)

## Como rodar o projeto

### 1. Clone o repositório
```bash
git clone https://github.com/combizera/financy.git
cd financy
```

### 2. Instale as dependências
```bash
bun install
```

### 3. Configure as variáveis de ambiente

Copie os arquivos de exemplo e configure as variáveis:

```bash
# Backend
cp apps/server/.env.example apps/server/.env
# Edite apps/server/.env e altere o JWT_SECRET para uma string aleatória

# Frontend
cp apps/web/.env.example apps/web/.env
# Não precisa alterar nada se for rodar localmente
```

**Backend** (`apps/server/.env`)
```env
DATABASE_URL="file:../../packages/db/local.db"
JWT_SECRET="seu_secret_jwt_aqui"  # ⚠️ Troque por uma string aleatória!
```

**Frontend** (`apps/web/.env`)
```env
VITE_GQL_SERVER_URL=http://localhost:3005
```

### 4. Configure o banco de dados
```bash
# Gera o Prisma Client
bun run db:generate

# Aplica as migrations e cria as tabelas
bun run db:migrate
```

### 5. Inicie o projeto

**Rodar tudo junto:**
```bash
bun run dev
```

**Ou rodar separadamente:**
```bash
# Backend (porta 3005)
bun run dev:server

# Frontend (porta 5173)
bun run dev:web
```

### 6. Acesse a aplicação
- **Frontend**: http://localhost:5173
- **GraphQL Playground**: http://localhost:3005/graphql

## Scripts disponíveis

```bash
bun run dev              # Roda todos os projetos
bun run dev:web          # Roda apenas o frontend
bun run dev:server       # Roda apenas o backend
bun run build            # Build de todos os projetos
bun run format           # Formata o código com Biome
bun run check-types      # Verifica tipos TypeScript
bun run db:studio        # Abre o Prisma Studio
bun run db:migrate       # Aplica as migrations do banco de dados
bun run db:push          # Sincroniza o schema sem criar migrations
```

## Funcionalidades

### Autenticação
- Criar conta com email e senha
- Login com JWT
- Gerenciamento de sessão
- Isolamento de dados por usuário

### Transações
- Criar, editar e deletar transações
- Filtrar por período, tipo e categoria
- Busca por descrição
- Visualizar saldo consolidado

### Categorias
- Criar, editar e deletar categorias personalizadas
- Organizar transações por categoria
- Categorias vinculadas ao usuário

### Interface
- Dashboard com resumo financeiro
- Tema claro/escuro
- Design responsivo
- Feedback visual com toast notifications

## Estrutura do Projeto

```
financy/
├── apps/
│   ├── server/          # Backend GraphQL com Apollo Server
│   └── web/             # Frontend React com Vite
└── packages/
    ├── config/          # Configurações compartilhadas (TypeScript, ESLint)
    └── db/              # Prisma schema e configuração do banco
```

## Troubleshooting

### Erro: "Cannot find module '@prisma/client'"
Execute `bun run db:generate` para gerar o Prisma Client.

### Erro de conexão GraphQL
Verifique se:
- O backend está rodando na porta 3005
- A variável `VITE_GQL_SERVER_URL` no frontend está correta
- Não há firewall bloqueando a porta

### Banco de dados vazio
Execute `bun run db:migrate` para aplicar as migrations e criar as tabelas no banco de dados.

### Erro de autenticação
Verifique se a variável `JWT_SECRET` está definida no `.env` do backend.
