import React from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../types/Post';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface PostCardProps {
  post: Post;
}

/**
 * Componente PostCard
 * Exibe um cartão com informações resumidas de um post
 * Inclui título, excerpt, autor, data de publicação, tags e tempo de leitura
 */
const PostCard: React.FC<PostCardProps> = ({ post }) => {
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

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="line-clamp-2">
          <Link 
            to={`/posts/${post.id}`}
            className="text-foreground hover:text-primary transition-colors"
          >
            {post.title}
          </Link>
        </CardTitle>
        
        {/* Informações do autor e data */}
        <div className="flex items-center text-sm text-muted-foreground space-x-2">
          <span>Por {post.author}</span>
          <span>•</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span>•</span>
          <span>{post.readTime} min de leitura</span>
        </div>
      </CardHeader>

      <CardContent>
        {/* Excerpt do post */}
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags do post */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
