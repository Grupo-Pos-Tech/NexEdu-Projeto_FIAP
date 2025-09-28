import React from "react";
import PostList from "../../components/Posts/PostList";
import { Card, CardContent } from "../../components/ui/card";
import { usePosts } from "../../hooks/usePosts";

/**
 * Componente PostListPage
 * Página wrapper que renderiza a lista de posts
 * Usa o hook usePosts para gerenciar o estado dos posts
 */
const PostListPage: React.FC = () => {
  const { posts, isLoading, error } = usePosts();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-lg">Carregando posts...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-red-600 text-lg mb-4">
              Erro ao carregar posts: {error}
            </div>
            <div className="text-sm text-gray-600">
              Usando dados de demonstração...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PostList posts={posts} />
    </div>
  );
};

export default PostListPage;
