import portrait from "@/assets/fernando-portrait.jpg";

export function About() {
  return (
    <section id="sobre" className="bg-paper py-24 md:py-32">
      <div className="container-page grid gap-14 md:grid-cols-12 md:items-center">
        <figure className="md:col-span-5">
          <img
            src={portrait}
            alt="Retrato de Fernando Campos, consultor responsável pela Scaleo."
            width={1008}
            height={1200}
            loading="lazy"
            className="w-full rounded-sm object-cover"
          />
        </figure>

        <div className="md:col-span-7 md:pl-6">
          <p className="eyebrow flex items-center gap-3">
            <span className="gold-rule" aria-hidden="true" />
            Sobre o consultor
          </p>
          <h2 className="mt-6 text-3xl leading-[1.15] sm:text-4xl">Fernando Campos</h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink">
            <p>
              Fernando conduz pessoalmente os projetos da Scaleo. Sua atuação é consultiva, próxima
              e direta, sempre em contato com os sócios e com a equipe envolvida na operação
              comercial do escritório.
            </p>
            <p className="text-muted-foreground">
              Acredita que consultoria não se faz à distância nem por meio de modelos padronizados.
              Cada escritório tem uma história, um ritmo e uma cultura — e é a partir daí que o
              trabalho começa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
