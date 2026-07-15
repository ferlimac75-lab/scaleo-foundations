const items = [
  {
    n: "01",
    title: "Fluxo de novos clientes irregular",
    body: "O crescimento oscila conforme a disposição da rede de contatos em indicar. Meses fortes seguem-se a meses inteiramente silenciosos.",
  },
  {
    n: "02",
    title: "Ausência de previsibilidade",
    body: "Sem processo, não há como projetar entradas com segurança. As decisões passam a ser tomadas com base em percepção, e não em dados.",
  },
  {
    n: "03",
    title: "Oportunidades que se perdem",
    body: "Contatos chegam, mas não há rotina de follow-up, registro ou responsável. Boa parte do potencial simplesmente se dissolve com o tempo.",
  },
  {
    n: "04",
    title: "Sobrecarga dos sócios",
    body: "Vender, atender, propor e negociar recai sobre uma ou duas pessoas. A operação técnica compete, todos os dias, com a operação comercial.",
  },
];

export function Problem() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="gold-rule" aria-hidden="true" />O cenário
          </p>
          <h2 className="mt-6 text-3xl leading-[1.15] sm:text-4xl md:text-[2.75rem]">
            A maior parte dos escritórios contábeis cresce apoiada em um único canal: a indicação.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            É um canal legítimo e valioso — mas, quando ocupa sozinho o lugar da estratégia
            comercial, produz efeitos que se acumulam ao longo do tempo.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-hairline bg-hairline md:grid-cols-2">
          {items.map((item) => (
            <article key={item.n} className="bg-paper p-8 md:p-10">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-2xl text-gold">{item.n}</span>
                <h3 className="text-xl leading-tight">{item.title}</h3>
              </div>
              <p className="mt-4 text-[0.975rem] leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
