import heroImg from "@/assets/hero-consulting.jpg";

export function Hero() {
  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container-page grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-6 lg:col-span-6">
          <p className="eyebrow flex items-center gap-3">
            <span className="gold-rule" aria-hidden="true" />
            Estruturação Comercial para Escritórios Contábeis
          </p>
          <h1 className="mt-6 text-4xl leading-[1.05] text-ink sm:text-5xl md:text-6xl">
            Estruturamos a área comercial do seu escritório contábil.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Ajudamos escritórios a organizar sua operação comercial de forma simples, consistente e
            compatível com a realidade do negócio. Menos dependência de indicações, mais
            previsibilidade.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#diagnostico"
              className="inline-flex items-center rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-ink"
            >
              Iniciar diagnóstico
            </a>
            <a
              href="#como-funciona"
              className="text-sm font-medium text-navy underline-offset-4 hover:underline"
            >
              Como trabalhamos →
            </a>
          </div>
        </div>

        <div className="md:col-span-6 lg:col-span-6">
          <figure className="relative">
            <div
              className="absolute -left-4 -top-4 hidden h-24 w-24 border-l border-t border-gold md:block"
              aria-hidden="true"
            />
            <img
              src={heroImg}
              alt="Consultor conversando com sócio de um escritório contábil em uma reunião de diagnóstico."
              width={1600}
              height={1200}
              className="relative w-full rounded-sm object-cover shadow-elevated"
              fetchPriority="high"
            />
            <div
              className="absolute -bottom-4 -right-4 hidden h-24 w-24 border-b border-r border-gold md:block"
              aria-hidden="true"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
