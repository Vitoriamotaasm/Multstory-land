# MultStory — Vue 3

Landing page da MultStory refatorada em Vue 3 + TypeScript + Vite + Tailwind CSS.

## Estrutura

```text
src/
├── components/
│   ├── Banner/
│   ├── CaseLightbox/
│   ├── Cases/
│   ├── Contato/
│   ├── Equipe/
│   ├── Footer/
│   ├── Header/
│   ├── Hero/
│   ├── Servicos/
│   ├── ServicosModal/
│   ├── Sobre/
│   └── ui/
│       └── MagneticButton/
├── composables/
├── config/
├── data/
├── styles/
├── types/
├── App.vue
└── main.ts
```

## Princípios usados

- Componentização por responsabilidade
- Feature simples e direta, sem excesso de abstrações
- Dados separados da apresentação
- Composables para comportamentos reutilizáveis
- Tipagem estrita com TypeScript
- Acessibilidade básica em navegação, dialogs e mídia
- `prefers-reduced-motion` para reduzir animações quando solicitado pelo sistema

## Desenvolvimento

```bash
npm install
npm run dev
```

## Validação

```bash
npm run type-check
npm run build
```

> `node_modules` não é versionado nem incluído no ZIP. Rode `npm install` na sua máquina antes da validação.
# Multstory-land
