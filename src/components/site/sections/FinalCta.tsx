export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-paper md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow" style={{ color: "color-mix(in oklab, white 60%, transparent)" }}>
            <span className="gold-rule mr-3" aria-hidden="true" />
            Uma conversa
          </p>
          <h2 className="mt-6 font-serif text-3xl leading-[1.15] text-paper sm:text-4xl md:text-5xl">
            Se faz sentido para o seu escritório, começamos por uma conversa.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed" style={{ color: "color-mix(in oklab, white 75%, transparent)" }}>
            Sem apresentação comercial, sem material de venda. Apenas uma
            leitura honesta sobre onde a operação está e o que faria diferença
            no próximo passo.
          </p>
          <div className="mt-10">
            <a
              href="#diagnostico"
              className="inline-flex items-center rounded-full bg-paper px-8 py-4 text-sm font-medium text-navy transition-colors hover:bg-gold-soft"
            >
              Agendar conversa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
