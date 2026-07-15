export function WhyItHappens() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow flex items-center gap-3">
            <span className="gold-rule" aria-hidden="true" />
            Por que isso acontece
          </p>
          <h2 className="mt-6 text-3xl leading-[1.15] sm:text-4xl">
            A formação do contador é técnica — e o mercado, por muito tempo, não exigiu que fosse
            diferente.
          </h2>
        </div>

        <div className="space-y-8 md:col-span-7 md:pl-8">
          <p className="text-lg leading-relaxed text-ink">
            A profissão foi construída sobre rigor técnico, prazo e confiabilidade. A área comercial
            nunca fez parte do currículo, e durante muitos anos a demanda espontânea foi suficiente
            para sustentar o crescimento.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            O contexto mudou. A concorrência aumentou, a tecnologia reposicionou o valor percebido
            de vários serviços e o cliente passou a comparar propostas com mais critério. A operação
            técnica continua sólida, mas a operação comercial, na maior parte dos escritórios, ainda
            não existe de forma organizada.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Não se trata de falta de esforço nem de vontade. Trata-se de ausência de estrutura. E
            estrutura se constrói.
          </p>
        </div>
      </div>
    </section>
  );
}
