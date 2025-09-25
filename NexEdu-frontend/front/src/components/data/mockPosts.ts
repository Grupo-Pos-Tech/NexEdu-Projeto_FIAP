import type { Post, Comment } from '../types/Post';

/**
 * Dados mockados para demonstração dos posts do blog
 */
export const mockPosts: Post[] = [
  {
    id: 1,
    title: "Introdução ao React e TypeScript",
    content: `
# Introdução ao React e TypeScript

React é uma biblioteca JavaScript para construir interfaces de usuário, especialmente para aplicações web. Quando combinado com TypeScript, oferece uma experiência de desenvolvimento mais robusta e segura.

## Por que usar TypeScript com React?

TypeScript adiciona tipagem estática ao JavaScript, o que significa que você pode detectar erros em tempo de compilação ao invés de em tempo de execução. Isso é especialmente útil em projetos React grandes.

### Benefícios principais:

1. **Detecção precoce de erros**: O TypeScript pode identificar problemas antes mesmo do código ser executado
2. **Melhor IntelliSense**: IDEs podem fornecer autocompletar mais preciso
3. **Refatoração mais segura**: Mudanças no código são mais seguras com verificação de tipos
4. **Documentação viva**: Os tipos servem como documentação do código

## Configuração básica

Para começar um projeto React com TypeScript, você pode usar o Create React App:

\`\`\`bash
npx create-react-app meu-app --template typescript
\`\`\`

## Exemplo prático

Aqui está um exemplo simples de um componente React com TypeScript:

\`\`\`tsx
interface Props {
  name: string;
  age: number;
}

const UserCard: React.FC<Props> = ({ name, age }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Idade: {age}</p>
    </div>
  );
};
\`\`\`

Este é apenas o começo de uma jornada incrível com React e TypeScript!
    `,
    excerpt: "Aprenda como combinar React com TypeScript para criar aplicações mais robustas e seguras.",
    author: "João Silva",
    publishedAt: "2024-01-15",
    tags: ["React", "TypeScript", "Frontend", "JavaScript"],
    readTime: 5
  },
  {
    id: 2,
    title: "Gerenciamento de Estado com Context API",
    content: `
# Gerenciamento de Estado com Context API

O Context API é uma funcionalidade do React que permite compartilhar dados entre componentes sem precisar passar props manualmente através de cada nível da árvore de componentes.

## Quando usar Context API?

O Context é ideal para dados que podem ser considerados "globais" para uma árvore de componentes React, como:

- Usuário autenticado atual
- Tema da aplicação
- Idioma preferido
- Configurações da aplicação

## Criando um Context

Primeiro, criamos o contexto:

\`\`\`tsx
import React, { createContext, useContext, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
\`\`\`

## Provider Component

Em seguida, criamos um provider:

\`\`\`tsx
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
\`\`\`

## Hook personalizado

Para facilitar o uso, criamos um hook:

\`\`\`tsx
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
\`\`\`

## Usando o Context

Agora podemos usar o contexto em qualquer componente:

\`\`\`tsx
const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={theme}>
      <button onClick={toggleTheme}>
        Alternar para {theme === 'light' ? 'dark' : 'light'}
      </button>
    </header>
  );
};
\`\`\`

O Context API é uma ferramenta poderosa para gerenciar estado global de forma simples e eficiente!
    `,
    excerpt: "Descubra como usar o Context API do React para gerenciar estado global de forma eficiente.",
    author: "Maria Santos",
    publishedAt: "2024-01-20",
    tags: ["React", "Context API", "Estado", "Hooks"],
    readTime: 7
  },
  {
    id: 3,
    title: "Componentes Reutilizáveis com Shadcn/UI",
    content: `
# Componentes Reutilizáveis com Shadcn/UI

Shadcn/UI é uma coleção de componentes reutilizáveis construídos usando Radix UI e Tailwind CSS. É uma excelente escolha para criar interfaces modernas e acessíveis.

## O que é Shadcn/UI?

Shadcn/UI não é uma biblioteca tradicional de componentes. Em vez disso, é uma coleção de componentes que você pode copiar e colar em seus projetos, dando-lhe controle total sobre o código.

### Características principais:

- **Acessibilidade**: Construído sobre Radix UI, garantindo acessibilidade por padrão
- **Customizável**: Você possui o código, pode modificar como quiser
- **Moderno**: Design system consistente e moderno
- **TypeScript**: Suporte completo ao TypeScript

## Instalação

Para começar com Shadcn/UI:

\`\`\`bash
npx shadcn-ui@latest init
\`\`\`

## Adicionando componentes

Você pode adicionar componentes individuais:

\`\`\`bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
\`\`\`

## Exemplo de uso

Aqui está como usar um componente Button:

\`\`\`tsx
import { Button } from "@/components/ui/button";

const MyComponent = () => {
  return (
    <div>
      <Button variant="default">Clique aqui</Button>
      <Button variant="destructive">Deletar</Button>
      <Button variant="outline">Cancelar</Button>
    </div>
  );
};
\`\`\`

## Criando componentes customizados

Você pode facilmente criar seus próprios componentes baseados nos existentes:

\`\`\`tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductCardProps {
  title: string;
  price: number;
  onBuy: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, onBuy }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">R$ {price}</p>
        <Button onClick={onBuy} className="w-full mt-4">
          Comprar
        </Button>
      </CardContent>
    </Card>
  );
};
\`\`\`

## Vantagens do Shadcn/UI

1. **Controle total**: Você possui o código dos componentes
2. **Sem dependências extras**: Apenas Radix UI e Tailwind CSS
3. **Fácil customização**: Modifique os componentes conforme necessário
4. **Excelente DX**: Ótima experiência de desenvolvimento

Shadcn/UI é uma excelente escolha para projetos que precisam de componentes de alta qualidade com flexibilidade total!
    `,
    excerpt: "Aprenda a criar interfaces modernas e acessíveis usando Shadcn/UI com React e TypeScript.",
    author: "Pedro Costa",
    publishedAt: "2024-01-25",
    tags: ["Shadcn/UI", "React", "UI/UX", "Tailwind CSS"],
    readTime: 6
  }
];

/**
 * Dados mockados para comentários
 */
export const mockComments: Comment[] = [
  {
    id: 1,
    postId: 1,
    author: "Ana Oliveira",
    content: "Excelente artigo! Muito bem explicado, especialmente a parte sobre os benefícios do TypeScript.",
    publishedAt: "2024-01-16"
  },
  {
    id: 2,
    postId: 1,
    author: "Carlos Mendes",
    content: "Obrigado pelo tutorial! Estava procurando exatamente isso para começar meu projeto.",
    publishedAt: "2024-01-17"
  },
  {
    id: 3,
    postId: 2,
    author: "Lucia Ferreira",
    content: "O Context API realmente facilita muito o gerenciamento de estado. Ótimo exemplo prático!",
    publishedAt: "2024-01-21"
  },
  {
    id: 4,
    postId: 3,
    author: "Roberto Silva",
    content: "Shadcn/UI é incrível! Estou usando no meu projeto atual e a produtividade aumentou muito.",
    publishedAt: "2024-01-26"
  }
];

