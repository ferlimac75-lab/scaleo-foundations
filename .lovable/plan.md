## Alterações

### 1. Hero (`src/components/site/sections/Hero.tsx`)
- Remover os dois CTAs abaixo do parágrafo: botão "Iniciar diagnóstico" e link "Como trabalhamos →" (bloco inteiro `mt-10 flex ...`).
- Reduzir o padding vertical de `pt-32 pb-20 md:pt-40 md:pb-28` para `pt-28 pb-12 md:pt-32 md:pb-16`.

### 2. Ordem das seções (`src/routes/index.tsx`)
Nova sequência dentro de `<main>`:
1. `Hero`
2. `Problem` (O cenário) — já vem logo após o Hero
3. `WhyItHappens` (reintroduzida — já existe em `src/components/site/sections/WhyItHappens.tsx`)
4. `Calculator`
5. `MethodAlem`
6. `Diagnostic`
7. `NextStep` (nova, substitui `FinalCta`)

Remover imports/usos de `About`, `HowItWorks` e `FinalCta`.

### 3. Reduzir espaçamento vertical entre seções
Diminuir o padding de todas as seções da home de `py-24 md:py-32` para `py-16 md:py-20`:
- `Problem.tsx`
- `WhyItHappens.tsx`
- `Calculator.tsx` (verificar valor atual e ajustar)
- `MethodAlem.tsx`
- `Diagnostic.tsx` (idle state)

### 4. Nova seção `NextStep` (`src/components/site/sections/NextStep.tsx`)
Substitui `FinalCta`. Mantém o visual escuro (bg-navy, texto paper) e a arquitetura do `FinalCta` atual, ajustando o conteúdo:

- Eyebrow: "Próximo passo"
- Título (h2): "Vamos analisar o seu diagnóstico."
- Parágrafo 1: "O diagnóstico oferece uma visão inicial da estrutura comercial do seu escritório. Na conversa, interpretaremos os resultados, esclareceremos dúvidas e discutiremos quais prioridades fazem mais sentido para a realidade da sua empresa."
- Parágrafo 2: "Sem apresentação comercial. Sem roteiros prontos. Apenas uma conversa consultiva baseada no seu diagnóstico."
- Subtítulo: "Durante essa conversa, vamos:"
- Lista (4 itens, com marcador em `text-gold`):
  - Interpretar os resultados do diagnóstico.
  - Identificar prioridades e oportunidades.
  - Discutir possíveis caminhos para evoluir a estrutura comercial.
  - Avaliar se faz sentido continuar esse trabalho em conjunto.
- Botão: "Solicitar Reunião de Devolutiva" — dispara o mesmo evento que abre o formulário de devolutiva já existente (`scaleo:start-diagnostic` + rolar até o form, ou reutilizar o comportamento do CTA final do Diagnostic). Aciona `window.dispatchEvent(new CustomEvent("scaleo:open-devolutiva"))` e o `Diagnostic` passa a escutar esse evento para abrir/rolar até o `DevolutivaForm` diretamente (sem precisar refazer o diagnóstico). Se essa integração exigir mais lógica no `Diagnostic.tsx`, ajusto lá.

Section id: `contato` (para preservar o link do menu/footer).

### 5. Header (`src/components/site/Header.tsx`)
Novos links, na ordem:
- Método ALEM (`#metodo-alem`)
- Diagnóstico (`#diagnostico`)
- Próximo passo (`#contato`)
- Contato (`#contato` — mantém, aponta para o rodapé/próximo passo)

Remover: Início, Problema, Como Funciona e o botão "Agendar conversa" (desktop e mobile).

### 6. Footer (`src/components/site/Footer.tsx`)
- Remover o item de LinkedIn da lista "Contato".
- Remover o link "Como trabalhamos" da coluna "Institucional" (a seção não existirá mais). Manter apenas Política de Privacidade e Termos de Uso.

### 7. Arquivos removidos do fluxo (mantidos no repo, sem uso)
- `About.tsx`, `HowItWorks.tsx`, `FinalCta.tsx` deixam de ser importados em `index.tsx`. Não serão deletados.

## Verificação
- `bun run build`
- Screenshot Playwright da home para confirmar nova ordem, espaçamentos reduzidos, header enxuto e seção "Próximo passo".
