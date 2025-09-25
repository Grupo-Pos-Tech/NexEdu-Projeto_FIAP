import React, { useState, useMemo } from 'react';
import type { Post } from '../types/Post';
import PostCard from './PostCard';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface PostListProps {
  posts: Post[];
}

/**
 * Componente PostList
 * Exibe uma lista de posts com funcionalidade de busca e filtro
 * Inclui campo de busca que filtra por título, conteúdo, autor e tags
 */
const PostList: React.FC<PostListProps> = ({ posts }) => {
  // Estado para o termo de busca
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para a tag selecionada como filtro
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  /**
   * Obtém todas as tags únicas dos posts para exibir como filtros
   */
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  /**
   * Filtra os posts baseado no termo de busca e tag selecionada
   */
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Filtro por termo de busca (título, conteúdo, autor)
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      // Filtro por tag selecionada
      const matchesTag = selectedTag === null || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchTerm, selectedTag]);

  /**
   * Limpa todos os filtros aplicados
   */
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag(null);
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho com título */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-2">Blog NexEdu</h1>
        <p className="text-muted-foreground">
          Descubra artigos sobre desenvolvimento, tecnologia e educação
        </p>
      </div>

      {/* Seção de filtros */}
      <div className="space-y-4">
        {/* Campo de busca */}
        <div className="max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Buscar posts por título, autor, conteúdo ou tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Filtros por tags */}
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTag(null)}
          >
            Todas as categorias
          </Button>
          
          {allTags.map(tag => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Botão para limpar filtros (aparece apenas quando há filtros ativos) */}
        {(searchTerm || selectedTag) && (
          <div className="text-center">
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Limpar filtros
            </Button>
          </div>
        )}
      </div>

      {/* Contador de resultados */}
      <div className="text-center text-sm text-muted-foreground">
        {filteredPosts.length === posts.length 
          ? `${posts.length} posts encontrados`
          : `${filteredPosts.length} de ${posts.length} posts encontrados`
        }
      </div>

      {/* Lista de posts */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        /* Mensagem quando nenhum post é encontrado */
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Nenhum post encontrado com os filtros aplicados.
          </p>
          <Button variant="outline" className="mt-4" onClick={clearFilters}>
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostList;