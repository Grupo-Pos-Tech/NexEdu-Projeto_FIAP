import React from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Post } from "../types/Post";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
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

        <div className="flex items-center text-sm text-muted-foreground space-x-2">
          <span>Por {post.author}</span>
          <span>•</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span>•</span>
          <span>{post.readTime} min de leitura</span>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/posts/${post.id}/edit`)}
          >
            Editar
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link to={`/posts/${post.id}`}>Ler mais</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
