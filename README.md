# NexEdu - Plataforma Educacional

Sistema completo de gerenciamento educacional com interface web moderna e API RESTful robusta. Desenvolvido para professores e alunos com controle de acesso baseado em roles.

## 🏗 Arquitetura

O projeto é dividido em duas aplicações principais:

- *Backend (NexEdu-backend/)*: API RESTful com autenticação JWT e sistema de roles
- *Frontend (NexEdu-frontend-shadcnui/)*: Interface web moderna com Next.js e shadcn/ui
- *Banco de Dados*: PostgreSQL com Prisma ORM
- *Orquestração*: Docker Compose para desenvolvimento e produção

## 🚀 Tecnologias

### Backend

- Node.js + TypeScript
- Express.js
- Prisma ORM
- PostgreSQL
- JWT (JSON Web Token)
- bcrypt
- Docker & Docker Compose

### Frontend

- Next.js 14 + TypeScript
- React 18
- shadcn/ui + Radix UI
- Tailwind CSS
- Lucide Icons

## ✨ Funcionalidades

### 🔐 Sistema de Autenticação

- *Login seguro* com validação JWT
- *Controle de acesso* baseado em roles (Professor/Aluno)
- *Proteção de rotas* no frontend e backend
- *Gerenciamento de sessão* com localStorage

### 👨‍🏫 Área Administrativa (Apenas Professores)

- *Dashboard administrativo* para gerenciamento de conteúdo
- *Controle total sobre posts* educacionais

### 📚 Gerenciamento de Posts Educacionais

- *Visualização de posts* para todos os usuários autenticados
- *Criação, edição e exclusão* de posts (apenas professores)
- *Sistema de busca* avançado por título e conteúdo
- *Interface moderna* para gerenciamento de conteúdo
- *Relacionamento* entre posts e autores

### 🎨 Interface do Usuário

- *Design moderno* com shadcn/ui components
- *Sidebar responsiva* com navegação intuitiva
- *Tema consistente* com Tailwind CSS
- *Dialogs e modais* para interações
- *Tabelas interativas* para listagem de dados
- *Sistema de notificações* para feedback ao usuário

## 🚀 Início Rápido

### Opção 1: Docker Compose (Recomendado)

Execute todo o sistema com um único comando:

bash
# Clone o repositório
git clone https://github.com/Grupo-Pos-Tech/NexEdu-Projeto_FIAP.git
cd NexEdu-Projeto_FIAP

# Inicie todos os serviços (PostgreSQL + API + Frontend)
docker-compose up -d

# Visualizar logs
docker-compose logs -f


Rodar tests requests

*🌐 Acessos:*

- *Frontend*: http://localhost:2025
- *API Backend*: http://localhost:3000
- *PostgreSQL*: localhost:5433

### Opção 2: Modo Desenvolvimento

Para desenvolvimento com hot reload:

bash
# Modo desenvolvimento (backend na porta 3001)
docker-compose --profile dev up -d

# Logs específicos
docker-compose logs -f api-dev
docker-compose logs -f frontend


*🌐 Acessos (Dev):*

- *Frontend*: http://localhost:2025
- *API Backend*: http://localhost:3001
- *PostgreSQL*: localhost:5433

### Opção 3: Execução Local (Desenvolvimento Avançado)

Para desenvolvimento local sem Docker:

#### Backend

bash
cd NexEdu-backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Executar migrações do banco
npx prisma migrate dev

# Iniciar servidor em desenvolvimento
npm run dev


#### Frontend

bash
cd NexEdu-frontend-shadcnui

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev


### Comandos Docker Úteis

bash
# Parar todos os serviços
docker-compose down

# Rebuildar após mudanças no código
docker-compose up --build -d

# Modo produção (frontend + backend otimizados)
docker-compose --profile production up -d

# Ver logs de serviços específicos
docker-compose logs -f api
docker-compose logs -f frontend
docker-compose logs -f postgres

# Acessar containers
docker exec -it nexedu-api sh
docker exec -it nexedu-frontend sh

# Limpeza completa
docker-compose down -v
docker system prune -a


## ⚙ Configuração

### Variáveis de Ambiente (Backend)

As configurações principais são gerenciadas via Docker Compose. Para execução local, crie um .env no diretório NexEdu-backend/:

env
# Configuração do Banco de Dados
DATABASE_URL="postgresql://nexedu:nexedu123@localhost:5433/nexedu_db"

# Configuração da API
PORT=3000
NODE_ENV=development

# JWT Secret para autenticação (altere em produção)
JWT_SECRET="nexedu-secret-key-change-in-production"


### Credenciais de Acesso

*🗄 PostgreSQL:*

- *Host*: localhost:5433
- *Usuário*: nexedu
- *Senha*: nexedu123
- *Database*: nexedu_db

*🔑 Usuários Padrão:*

- Utilize os endpoints /auth/register e /auth/login para criar e acessar contas
- Roles disponíveis: PROFESSOR e ALUNO


### 🔗 Headers Necessários

http
Content-Type: application/json
Authorization: Bearer {seu-jwt-token}


## Modelos de Dados

### User

json
{
  "id": 1,
  "name": "Prof. João Silva",
  "login": "joao.professor",
  "role": "PROFESSOR",
  "createdAt": "2025-10-05T20:00:00.000Z",
  "updatedAt": "2025-10-05T20:00:00.000Z"
}


### Post

