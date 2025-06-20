# Plataforma de Cursos Online

## O que é o projeto

Este projeto é um plataforma de cursos online desenvolvida com Next.js, Prisma e PostgreSQL. O objetivo é oferecer uma experiência moderna para alunos e administradores, permitindo:

- Navegação e busca de cursos por categoria ou palavra-chave
- Visualização detalhada de cada curso, incluindo preço, descrição e conteúdo programático
- Cadastro e autenticação de usuários
- Área administrativa para gestão de cursos e categorias

A plataforma foi pensada para ser escalável, acessível e fácil de usar, tanto para alunos quanto para administradores.

## Como fazer rodá-lo

### Pré-requisitos
- Node.js 20+
- Docker e Docker Compose

### Rodando com Docker Compose (recomendado)

1. Clone o repositório e acesse a pasta do projeto.
2. Execute:

```bash
docker compose -f compose.yml up --build
```

- O frontend estará disponível em [http://localhost:3000](http://localhost:3000)

### Ambiente de desenvolvimento

1. Suba o banco de dados e dependências:

```bash
docker compose -f docker-compose-dev.yml up
```

2. Instale as dependências:

```bash
npm install
```

3. Gere o client do Prisma e rode as migrações:

```bash
npx prisma generate
npx prisma migrate dev
```

4. Rode o projeto em modo desenvolvimento:

```bash
npm run dev
```

- O frontend estará disponível em [http://localhost:3000](http://localhost:3000)

### Variáveis de ambiente

- O arquivo `.env` deve conter a variável `DATABASE_URL` apontando para o banco PostgreSQL.
- Exemplo:

```
DATABASE_URL=postgresql://nossa_faculdade:senha_segura@localhost:5432/nossa_faculdade?schema=public
```

## Observações sobre design e arquitetura do projeto

- **Stack:** Next.js (App Router), React 19, Prisma ORM, PostgreSQL, TailwindCSS, NextAuth para autenticação.
- **Arquitetura:**
  - Separação clara entre camadas de serviço (`services`) e repositório (`repositories`), facilitando testes e manutenção.
  - API RESTful protegida por autenticação JWT (NextAuth), com middleware para proteger rotas administrativas e de criação/edição de cursos.
  - Utilização do Prisma para acesso e manipulação de dados, com migrations versionadas.
  - Interface moderna e responsiva, com componentes reutilizáveis e foco em acessibilidade.
- **Funcionalidades:**
  - Cadastro e login de usuários
  - CRUD de cursos e categorias (restrito a administradores)
  - Listagem e busca de cursos para visitantes
  - Página de detalhes de curso com informações completas
  - Sistema de autenticação e proteção de rotas sensíveis

