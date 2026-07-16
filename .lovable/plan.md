
# Refatoração da Landing Page — Jornada Consultiva com Diagnóstico ALEM

Refatoração de experiência, sem recriação. Preservo layout, identidade visual, tipografia, cores, componentes, responsividade, SEO, performance e a arquitetura React/TanStack Start atual. Apenas ajusto ordem de seções, copy, e adiciono a nova experiência de Diagnóstico inline.

## 1. Nova ordem de seções (`src/routes/index.tsx`)

Reordenar os componentes já existentes e adicionar duas novas seções (Método ALEM e Diagnóstico interativo). `WhyItHappens` e `WhatWillBeStructured` sairão da home (mantidos no repositório, sem uso, para não perder conteúdo).

Sequência final dentro de `<main>`:

1. `Hero`
2. `Problem` (O Problema)
3. `Calculator` (Reflexão)
4. `About` (A Solução Scaleo) — reaproveita seção existente
5. `MethodAlem` (novo)
6. `Diagnostic` (Diagnóstico de Maturidade Comercial — reconstruído inline)
7. `HowItWorks` (Como Funciona)
8. `FinalCta`
9. `Footer`

O bloco “Resultado + Recomendação Scaleo” fica dentro da própria seção `Diagnostic` (é a etapa final da experiência interativa), evitando duplicação.

## 2. Ajustes por seção

### Hero
- Manter estrutura. Pequenos ajustes de copy no eyebrow/subhead para tom mais consultivo (sem alterar layout, imagem ou CTA principal). Trocar destino do link secundário “Como trabalhamos” para `#como-funciona` (segue existindo mais abaixo). CTA principal continua apontando para `#diagnostico`.

### O Problema (`Problem.tsx`)
- Manter 4 blocos. Revisar apenas redação para reforçar o tom consultivo (sem gatilhos de venda). Sem mudanças estruturais.

### Calculadora (`Calculator.tsx`)
- Mover para logo após “O Problema”.
- Novo título: “Qual é o potencial comercial do seu escritório?”
- Subtítulo reescrito para posicionar como ferramenta de reflexão, não financeira.
- Manter sliders e cálculo atuais; apenas ajustar textos e o rótulo do resultado (“Potencial recorrente para reflexão”).

### A Solução Scaleo (`About.tsx`)
- Reaproveitar a seção existente. Reescrever textos com tom consultivo; remover qualquer linguagem promocional. Sem alterações visuais.

### Método ALEM (novo — `sections/MethodAlem.tsx`)
- Layout limpo e curto, alinhado ao design system (container-page, eyebrow, gold-rule, tipografia serif dos títulos).
- Título: “Nossa forma de estruturar operações comerciais”.
- Texto introdutório conforme briefing.
- Quatro pilares (letra + nome + texto curto + ícone `lucide-react` discreto):
  - A — Analisar
  - L — Liberar Oportunidades
  - E — Estruturar Crescimento
  - M — Monitorar Resultados
- Encerramento com o parágrafo do briefing e botão “Iniciar Diagnóstico” que dispara a experiência de diagnóstico (scroll suave + expand da seção `#diagnostico`).

### Diagnóstico de Maturidade Comercial (`Diagnostic.tsx` reconstruído)

Toda a experiência acontece dentro da própria seção, sem modal/popup/iframe/rota nova.

Estados internos (React `useState`):
- `phase`: `"idle" | "active" | "processing" | "result"`
- `stepIndex`, `answers`, `otherText`, `resultReveal` (para revelação em 3 etapas).

Transição ao iniciar:
- Ao clicar em “Iniciar Diagnóstico” (no ALEM ou no Hero), um handler compartilhado (via `window.dispatchEvent(new CustomEvent('scaleo:start-diagnostic'))` ouvido pelo `Diagnostic`) faz:
  - `scrollIntoView({ behavior: 'smooth' })` até `#diagnostico`;
  - seta `phase="active"`;
  - Aplica classe no `<body>` `diagnostic-active` (via `useEffect`) que:
    - reduz opacidade das demais seções (`main > section:not(#diagnostico) { opacity: .25; transition: opacity 300ms }`),
    - esconde o menu do `Header` (Header lê a classe ou escuta o evento e oculta nav/CTA).
  - Seção do diagnóstico ganha `min-h-[90vh]` e um `sticky`/`fixed`-like framing (usando `min-h-screen` + centralização), com transição de 300–500 ms via Tailwind (`transition-all duration-500`).

Interface interna:
- Cabeçalho: “Diagnóstico de Maturidade Comercial” + subtítulo. Linha secundária: “Baseado no Método ALEM · 3 a 5 minutos”.
- Barra de progresso: “Pergunta X de Y”, barra fina (bg-hairline / bg-navy), percentual.
- Uma pergunta por vez, centralizada, muito espaço em branco, sem aparência de formulário.
- 4 alternativas por pergunta: “Alternativa A / B / C / Outro”. Clique avança automaticamente. Se “Outro”, exibe campo de texto opcional antes de avançar (com botão “Continuar”).
- Botão discreto “← Voltar” apenas quando `stepIndex > 0`.

Perguntas (12 no total — 3 por pilar do ALEM, mapeadas internamente; o usuário não vê a divisão). O array `questions` mora no próprio arquivo do componente para manter escopo local; cada item guarda `{ pillar, prompt, options: [A,B,C] }` onde A=alto, B=médio, C=baixo (pesos 3/2/1; “Outro” = 0).

