# Estágio de desenvolvimento
FROM node:20-alpine AS dev
WORKDIR /app

# Copia arquivos de dependências e instala
COPY package*.json ./
RUN npm install

# Copia código fonte
COPY . .

# Expõe porta para desenvolvimento
EXPOSE 5173

# Inicia servidor de desenvolvimento
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Estágio de build para produção
FROM node:20-alpine AS production-build
WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./
RUN npm install

# Copia código fonte
COPY . .

# Gera build da aplicação
RUN npm run build

# Estágio final de produção
FROM nginx:alpine AS production
COPY --from=production-build /app/dist /usr/share/nginx/html

# Copia configuração personalizada do nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]