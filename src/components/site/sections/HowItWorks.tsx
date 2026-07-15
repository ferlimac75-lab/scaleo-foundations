import processImg from "@/assets/section-process.jpg";

const steps = [
  {
    n: "I",
    title: "Diagnóstico",
    body: "Compreendemos a operação atual do escritório: canais de entrada, gargalos, rotinas, papéis e capacidade de conversão.",
  },
  {
    n: "II",
    title: "Estruturação",
    body: "Desenhamos o processo comercial adequado à realidade da equipe, com etapas claras, documentação e critérios objetivos.",
  },
  {
    n: "III",
    title: "Implantação",
    body: "Acompanhamos a implementação junto ao time, ajustando o desenho conforme a operação real do dia a dia.",
  },
  {
    n: "IV",
    title: "Acompanhamento",
    body: "Revisões periódicas para consolidar a rotina, corrigir desvios e evoluir os indicadores ao longo do tempo.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-paper py-24 md:py-32">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow flex items-center gap-3">
              <span className="gold-rule" aria-hidden="true" />
              Como trabalhamos
            </p>
            <h2 className="mt-6 text-3xl leading-[1.15] sm:text-4xl md:text-[2.75rem]">
              Quatro etapas. Uma sequência clara.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:col-span-5">
            O trabalho segue uma lógica consultiva, respeitando o ritmo e as particularidades do
            escritório. Não há receita pronta. Há método.
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <figure className="md:col-span-5">
            <img
              src={processImg}
              alt="Equipe revisando processos e diagramas comerciais impressos sobre uma mesa branca."
              width={1408}
              height={1008}
              loading="lazy"
              className="w-full rounded-sm object-cover"
            />
          </figure>

          <ol className="md:col-span-7">
            {steps.map((s, i) => (
              <li
                key={s.n}
                className={`grid grid-cols-[auto_1fr] gap-6 py-7 ${
                  i !== steps.length - 1 ? "border-b border-hairline" : ""
                }`}
              >
                <span className="pt-1 font-serif text-lg text-gold">{s.n}</span>
                <div>
                  <h3 className="text-xl">{s.title}</h3>
                  <p className="mt-2 text-[0.975rem] leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
