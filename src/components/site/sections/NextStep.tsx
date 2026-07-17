function openDevolutiva() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("scaleo:start-diagnostic"));
}

export function NextStep() {
  return (
    <section
      id="proximo-passo"
      className="relative overflow-hidden bg-navy py-20 text-paper md:py-24"
    >
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow" style={{ color: "color-mix(in oklab, white 60%, transparent)" }}>
            <span className="gold-rule mr-3" aria-hidden="true" />
            Próximo passo
          </p>
          <h2 className="mt-6 font-serif text-3xl leading-[1.15] text-paper sm:text-4xl md:text-5xl">
            Vamos analisar o seu diagnóstico.
          </h2>

          <div
            className="mt-8 space-y-5 text-base leading-relaxed"
            style={{ color: "color-mix(in oklab, white 78%, transparent)" }}
          >
            <p>
              O diagnóstico oferece uma visão inicial da estrutura comercial do seu escritório. Na
              conversa, interpretaremos os resultados, esclareceremos dúvidas e discutiremos quais
              prioridades fazem mais sentido para a realidade da sua empresa.
            </p>
            <p>
              Sem apresentação comercial. Sem roteiros prontos. Apenas uma conversa consultiva
              baseada no seu diagnóstico.
            </p>
          </div>

          <p className="mt-10 text-sm uppercase tracking-[0.18em] text-gold">
            Durante essa conversa, vamos:
          </p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed">
            {[
              "Interpretar os resultados do diagnóstico.",
              "Identificar prioridades e oportunidades.",
              "Discutir possíveis caminhos para evoluir a estrutura comercial.",
              "Avaliar se faz sentido continuar esse trabalho em conjunto.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-px w-4 shrink-0 bg-gold" aria-hidden="true" />
                <span style={{ color: "color-mix(in oklab, white 85%, transparent)" }}>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <button
              type="button"
              onClick={openDevolutiva}
              className="inline-flex items-center rounded-full bg-paper px-8 py-4 text-sm font-medium text-navy transition-colors hover:bg-gold-soft"
            >
              Solicitar Reunião de Devolutiva
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
