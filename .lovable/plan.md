## Objetivo

Trocar o wordmark tipográfico provisório pela logo oficial da Scaleo e configurar o favicon usando o ícone A dourado, dobrando o tamanho em relação ao convencional.

## Passos

1. **Subir os arquivos como Lovable Assets** (evita binários no repositório):
   - `scaleo-header-positiva.png` → `src/assets/scaleo-header-positiva.png.asset.json`
   - `Favicon_A.png` → `public/favicon-a.png` (favicon precisa ser servido por caminho estável, então vai em `public/`)

2. **Componente `Logo` (`src/components/site/Logo.tsx`)**
   - Remover o wordmark tipográfico atual (`scaleo.`).
   - Renderizar `<img>` apontando para a logo oficial.
   - Altura padrão maior no header (≈ 40px em mobile, ≈ 48px em desktop) preservando proporção — sem sombra, sem efeito, sem alteração de cor.
   - `alt="Scaleo — Estrutura | Processo | Crescimento"`.
   - Manter área de respiro adequada no header (padding vertical já existente).

3. **Footer**
   - Continua usando o mesmo componente `Logo`, apenas com uma altura um pouco maior (≈ 44px) — nenhum tratamento adicional na imagem.

4. **Favicon (`src/routes/__root.tsx`)**
   - Substituir `{ rel: "icon", href: "/favicon.ico" }` por:
     - `{ rel: "icon", type: "image/png", sizes: "64x64", href: "/favicon-a.png" }`
     - `{ rel: "apple-touch-icon", href: "/favicon-a.png" }`
   - Usar 64×64 (dobro dos 32×32 convencionais) para melhorar legibilidade nas abas — o próprio PNG é quadrado com bom espaço de respiro, sem borda/glow/sombra.
   - Remover `public/favicon.ico` padrão para não servir o ícone Lovable a crawlers.

5. **Verificação**
   - Confirmar visualmente: logo aparece limpa no header (sem borrão, com respiro) e o favicon dourado aparece nítido e maior na aba do navegador.

## Detalhes técnicos

- Header transparente no topo → logo positiva (fundo escuro do CTA final não recebe a logo, então não é necessária versão negativa).
- Nenhuma alteração no design system, tipografia ou paleta.
- Sem alterações nas outras seções.
