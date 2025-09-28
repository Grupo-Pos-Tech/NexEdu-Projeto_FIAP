import type { Post } from "../components/types/Post";
import {
  calculateReadTime,
  generateDefaultTags,
  generateExcerpt,
  getCurrentDateString,
} from "../utils/postUtils";
import { apiService } from "./api";

interface BackendPost {
  id: number;
  Title: string;
  Content: string;
  Author: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  tags: string[];
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  excerpt?: string;
  author?: string;
  tags?: string[];
  readTime?: number;
}

export class PostService {
  static async getAllPosts(): Promise<Post[]> {
    try {
      const backendPosts = await apiService.get<BackendPost[]>("/posts");

      const frontendPosts: Post[] = backendPosts.map((post) => ({
        id: post.id,
        title: post.Title,
        content: post.Content,
        author: post.Author,
        excerpt: generateExcerpt(post.Content),
        tags: generateDefaultTags(),
        publishedAt: getCurrentDateString(),
        readTime: calculateReadTime(post.Content),
      }));

      return frontendPosts;
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      throw new Error("Falha ao carregar posts");
    }
  }
  static async getPostById(id: number): Promise<Post> {
    try {
      const backendPost = await apiService.get<BackendPost>(`/posts/${id}`);

      const frontendPost: Post = {
        id: backendPost.id,
        title: backendPost.Title,
        content: backendPost.Content,
        author: backendPost.Author,
        excerpt: generateExcerpt(backendPost.Content),
        tags: generateDefaultTags(),
        publishedAt: getCurrentDateString(),
        readTime: calculateReadTime(backendPost.Content),
      };

      return frontendPost;
    } catch (error) {
      console.error(`Erro ao buscar post ${id}:`, error);
      throw new Error("Post não encontrado");
    }
  }

  static async createPost(postData: CreatePostData): Promise<Post> {
    try {
      const backendData = {
        Title: postData.title,
        Content: postData.content,
        Author: postData.author,
      };

      const createdPost = await apiService.post<BackendPost>(
        "/posts",
        backendData
      );

      const frontendPost: Post = {
        id: createdPost.id,
        title: createdPost.Title,
        content: createdPost.Content,
        author: createdPost.Author,
        excerpt: postData.excerpt,
        tags: postData.tags,
        publishedAt: getCurrentDateString(),
        readTime: calculateReadTime(postData.content),
      };

      return frontendPost;
    } catch (error) {
      console.error("Erro ao criar post:", error);
      throw new Error("Falha ao criar post");
    }
  }
  static async updatePost(id: number, postData: UpdatePostData): Promise<Post> {
    try {
      const backendData: Partial<BackendPost> = {};

      if (postData.title) backendData.Title = postData.title;
      if (postData.content) backendData.Content = postData.content;
      if (postData.author) backendData.Author = postData.author;

      const updatedPost = await apiService.put<BackendPost>(
        `/posts/${id}`,
        backendData
      );

      const frontendPost: Post = {
        id: updatedPost.id,
        title: updatedPost.Title,
        content: updatedPost.Content,
        author: updatedPost.Author,
        excerpt: postData.excerpt || generateExcerpt(updatedPost.Content),
        tags: postData.tags || generateDefaultTags(),
        publishedAt: getCurrentDateString(),
        readTime: postData.content
          ? calculateReadTime(postData.content)
          : calculateReadTime(updatedPost.Content),
      };

      return frontendPost;
    } catch (error) {
      console.error(`Erro ao atualizar post ${id}:`, error);
      throw new Error("Falha ao atualizar post");
    }
  }

  static async deletePost(id: number): Promise<void> {
    try {
      await apiService.delete(`/posts/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar post ${id}:`, error);
      throw new Error("Falha ao deletar post");
    }
  }
}
