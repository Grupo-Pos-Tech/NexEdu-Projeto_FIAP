# NexEdu A### Como Usar

```bash
# Build Docker automático no push para main
git push origin main

# Deploy de desenvolvimento
git push origin develop

# Release com versioning
git tag v1.0.0 && git push origin v1.0.0
```

> 🐳 **Docker-first!** Tudo é testado e empacotado em containers para máxima portabilidade.

**📖 Documentação completa**: [GitHub Actions Guide](.github/ACTIONS.md)  
**⚡ Configuração rápida**: [Setup Guide](.github/SETUP.md)  
**🐳 Deploy com Docker**: [Docker Deployment Guide](DOCKER-DEPLOY.md)ara gerenciamento de posts educacionais.

## Tecnologias

- Node.js + TypeScript
- Express.js
- Prisma ORM

### Como Funciona

```bash
# Dispara testes + build + push para Docker Hub
git push origin main

# Dispara apenas testes (não faz push)
git push origin develop

# Cria release automático com changelog e assets
git tag v1.0.0
git push origin v1.0.0
```

### Criando Releases

Para criar uma nova release:

```bash
# 1. Faça suas mudanças e commits
git add .
git commit -m "feat: nova funcionalidade"

# 2. Crie e push a tag
git tag v1.2.0
git push origin v1.2.0

# 3. O workflow automaticamente:
#    - Gera changelog dos commits
#    - Cria release no GitHub
#    - Anexa arquivos de deploy
#    - Documenta como usar a versão
```

> 💡 **Focado em qualidade!** O CI/CD valida código, roda testes e prepara builds sem deploy automático.

**📖 Documentação completa**: [GitHub Actions Guide](.github/ACTIONS.md)  
**⚡ Configuração rápida**: [Setup Guide](.github/SETUP.md)cker & Docker Compose

## Como usar

### 🐳 Opção 1: Usando Docker (Recomendado)

A forma mais fácil de executar o projeto é usando Docker:

```bash
# Clone o repositório
git clone https://github.com/Rafacolacio/NexEdu.git
cd NexEdu

# Copie o arquivo de ambiente
cp .env.example .env

# Inicie todos os serviços (API + PostgreSQL)
docker-compose up -d

# Visualizar logs em tempo real
docker-compose logs -f api
```

A API estará disponível em `http://localhost:3000` e o PostgreSQL na porta `5433`.

#### Comandos Docker úteis:

```bash
# Parar todos os serviços
docker-compose down

# Rebuildar e iniciar (após mudanças no código)
docker-compose up --build -d

# Modo desenvolvimento (com hot reload)
docker-compose --profile dev up -d

# Ver logs de um serviço específico
docker-compose logs -f api
docker-compose logs -f postgres

# Acessar o container da API
docker exec -it nexedu-api sh
```

### 💻 Opção 2: Executar Localmente

```bash
# Instalar dependências
npm install

# Configurar banco (.env)
DATABASE_URL="postgresql://user:pass@localhost:5432/nexedu"

# Executar migrações
npx prisma migrate dev

# Iniciar servidor
npm run dev
```

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```env
# Configuração do Banco de Dados
DATABASE_URL="postgresql://nexedu:nexedu123@localhost:5433/nexedu_db"

# Configuração da API
PORT=3000
NODE_ENV=development
```

### Acessos (Docker)

- **API**: http://localhost:3000
- **API (dev)**: http://localhost:3001 (quando executado em modo dev)
- **PostgreSQL**: localhost:5433
  - **Usuário**: nexedu
  - **Senha**: nexedu123
  - **Database**: nexedu_db

## Endpoints

```
GET    /              # Teste da API
GET    /posts         # Listar posts
GET    /posts/:id     # Buscar por ID
GET    /posts/search?q=termo  # Buscar por termo
POST   /posts         # Criar post
PUT    /posts/:id     # Atualizar post
DELETE /posts/:id     # Deletar post
```

## Modelo de Dados

