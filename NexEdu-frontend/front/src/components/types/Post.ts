/**
 * Interface que define a estrutura de um post no blog
 */
export interface Post {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  tags: string[];
  readTime: number; // tempo de leitura em minutos
}

/**
 * Interface que define a estrutura de um comentário
 */
export interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  publishedAt: string;
}