json
{
  "id": 1,
  "Title": "Autenticação com JWT",
  "Content": "JSON Web Token é um padrão aberto...",
  "Author": "Prof. João Silva",
  "authorId": 1,
  "author": {
    "id": 1,
    "name": "Prof. João Silva",
    "login": "joao.professor",
    "role": "PROFESSOR"
  },
  "createdAt": "2025-10-05T20:00:00.000Z",
  "updatedAt": "2025-10-05T20:00:00.000Z"
}


### Login Response

json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Prof. João Silva",
    "login": "joao.professor",
    "role": "PROFESSOR"
  }
}


## Testes

Use o arquivo test-requests.http com a extensão REST Client do VS Code.

### Como testar

1. Instale a extensão REST Client no VS Code
2. Inicie o servidor com npm run dev ou docker-compose up
3. Execute as requisições de login (8 e 9) e copie os tokens retornados
4. Cole os tokens nas variáveis @tokenProfessor e @tokenAluno no arquivo
5. Execute as demais requisições clicando em "Send Request"

O arquivo contém 37 casos de teste cobrindo:

- Autenticação e registro
- CRUD completo de posts
- Testes de autorização (403 Forbidden)
- Testes de autenticação (401 Unauthorized)
- Testes de validação (400 Bad Request, 404 Not Found)

## 📁 Estrutura do Projeto


NexEdu-Projeto_FIAP/
├── 🗄 Configuração Geral
│   ├── docker-compose.yml         # Orquestração completa do sistema
│   ├── package.json               # Scripts do projeto raiz
│   └── README.md                  # Este arquivo
│
├── 🔧 Backend (NexEdu-backend/)
│   ├── prisma/
│   │   ├── migrations/            # Migrações do banco de dados
│   │   └── schema.prisma          # Schema do Prisma
│   ├── src/
│   │   ├── middleware/auth.ts     # Autenticação e autorização
│   │   └── index.ts               # Servidor Express e rotas
│   ├── Dockerfile                 # Container de produção
│   ├── Dockerfile.dev             # Container de desenvolvimento
│   ├── package.json               # Dependências do backend
│   └── test-requests.http         # Testes de API
│
├── 🎨 Frontend (NexEdu-frontend-shadcnui/)
│   ├── app/                       # Pages do Next.js 14
│   │   ├── login/                 # Página de login
│   │   ├── posts/                 # Gerenciamento de posts
│   │   └── admin/                 # Dashboard administrativo
│   ├── components/                # Componentes React
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── posts-table.tsx        # Tabela de posts
│   │   ├── users-table.tsx        # Tabela de usuários
│   │   └── app-sidebar.tsx        # Navegação lateral
│   ├── contexts/AuthContext.tsx   # Contexto de autenticação
│   ├── lib/api.ts                 # Configurações da API
│   ├── Dockerfile                 # Container de produção
│   ├── Dockerfile.dev             # Container de desenvolvimento
│   └── package.json               # Dependências do frontend


## CI/CD com GitHub Actions

Este projeto utiliza Semantic Release com Conventional Commits para automação completa.

### Workflows Configurados

*Docker Build and Push* (main.yml):

- *Triggers*: Push para main/develop, tags v*, pull requests
- *Test Phase*: Testes automatizados com Docker + PostgreSQL
- *Build Phase*: Build multi-arquitetura (linux/amd64, linux/arm64)
- *Push Phase*: Upload automático para Docker Hub
- *Semantic Release*: Gera releases automaticamente baseado em conventional commits

### Conventional Commits

#### Tipos de commit

*Patch Version* (v1.0.0 → v1.0.1):

bash
fix: corrigir bug na validação de dados
fix(api): resolver erro 500 no endpoint de posts


*Minor Version* (v1.0.0 → v1.1.0):

bash
feat: adicionar endpoint de busca de posts
feat(auth): implementar login com JWT


*Major Version* (v1.0.0 → v2.0.0):

bash
feat!: alterar estrutura da API de posts
fix!: alterar formato de resposta da API


*Não geram release*:

bash
docs: atualizar README
style: formatar código
refactor: reorganizar estrutura
test: adicionar testes unitários
chore: atualizar dependências
ci: melhorar workflow


## Segurança

- Senhas criptografadas com bcrypt (10 rounds)
- Autenticação JWT com tokens válidos por 24 horas
- Validação de roles em todos os endpoints protegidos
- Validação de dados de entrada
- Headers de segurança configurados no Express

## 👩‍💻 Desenvolvimento

### Scripts Disponíveis

*Projeto Raiz:*

bash
npm run docker:up          # Subir todos os serviços
npm run docker:down        # Parar todos os serviços
npm run docker:logs        # Ver logs de todos os serviços
npm run docker:dev         # Modo desenvolvimento


*Backend (NexEdu-backend/):*

bash
npm run dev                # Desenvolvimento com hot reload
npm run build              # Build para produção
npm run start              # Executar versão compilada
npm run prisma:generate    # Gerar Prisma Client
npm run prisma:migrate     # Executar migrações
npx prisma studio          # Interface visual do banco


*Frontend (NexEdu-frontend-shadcnui/):*

bash
npm run dev                # Servidor de desenvolvimento
npm run build              # Build otimizado
npm run start              # Servidor de produção
npm run lint               # Linting do código


## 🔒 Segurança

- *Autenticação JWT* com tokens seguros
- *Criptografia bcrypt* para senhas (10 rounds)
- *Proteção de rotas* no frontend e backend
- *Validação de dados* em todos os endpoints
- *Controle de acesso* baseado em roles
- *Headers de segurança* configurados

## 👥 Equipe

Desenvolvido pela *Equipe NexEdu* - Pós Tech FIAP