```json
{
  "id": 1,
  "Title": "Título do post",
  "Content": "Conteúdo do post",
  "Author": "Nome do autor"
}
```

## 🔄 CI/CD com GitHub Actions

Este projeto utiliza **Semantic Release** com **Conventional Commits** para automação completa com Docker.

### Workflows Configurados

**🐳 Docker Build and Push** (`main.yml`):

- **Triggers**: Push para `main`/`develop`, tags `v*`, pull requests
- **Test Phase**: Testes automatizados com Docker + PostgreSQL
- **Build Phase**: Build multi-arquitetura (linux/amd64, linux/arm64)
- **Push Phase**: Upload automático para Docker Hub
- **Semantic Release**: Gera releases automaticamente baseado em conventional commits

### Status dos Pipelines

![Docker Build and Push](https://github.com/jessicaMarquess/NexEdu/workflows/Docker%20Build%20and%20Push/badge.svg)

## � Conventional Commits & Semantic Release

### 🎯 Como funciona

- **Push para `main`** → Analisa commits → **Gera release automaticamente** se houver mudanças significativas
- **Sem commits convencionais** → Não gera release
- **Com commits convencionais** → Gera tag, changelog e release

### 📋 Tipos de commit

#### 🐛 **Patch Version** (v1.0.0 → v1.0.1)

```bash
fix: corrigir bug na validação de dados
fix(api): resolver erro 500 no endpoint de posts
fix(database): corrigir migração duplicada
```

#### ✨ **Minor Version** (v1.0.0 → v1.1.0)

```bash
feat: adicionar endpoint de busca de posts
feat(auth): implementar login com Google
feat(api): adicionar filtros de data nos posts
```

#### 💥 **Major Version** (v1.0.0 → v2.0.0)

```bash
feat!: alterar estrutura da API de posts
feat(api)!: remover endpoint deprecated /old-posts
fix!: alterar formato de resposta da API

# Ou usando BREAKING CHANGE no footer
feat(api): adicionar novo sistema de autenticação

BREAKING CHANGE: O endpoint /auth agora requer header Authorization
```

#### 📚 **Não geram release**

```bash
docs: atualizar README com novas instruções
style: formatar código com prettier
refactor: reorganizar estrutura de pastas
test: adicionar testes unitários
chore: atualizar dependências
ci: melhorar workflow do GitHub Actions
```

### 🏗️ **Estrutura do commit**

```
<tipo>(<escopo>)!: <descrição>

<corpo do commit (opcional)>

<footer (opcional)>
```

### ✅ **Exemplos práticos**

**Cenário: Corrigir bug + Adicionar feature**

```bash
# Commit 1
fix: corrigir validação de email no cadastro

# Commit 2
feat: adicionar endpoint para upload de avatar

# Push para main → Gera v1.1.0 (minor - por causa do feat)
```

**Cenário: Breaking change**

```bash
feat!: alterar formato de resposta da API

BREAKING CHANGE: Todos os endpoints agora retornam data no formato ISO

# Push para main → Gera v2.0.0 (major - por causa do !)
```

**Cenário: Apenas docs**

```bash
docs: melhorar documentação da API
chore: atualizar dependências

# Push para main → NÃO gera release (apenas docs/chore)
```

### 📦 **Fluxo completo**

1. **Desenvolva** normalmente
2. **Faça commits** seguindo conventional commits
3. **Push para main** → Workflow analisa commits automaticamente
4. **Se houver mudanças significativas** → Cria tag + release automaticamente
5. **Release inclui** changelog, Docker images, arquivos de deploy

### 🎯 **Dicas para bons commits**

- **Use o presente**: "adicionar" não "adicionado"
- **Seja específico**: "corrigir validação de email" não "corrigir bug"
- **Use escopos**: `feat(auth):`, `fix(api):`, `docs(readme):`
- **Breaking changes** sempre usar `!` ou `BREAKING CHANGE`

## Testes

Use o arquivo `test-requests.http` com a extensão REST Client do VS Code.

---

Desenvolvido pela Equipe NexEdu
