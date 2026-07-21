## Auditoria — o que está realmente em uso

Renderizado hoje via `src/routes/index.tsx`: `Header`, `Footer`, `Hero`, `Problem`, `WhyItHappens`, `Calculator`, `MethodAlem`, `Diagnostic` (que usa `WhatsAppContact`), `NextStep`.

Assets efetivamente referenciados:
- `Logo.tsx` (header) → `scaleo-logotipo-gemini-photoroom.png`
- `Footer.tsx` → `scaleo-header-positiva.png`
- `Hero.tsx` → `hero-consulting.jpg`
- `__root.tsx` (favicon) → `public/favicon-a.png`

## Observação importante sobre os logos

Os logos hoje são pointers `.asset.json` que apontam para `/__l5e/assets-v1/...` (CDN do Lovable Assets). Você pediu explicitamente para **não** usar esses caminhos e ter os arquivos fisicamente no repositório.

Plano: baixar os 2 binários realmente usados a partir da CDN atual, gravá-los em `src/assets/` como PNGs de verdade, trocar os imports para importar o `.png` diretamente e apagar os pointers `.asset.json`. As dimensões/proporções em tela ficam idênticas (nenhuma classe CSS muda).

Nomes definitivos propostos:
- Header: `src/assets/scaleo-logo.png` (origem: `scaleo-logotipo-gemini-photoroom.png`)
- Footer: `src/assets/scaleo-logo-footer.png` (origem: `scaleo-header-positiva.png`)

## Arquivos a remover (comprovadamente não referenciados)

Componentes órfãos:
- `src/components/site/sections/About.tsx`
- `src/components/site/sections/HowItWorks.tsx`
- `src/components/site/sections/WhatWillBeStructured.tsx`
- `src/components/site/sections/DevolutivaForm.tsx`
- `src/components/site/sections/FinalCta.tsx`

Assets (pointers `.asset.json`) de logos antigos, não referenciados:
- `scaleo-logo-header.png.asset.json`
- `scaleo-logo-vector.svg.asset.json`
- `scaleo-logo.svg.asset.json`
- `scaleo-logotipo-gemini.png.asset.json` (versão sem photoroom)
- `scaleo-logotipo-positivo-recortado-64pct.png.asset.json`
- `scaleo-logotipo-transparente-recortado.png.asset.json`

Assets substituídos por arquivos físicos (após a migração acima):
- `scaleo-logotipo-gemini-photoroom.png.asset.json` (via CDN `lovable-assets delete`)
- `scaleo-header-positiva.png.asset.json` (via CDN `lovable-assets delete`)

Imagens de seções órfãs em `src/assets/`:
- `fernando-portrait.jpg` (usado só em `About`)
- `section-process.jpg` (usado só em `HowItWorks`)
- `section-diagnostic.jpg` (sem nenhuma referência)

Duplicatas em `public/`:
- `public/scaleo-logo.png`
- `public/scaleo-logo-nova.png`

Mantidos em `public/`: `favicon-a.png`, `robots.txt`.

## Arquivos a manter (em uso)

- `src/assets/hero-consulting.jpg`
- `src/assets/scaleo-logo.png` (novo, físico — header)
- `src/assets/scaleo-logo-footer.png` (novo, físico — footer)
- `public/favicon-a.png`, `public/robots.txt`
- Todos os componentes/seções listados no início

## Passos de execução

1. Baixar os 2 binários da CDN atual (`curl` sobre a URL do `.asset.json`) e salvar em `src/assets/` com os nomes finais.
2. Editar `src/components/site/Logo.tsx` — trocar `import ... .asset.json` por `import logo from "@/assets/scaleo-logo.png"` e usar `src={logo}`. Nenhuma alteração de classe/tamanho.
3. Editar `src/components/site/Footer.tsx` — mesma troca para `scaleo-logo-footer.png`. Nenhuma alteração visual.
4. Deletar os componentes órfãos e os assets/pointers listados acima. Usar `lovable-assets delete --file …` para os 2 pointers cujo binário agora vive no repo (evita órfão na CDN).
5. Rodar `bun run build` para confirmar que nada quebrou. Inspecionar visualmente header, footer, hero e favicon.

## Fora do escopo

Sem alterações em textos, cores, tipografia, espaçamentos, breakpoints, animações, lógica do diagnóstico, ou qualquer outro comportamento. Nenhum redesign.
