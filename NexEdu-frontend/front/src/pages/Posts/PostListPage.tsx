import React from 'react';
import PostList from '../../components/Posts/PostList';
import { mockPosts } from '../../components/data/mockPosts';

/**
 * Componente PostListPage
 * Página wrapper que renderiza a lista de posts
 * Fornece os dados dos posts para o componente PostList
 */
const PostListPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <PostList posts={mockPosts} />
    </div>
  );
};

export default PostListPage;