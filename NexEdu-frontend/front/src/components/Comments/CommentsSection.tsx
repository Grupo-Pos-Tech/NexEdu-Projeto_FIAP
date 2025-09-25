import React, { useState, useMemo } from 'react';
import type { Comment } from '../types/Post';
import { mockComments } from '../data/mockPosts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface CommentsSectionProps {
  postId: number;
}

/**
 * Componente CommentsSection
 * Gerencia a exibição e adição de comentários para um post específico
 * Inclui lista de comentários existentes e formulário para novos comentários
 */
const CommentsSection: React.FC<CommentsSectionProps> = ({ postId }) => {
  // Estado para gerenciar os comentários (inicializado com dados mockados)
  const [comments, setComments] = useState<Comment[]>(mockComments);
  
  // Estados para o formulário de novo comentário
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentContent, setNewCommentContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Filtra os comentários para exibir apenas os do post atual
   */
  const postComments = useMemo(() => {
    return comments.filter(comment => comment.postId === postId);
  }, [comments, postId]);

  /**
   * Formata a data de publicação para o formato brasileiro
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Manipula o envio de um novo comentário
   */
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!newCommentAuthor.trim() || !newCommentContent.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simula uma requisição para o servidor
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Cria o novo comentário
      const newComment: Comment = {
        id: Math.max(...comments.map(c => c.id), 0) + 1,
        postId: postId,
        author: newCommentAuthor.trim(),
        content: newCommentContent.trim(),
        publishedAt: new Date().toISOString().split('T')[0] // Data atual no formato YYYY-MM-DD
      };

      // Adiciona o comentário à lista
      setComments(prevComments => [...prevComments, newComment]);

      // Limpa o formulário
      setNewCommentAuthor('');
      setNewCommentContent('');

      // Exibe mensagem de sucesso
      alert('Comentário adicionado com sucesso!');
    } catch (error) {
      alert('Erro ao adicionar comentário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho da seção de comentários */}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">
          Comentários ({postComments.length})
        </h2>

        {/* Formulário para novo comentário */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Deixe seu comentário</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitComment} className="space-y-4">
              {/* Campo para o nome do autor */}
              <div>
                <label htmlFor="author" className="block text-sm font-medium mb-2">
                  Seu nome
                </label>
                <Input
                  id="author"
                  type="text"
                  placeholder="Digite seu nome"
                  value={newCommentAuthor}
                  onChange={(e) => setNewCommentAuthor(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>

              {/* Campo para o conteúdo do comentário */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-2">
                  Comentário
                </label>
                <Textarea
                  id="content"
                  placeholder="Escreva seu comentário aqui..."
                  value={newCommentContent}
                  onChange={(e) => setNewCommentContent(e.target.value)}
                  disabled={isSubmitting}
                  rows={4}
                  required
                />
              </div>

              {/* Botão de envio */}
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? 'Enviando...' : 'Publicar comentário'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Lista de comentários existentes */}
        <div className="space-y-4">
          {postComments.length > 0 ? (
            postComments.map(comment => (
              <Card key={comment.id}>
                <CardContent className="pt-6">
                  {/* Cabeçalho do comentário com autor e data */}
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-foreground">
                      {comment.author}
                    </h4>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(comment.publishedAt)}
                    </span>
                  </div>
                  
                  {/* Conteúdo do comentário */}
                  <p className="text-foreground leading-relaxed">
                    {comment.content}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            /* Mensagem quando não há comentários */
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">
                  Ainda não há comentários neste post. Seja o primeiro a comentar!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;