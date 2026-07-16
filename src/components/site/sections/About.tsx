import portrait from "@/assets/fernando-portrait.jpg";

export function About() {
  return (
    <section id="sobre" className="bg-paper py-24 md:py-32">
      <div className="container-page grid gap-14 md:grid-cols-12 md:items-center">
        <figure className="md:col-span-5">
          <img
            src={portrait}
            alt="Fernando Campos, consultor responsável pela Scaleo, em uma reunião de trabalho."
            width={1008}
            height={1200}
            loading="lazy"
            className="w-full rounded-sm object-cover"
          />
        </figure>

        <div className="md:col-span-7 md:pl-6">
          <p className="eyebrow flex items-center gap-3">
            <span className="gold-rule" aria-hidden="true" />
            A Solução Scaleo
          </p>
          <h2 className="mt-6 text-3xl leading-[1.15] sm:text-4xl">
            Uma abordagem consultiva, próxima e adaptada à realidade de cada escritório.
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink">
            <p>
              A Scaleo estrutura a operação comercial de escritórios contábeis por meio de um
              acompanhamento consultivo conduzido diretamente por Fernando Campos, em contato
              próximo com os sócios e a equipe envolvida.
            </p>
            <p className="text-muted-foreground">
              Não trabalhamos com modelos prontos nem com receitas replicadas. Cada escritório tem
              uma história, um ritmo e uma cultura — e é a partir desse contexto que o desenho da
              operação comercial é construído.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
