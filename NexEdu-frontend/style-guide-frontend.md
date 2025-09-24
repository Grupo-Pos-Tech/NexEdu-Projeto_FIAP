# Style Guide Front-end – shadcn/ui

## Paleta

### Cores Base
- **Base neutra:** Zinc
- **Primária sóbria:** Slate/Indigo desaturado
- **Semânticas:** Success (Emerald), Warning (Amber), Danger (Red)

## Tokens Essenciais

### CSS Variables

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 4%;

  --muted: 240 5% 96%;
  --muted-foreground: 240 4% 46%;

  --border: 240 5% 84%;
  --input: 240 5% 84%;

  --primary: 225 45% 40%;
  --primary-foreground: 0 0% 100%;

  --secondary: 240 4% 95%;
  --secondary-foreground: 240 6% 10%;

  --destructive: 0 72% 51%;
  --destructive-foreground: 0 0% 98%;

  --success: 142 72% 35%;
  --warning: 38 92% 50%;

  --card: 0 0% 100%;
  --card-foreground: 240 10% 4%;

  --radius: 0.5rem;
}

.dark {
  --background: 240 10% 4%;
  --foreground: 0 0% 98%;
  --muted: 240 3.7% 16%;
  --muted-foreground: 240 5% 65%;
  --border: 240 3.7% 26%;
  --input: 240 3.7% 26%;
  --primary: 225 45% 62%;
  --primary-foreground: 240 10% 4%;
  --secondary: 240 3.7% 16%;
  --secondary-foreground: 0 0% 98%;
  --destructive: 0 62% 45%;
  --card: 240 10% 4%;
  --card-foreground: 0 0% 98%;
}
```

### Configuração Tailwind

```javascript
extend: {
  colors: {
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
    primary: { 
      DEFAULT: "hsl(var(--primary))", 
      foreground: "hsl(var(--primary-foreground))" 
    },
    secondary: { 
      DEFAULT: "hsl(var(--secondary))", 
      foreground: "hsl(var(--secondary-foreground))" 
    },
    destructive: { 
      DEFAULT: "hsl(var(--destructive))", 
      foreground: "hsl(var(--destructive-foreground))" 
    },
    muted: { 
      DEFAULT: "hsl(var(--muted))", 
      foreground: "hsl(var(--muted-foreground))" 
    },
    card: { 
      DEFAULT: "hsl(var(--card))", 
      foreground: "hsl(var(--card-foreground))" 
    },
    border: "hsl(var(--border))",
    input: "hsl(var(--input))",
    success: "hsl(var(--success))",
    warning: "hsl(var(--warning))",
  },
  borderRadius: { 
    lg: "var(--radius)", 
    md: "calc(var(--radius) - 2px)", 
    sm: "calc(var(--radius) - 4px)" 
  },
}
```

## Tipografia

- **Base:** `text-[15px]` / `leading-6`
- **Títulos:** `text-xl font-semibold`
- **Texto auxiliar:** `text-sm text-muted-foreground`

## Espaçamento

- **Escala 4px:** usar `gap-2/3/4/6`
- **Altura mínima clicável:** 36px
- **Raio padrão:** `rounded-md`

## Componentes

### Button

Usar `default`, `secondary`, `outline`, `ghost`, `destructive`

```jsx
<Button>Salvar</Button>
<Button variant="secondary">Cancelar</Button>
```

### Input/Textarea

- Largura do container
- Erro = `border-destructive` + help `text-destructive`

### Select/Combobox

- Mínimo 240px
- Placeholder em `muted-foreground`

### Card

- `p-4` a `p-6`
- Títulos em `text-base font-semibold`

### Alert

Para feedback curto

### Dialog/Sheet

- Padding `p-6`
- Fechar com `Esc` e clique fora quando seguro

## Acessibilidade

- Contraste mínimo 4.5:1 em textos
- `focus-visible:ring-2 ring-primary` nos controles
- Não usar cor isolada para sinalizar erro

## Regras de Ouro

1. Uma ação primária por tela
2. Usar apenas tokens definidos
3. Espaçamentos em múltiplos de 4
4. Textos curtos e objetivos; botões com verbo
5. Dark mode via classe `.dark`