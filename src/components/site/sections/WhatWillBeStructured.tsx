const items = [
  { title: "Processo comercial", body: "Etapas do primeiro contato ao fechamento, com critérios de avanço." },
  { title: "Funil", body: "Modelo próprio, adaptado à realidade dos serviços contábeis." },
  { title: "CRM", body: "Definição da ferramenta e configuração das rotinas essenciais." },
  { title: "Rotinas", body: "Cadência de contatos, reuniões internas e revisão de oportunidades." },
  { title: "Follow-up", body: "Padronização das interações após propostas e primeiras conversas." },
  { title: "Parcerias", body: "Estruturação de canais de indicação de forma organizada e recorrente." },
  { title: "Indicadores", body: "Poucos indicadores, escolhidos com critério, para leitura clara." },
  { title: "Documentação", body: "Materiais internos que sustentam o processo além das pessoas." },
  { title: "Papéis", body: "Responsabilidades definidas para cada etapa do processo." },
  { title: "Organização", body: "Governança comercial simples, revisada em ciclos consistentes." },
];

export function WhatWillBeStructured() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="gold-rule" aria-hidden="true" />O que será estruturado
          </p>
          <h2 className="mt-6 text-3xl leading-[1.15] sm:text-4xl md:text-[2.75rem]">
            Os elementos que compõem uma operação comercial organizada.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Nem tudo precisa ser complexo. Boa parte do que falta em escritórios
            contábeis é organização consistente do que já existe. Estes são os
            elementos que estruturamos durante o trabalho.
          </p>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-sm border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-5">
          {items.map((it) => (
            <li key={it.title} className="bg-background p-6">
              <p className="font-serif text-base text-navy">{it.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {it.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
