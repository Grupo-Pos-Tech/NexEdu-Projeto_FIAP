# FIAP Pós-Tech Fase 3

Projeto front-end desenvolvido com React, TypeScript e Vite, totalmente dockerizado.

## Tecnologias

- **React 18** com TypeScript
- **Vite** para build e desenvolvimento
- **SHADCN UI** para componentes padrão
- **Docker** e **Docker Compose** para containerização
- **Nginx** para servir em produção

## Estrutura do Projeto

```
fiap-postech-fase3/
├── front/                 # Aplicação React
│   ├── src/              # Código fonte
│   ├── public/           # Arquivos públicos
│   ├── Dockerfile        # Container para dev e prod
│   ├── docker-compose.yml
│   └── nginx.conf        # Configuração Nginx
├── style-guide-frontend.md
└── README.md
```

## Como executar

### Desenvolvimento
```bash
docker-compose up front
```
Acesse: http://localhost:5173

### Produção
```bash
docker-compose --profile production up front-prod
```
Acesse: http://localhost

## Scripts disponíveis

Dentro da pasta `front/`:
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build