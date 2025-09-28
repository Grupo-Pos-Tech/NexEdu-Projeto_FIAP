import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Post } from "../../components/types/Post";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { usePosts } from "../../hooks/usePosts";
import type { UpdatePostData } from "../../services/postService";

const EditPostPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getPostById, updatePost } = usePosts();

  const [post, setPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<UpdatePostData>({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!id) {
        setError("ID do post não fornecido");
        setIsLoadingPost(false);
        return;
      }

      try {
        const postData = await getPostById(parseInt(id));
        if (!postData) {
          setError("Post não encontrado");
          return;
        }

        setPost(postData);
        setFormData({
          title: postData.title,
          content: postData.content,
          excerpt: postData.excerpt,
          author: postData.author,
          tags: postData.tags,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar post");
      } finally {
        setIsLoadingPost(false);
      }
    };

    loadPost();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();

      if (formData.tags && !formData.tags.includes(newTag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...(prev.tags || []), newTag],
        }));
      }

      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((tag) => tag !== tagToRemove) || [],
    }));
  };

  const generateExcerpt = () => {
    if (formData.content) {
      const plainText = formData.content
        .replace(/#{1,6}\s+/g, "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/`(.*?)`/g, "$1")
        .replace(/```[\s\S]*?```/g, "")
        .replace(/\n+/g, " ")
        .trim();

      const excerpt =
        plainText.length > 150
          ? plainText.substring(0, 150) + "..."
          : plainText;

      setFormData((prev) => ({
        ...prev,
        excerpt,
      }));
    }
  };

  const validateForm = (): boolean => {
    if (!formData.title?.trim()) {
      setError("Título é obrigatório");
      return false;
    }

    if (!formData.content?.trim()) {
      setError("Conteúdo é obrigatório");
      return false;
    }

    if (!formData.author?.trim()) {
      setError("Autor é obrigatório");
      return false;
    }

    if (!formData.excerpt?.trim()) {
      setError("Resumo é obrigatório");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm() || !id) {
      return;
    }

    setIsLoading(true);

    try {
      await updatePost(parseInt(id), formData);
      navigate("/posts");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar post");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingPost) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-lg">Carregando post...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-red-600 text-lg mb-4">
              {error || "Post não encontrado"}
            </div>
            <Button onClick={() => navigate("/posts")}>
              Voltar para Posts
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Editar Post</CardTitle>
          <p className="text-sm text-gray-600">Editando: {post.title}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Título *
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Digite o título do post..."
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="author" className="text-sm font-medium">
                Autor *
              </label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Nome do autor..."
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Conteúdo *
              </label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Digite o conteúdo do post... (suporta Markdown)"
                rows={12}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label htmlFor="excerpt" className="text-sm font-medium">
                  Resumo *
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateExcerpt}
                  disabled={!formData.content}
                >
                  Gerar Automaticamente
                </Button>
              </div>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="Breve descrição do post..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tagInput" className="text-sm font-medium">
                Tags
              </label>
              <Input
                id="tagInput"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Digite uma tag e pressione Enter..."
              />

              {formData.tags && formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/posts")}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPostPage;
