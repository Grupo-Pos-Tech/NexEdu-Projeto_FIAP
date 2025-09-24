/**
 * NexEdu API - Sistema de Gerenciamento de Posts Educacionais
 *
 * API RESTful para criação, leitura, atualização e exclusão de posts educacionais.
 * Desenvolvido com Express.js, TypeScript e Prisma ORM.
 *
 * Endpoints disponíveis:
 * - GET /                    - Teste da API
 * - GET /posts               - Listar todos os posts
 * - GET /posts/:id           - Buscar post por ID
 * - GET /posts/search?q=     - Buscar posts por termo
 * - POST /posts              - Criar novo post
 * - PUT /posts/:id           - Atualizar post existente
 * - DELETE /posts/:id        - Deletar post
 *
 * @author Equipe NexEdu
 * @version 1.0.0
 */

import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

// Inicialização do Express e Prisma
const app = express();
const prisma = new PrismaClient();

// Middleware para parsing de JSON nas requisições
app.use(express.json());

/**
 * Endpoint de teste da API
 * Verifica se o servidor está funcionando corretamente
 * @route GET /
 * @returns {string} Mensagem de confirmação
 */
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Prisma with Express!");
});

/**
 * Busca posts por termo de pesquisa
 * Pesquisa no título e conteúdo dos posts (case-insensitive)
 * @route GET /posts/search
 * @param {string} q - Termo de busca (query parameter)
 * @returns {Post[]} Lista de posts que contêm o termo
 */
// GET /posts/search - Busca de Posts
app.get("/posts/search", async (req: Request, res: Response) => {
  const { q } = req.query;

  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { Title: { contains: q as string, mode: "insensitive" } },
        { Content: { contains: q as string, mode: "insensitive" } },
      ],
    },
  });

  res.json(posts);
});

/**
 * Lista todos os posts educacionais
 * Retorna todos os posts cadastrados no sistema
 * @route GET /posts
 * @returns {Post[]} Array com todos os posts
 */
// GET /posts - Lista de Posts
app.get("/posts", async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

/**
 * Busca um post específico por ID
 * @route GET /posts/:id
 * @param {number} id - ID do post a ser buscado
 * @returns {Post} Post encontrado ou erro 404
 */
// GET /posts/:id - Leitura de Posts
app.get("/posts/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!post) {
    res.status(404).json({ error: "Post não encontrado" });
    return;
  }

  res.json(post);
});

/**
 * Cria um novo post educacional
 * @route POST /posts
 * @param {string} Title - Título do post
 * @param {string} Content - Conteúdo do post
 * @param {string} Author - Nome do autor
 * @returns {Post} Post criado com sucesso
 */
// POST /posts - Criação de Postagens
app.post("/posts", async (req: Request, res: Response) => {
  const { Title, Content, Author } = req.body;
  const post = await prisma.post.create({
    data: { Title, Content, Author },
  });
  res.json(post);
});

/**
 * Atualiza um post existente
 * @route PUT /posts/:id
 * @param {number} id - ID do post a ser atualizado
 * @param {string} Title - Novo título do post
 * @param {string} Content - Novo conteúdo do post
 * @param {string} Author - Novo autor do post
 * @returns {Post} Post atualizado
 */
// PUT /posts/:id - Edição de Postagens
app.put("/posts/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { Title, Content, Author } = req.body;

  const post = await prisma.post.update({
    where: { id: parseInt(id) },
    data: { Title, Content, Author },
  });

  res.json(post);
});

/**
 * Exclui um post específico
 * @route DELETE /posts/:id
 * @param {number} id - ID do post a ser excluído
 * @returns {Object} Mensagem de confirmação da exclusão
 */
// DELETE /posts/:id - Exclusão de Postagens
app.delete("/posts/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.post.delete({
    where: { id: parseInt(id) },
  });

  res.json({ message: "Post deletado com sucesso" });
});

// Configuração e inicialização do servidor
const PORT = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0"; // Escuta em todas as interfaces para Docker

app.listen(PORT, HOST, () => {
  console.log(`Servidor NexEdu rodando em ${HOST}:${PORT}`);
});
