import { useEffect, useState } from "react";
import { mockPosts } from "../components/data/mockPosts";
import type { Post } from "../components/types/Post";
import {
  PostService,
  type CreatePostData,
  type UpdatePostData,
} from "../services/postService";
import { calculateReadTime, getCurrentDateString } from "../utils/postUtils";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await PostService.getAllPosts();
      setPosts(data);
    } catch (err) {
      console.warn("API não disponível, usando dados mockados:", err);
      setPosts(mockPosts);
    } finally {
      setIsLoading(false);
    }
  };

  const getPostById = async (id: number): Promise<Post | null> => {
    try {
      return await PostService.getPostById(id);
    } catch (err) {
      console.warn("API não disponível, usando dados mockados:", err);
      return mockPosts.find((post) => post.id === id) || null;
    }
  };

  const createPost = async (postData: CreatePostData): Promise<Post> => {
    setError(null);

    try {
      const newPost = await PostService.createPost(postData);
      setPosts((prev) => [...prev, newPost]);
      return newPost;
    } catch (err) {
      console.warn("API não disponível, simulando criação:", err);

      const newPost: Post = {
        id: Math.max(...posts.map((p) => p.id), 0) + 1,
        ...postData,
        publishedAt: getCurrentDateString(),
        readTime: calculateReadTime(postData.content),
      };

      setPosts((prev) => [...prev, newPost]);
      return newPost;
    }
  };

  const updatePost = async (
    id: number,
    postData: UpdatePostData
  ): Promise<Post> => {
    setError(null);

    try {
      const updatedPost = await PostService.updatePost(id, postData);
      setPosts((prev) =>
        prev.map((post) => (post.id === id ? updatedPost : post))
      );
      return updatedPost;
    } catch (err) {
      console.warn("API não disponível, simulando atualização:", err);

      const existingPost = posts.find((post) => post.id === id);
      if (!existingPost) {
        throw new Error("Post não encontrado");
      }

      const updatedPost: Post = {
        ...existingPost,
        ...postData,
        readTime: postData.content
          ? calculateReadTime(postData.content)
          : existingPost.readTime,
      };

      setPosts((prev) =>
        prev.map((post) => (post.id === id ? updatedPost : post))
      );

      return updatedPost;
    }
  };

  const deletePost = async (id: number): Promise<void> => {
    setError(null);

    try {
      await PostService.deletePost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      console.warn("API não disponível, simulando deleção:", err);

      setPosts((prev) => prev.filter((post) => post.id !== id));
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return {
    posts,
    isLoading,
    error,
    loadPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
  };
};
