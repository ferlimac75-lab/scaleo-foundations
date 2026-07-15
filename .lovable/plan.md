Plano de ajustes no logo da Scaleo.

## Escopo

Trocar o logo atual da header (PNG) pelo SVG enviado pelo usuário e aumentar levemente o tamanho do logo no header e no rodapé, sem extrapolar a altura do header.

## Alterações

### 1. Criar asset do SVG enviado

- Fazer upload de `user-uploads://scaleo-logo.svg` para o CDN via `lovable-assets`.
- Gerar o ponteiro `src/assets/scaleo-logo.svg.asset.json`.

### 2. Atualizar componente `Logo.tsx`

- Substituir a importação do asset PNG (`scaleo-header-positiva.png.asset.json`) pelo novo asset SVG.
- Manter a prop `className` e o `alt` descritivo.

### 3. Aumentar logo no header

- Em `Header.tsx`, alterar `<Logo className="h-12 md:h-14" />` para algo como `<Logo className="h-14 md:h-16" />`, garantindo que ainda caiba confortavelmente dentro do `h-20` do header.

### 4. Aumentar logo no rodapé

- Em `Footer.tsx`, alterar `<Logo />` para `<Logo className="h-12 md:h-14" />`.

### 5. Verificação

- Rodar `bun run build` para garantir que a troca de asset e os ajustes de tamanho não quebram a compilação.
- Validar visualmente no preview se o logo aparece nítido e com os tamanhos adequados no header e rodapé.

## Arquivos envolvidos

- `src/assets/scaleo-logo.svg.asset.json` (novo)
- `src/components/site/Logo.tsx`
- `src/components/site/Header.tsx`
- `src/components/site/Footer.tsx`

## Não será alterado

- Design system, tipografia, paleta de cores, conteúdo textual, SEO, sitemap, favicon ou outros componentes.
