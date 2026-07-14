Plano de ajustes no site institucional da Scaleo.

## Escopo
Ajustes pontuais de conteúdo, tamanho do logo e remoção da seção "Sobre o consultor", mantendo o design system, tipografia e paleta existentes.

## Alterações

### 1. Header — logo maior, dentro da altura do header
- Aumentar a altura do componente `Logo` quando usado no `Header` (de `h-10 md:h-12` para algo como `h-12 md:h-14`), garantindo que ainda caiba confortavelmente dentro do `h-20` do header.
- Manter o componente `Logo` reutilizável, passando a classe de altura por prop.

### 2. Footer — ajuste de texto
- Remover o início da frase descritiva: "Consultoria especializada em".
- O texto passa a começar diretamente em: "Estruturação comercial para escritórios contábeis. Processos claros, adaptados à realidade da sua operação."

### 3. Hero — eyebrow e subtítulo
- Trocar eyebrow de "Consultoria para escritórios contábeis" para "Estruturação Comercial para Escritórios Contábeis".
- Trocar subtítulo para: "Ajudamos escritórios a organizar sua operação comercial de forma simples, consistente e compatível com a realidade do negócio. Menos dependência de indicações, mais previsibilidade."

### 4. Como trabalhamos — título e descrição
- Trocar título de "Quatro etapas conduzidas de forma consultiva, no ritmo do escritório." para "Quatro etapas. Uma sequência clara."
- Trocar descrição para: "O trabalho segue uma lógica consultiva, respeitando o ritmo e as particularidades do escritório. Não há receita pronta. Há método."

### 5. O que será estruturado — descrição
- Trocar descrição para: "Nem tudo precisa ser complexo. Boa parte do que falta em escritórios contábeis é organização consistente do que já existe. Estes são os elementos que estruturamos durante o trabalho."

### 6. Diagnóstico Comercial — título e descrição
- Remover "sem custo" do título principal.
- Trocar parágrafo descritivo para: "O diagnóstico é uma reunião de escuta e observação. O objetivo não é apresentar uma proposta. É compreender a operação comercial atual e devolver uma leitura clara sobre o que pode ser organizado."

### 7. Remoção da seção "Sobre o consultor"
- Remover importação e uso do componente `About` em `src/routes/index.tsx`.
- Remover o link "Sobre" do menu do `Header`.
- Remover o link "Sobre o consultor" do `Footer`.
- Opcionalmente, manter o arquivo `About.tsx` sem referência (não excluir, apenas desvincular da rota).

## Arquivos envolvidos
- `src/components/site/Header.tsx`
- `src/components/site/Footer.tsx`
- `src/components/site/sections/Hero.tsx`
- `src/components/site/sections/HowItWorks.tsx`
- `src/components/site/sections/WhatWillBeStructured.tsx`
- `src/components/site/sections/Diagnostic.tsx`
- `src/routes/index.tsx`

## Não será alterado
- Design system, tipografia, paleta de cores, imagens, SEO, sitemap, favicon ou componentes não listados.