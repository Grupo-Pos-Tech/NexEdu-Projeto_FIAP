import React from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Post } from '../../components/types/Post';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import CommentsSection from '../../components/Comments/CommentsSection';

interface PostPageProps {
  posts: Post[];
}

/**
 * Componente PostPage
 * Exibe um post individual com todo o seu conteúdo
 * Inclui título, metadados, conteúdo completo, tags e seção de comentários
 */
const PostPage: React.FC<PostPageProps> = ({ posts }) => {
  // Obtém o ID do post da URL
  const { id } = useParams<{ id: string }>();
  
  // Encontra o post correspondente ao ID
  const post = posts.find(p => p.id === parseInt(id || '0'));

  /**
   * Formata a data de publicação para o formato brasileiro
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  /**
   * Renderiza o conteúdo markdown do post como HTML
   * Em uma implementação real, seria recomendado usar uma biblioteca como react-markdown
   */
  const renderContent = (content: string) => {
    // Conversão básica de markdown para HTML
    // Em produção, use uma biblioteca como react-markdown ou marked
    return content
      .split('\n')
      .map((line, index) => {
        // Títulos
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-semibold mt-4 mb-2">{line.substring(4)}</h3>;
        }
        
        // Código em bloco
        if (line.startsWith('```')) {
          return <div key={index} className="bg-muted p-4 rounded-md my-4 font-mono text-sm overflow-x-auto">{line}</div>;
        }
        
        // Parágrafos vazios
        if (line.trim() === '') {
          return <br key={index} />;
        }
        
        // Parágrafos normais
        return <p key={index} className="mb-4 leading-relaxed">{line}</p>;
      });
  };

  // Se o post não for encontrado, exibe mensagem de erro
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post não encontrado</h1>
          <p className="text-muted-foreground mb-6">
            O post que você está procurando não existe ou foi removido.
          </p>
          <Link to="/posts">
            <Button>Voltar para a lista de posts</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Botão de voltar */}
      <div className="mb-6">
        <Link to="/posts">
          <Button variant="outline" size="sm">
            ← Voltar para a lista
          </Button>
        </Link>
      </div>

      {/* Cabeçalho do post */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 leading-tight">
          {post.title}
        </h1>
        
        {/* Metadados do post */}
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
          <span className="flex items-center">
            Por <strong className="ml-1 text-foreground">{post.author}</strong>
          </span>
          <span>•</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span>•</span>
          <span>{post.readTime} minutos de leitura</span>
        </div>

        {/* Tags do post */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      {/* Conteúdo do post */}
      <article className="prose prose-lg max-w-none mb-12">
        <div className="text-foreground">
          {renderContent(post.content)}
        </div>
      </article>

      {/* Seção de comentários */}
      <CommentsSection postId={post.id} />
    </div>
  );
};

export default PostPage;