Cálculo:
- Score por pilar = soma dos pesos / máximo possível, 0–100%.
- Nível geral (média dos 4): `≥75` “Estrutura Comercial Consolidada”; `50–74` “Estrutura Comercial em Desenvolvimento”; `25–49` “Estrutura Comercial Inicial”; `<25` “Operação Comercial Ainda Não Estruturada”. Sem número exibido.

Finalização:
- Ao responder a última pergunta → `phase="processing"` por ~800 ms, com mensagem “Preparando seu diagnóstico…” e animação sutil (spinner minimalista ou barra pulsante em tons do design system).

Apresentação do resultado (3 etapas com pequenas transições):
1. “Seu Diagnóstico” + “Nível de Maturidade Comercial: {nível}”.
2. Quatro barras horizontais dos pilares ALEM (Analisar / Liberar Oportunidades / Estruturar Crescimento / Monitorar Resultados), animando o `width` de 0 → % com `transition-[width] duration-700`. Cores institucionais existentes (`navy`, `gold`).
3. “Recomendação Scaleo” — texto dinâmico montado a partir do nível geral + pilar mais fraco (cenário, prioridades, oportunidades, próximos passos). Tom consultivo, sem linguagem comercial.

CTA final do resultado:
- Título “Vamos aprofundar este diagnóstico?”, texto do briefing.
- Botão “Solicitar Reunião de Devolutiva” → abre o formulário de contato já existente. O formulário atual vive dentro do próprio `Diagnostic.tsx`; será extraído para `sections/DevolutivaForm.tsx` e exibido ao clicar (dentro da mesma seção, abaixo do resultado, com scroll suave). Todo o comportamento do form (estado, validação, mensagem de confirmação) é preservado.
- Link secundário “Voltar à página” → restaura opacidade das demais seções, recolhe a seção (min-h volta ao normal), mantém scroll em `#diagnostico`, remove classe do body, restaura menu. Estado das respostas preservado.

### Como Funciona (`HowItWorks.tsx`)
- Mover para depois do Diagnóstico. Manter 4 etapas (Diagnóstico, Plano de ação, Implantação, Acompanhamento). Ajustar textos (“Estruturação” → “Plano de ação”) e revisar redação. Sem mudanças visuais.

### CTA Final e Rodapé
- Sem alterações estruturais. Pequena revisão de copy no `FinalCta` se necessário.

### Menu (`Header.tsx`)
- Atualizar `links` para: Início (`#inicio`), Problema (`#problema`), Método ALEM (`#metodo-alem`), Diagnóstico (`#diagnostico`), Como Funciona (`#como-funciona`), Contato (`#contato`).
- Adicionar `id="problema"` em `Problem`, `id="metodo-alem"` em `MethodAlem`, `id="diagnostico"` na seção `Diagnostic`. `#inicio`, `#como-funciona` e `#contato` já existem.
- Header escuta o evento `scaleo:start-diagnostic` / lê a classe `diagnostic-active` no body e oculta nav e CTA durante o diagnóstico (fade suave), restaurando ao sair.

## 3. Preservação

- Não altero design system (`src/styles.css`), tokens de cor, fontes, componentes shadcn, imagens do hero/diagnóstico/processo, favicon, sitemap ou meta tags SEO.
- Não altero tecnologia: continua TanStack Start + Tailwind v4.
- Não crio novas rotas nem backend. Nada persiste — o diagnóstico roda 100% no cliente.
- Sem novas dependências (ícones vêm do `lucide-react` já presente).

## Detalhes técnicos

- Arquivos criados:
  - `src/components/site/sections/MethodAlem.tsx`
  - `src/components/site/sections/DevolutivaForm.tsx` (extraído do `Diagnostic` atual)
- Arquivos editados:
  - `src/routes/index.tsx` — nova ordem e import do `MethodAlem`; remoção de `WhyItHappens` e `WhatWillBeStructured` da home.
  - `src/components/site/Header.tsx` — novos links, ocultar durante diagnóstico.
  - `src/components/site/sections/Hero.tsx` — copy fina, link secundário.
  - `src/components/site/sections/Problem.tsx` — copy + `id="problema"`.
  - `src/components/site/sections/Calculator.tsx` — título/subtítulo/labels.
  - `src/components/site/sections/About.tsx` — copy consultivo.
  - `src/components/site/sections/HowItWorks.tsx` — copy e nomes das 4 etapas.
  - `src/components/site/sections/Diagnostic.tsx` — reconstruído como experiência interativa (fluxo idle → active → processing → result → devolutiva).
- Coordenação de estado global mínima entre `MethodAlem`/`Hero`/`Header`/`Diagnostic` via `CustomEvent` no `window` (`scaleo:start-diagnostic`, `scaleo:end-diagnostic`) + classe `diagnostic-active` no `<body>`. Evita adicionar Context/estado global.
- Acessibilidade: `aria-live="polite"` no cabeçalho da pergunta e no bloco de processamento; foco enviado para o botão de resposta atual ao trocar de pergunta; `prefers-reduced-motion` respeitado (transições reduzidas para 0 ms).
- Verificação: `bun run build` após implementação; smoke test visual via Playwright do fluxo (iniciar → responder 12 → processamento → resultado → devolutiva → voltar).

## Fora de escopo

- Persistência das respostas, envio para backend, analytics de diagnóstico.
- Redesign de qualquer componente existente.
- Alterações em `WhyItHappens`/`WhatWillBeStructured` (ficam disponíveis no repositório, sem uso na home).
