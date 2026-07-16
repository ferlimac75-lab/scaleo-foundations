import { Search, KeyRound, LayoutGrid, LineChart } from "lucide-react";

const pillars = [
  {
    letter: "A",
    name: "Analisar",
    body: "Compreender a operação comercial atual, os canais de entrada, as rotinas e a capacidade real de conversão do escritório.",
    Icon: Search,
  },
  {
    letter: "L",
    name: "Liberar Oportunidades",
    body: "Identificar o que está preso em gargalos silenciosos — contatos sem retorno, propostas sem follow-up, indicações não trabalhadas.",
    Icon: KeyRound,
  },
  {
    letter: "E",
    name: "Estruturar Crescimento",
    body: "Desenhar processo, papéis, funil e rotinas coerentes com a realidade do escritório, sem importar modelos genéricos.",
    Icon: LayoutGrid,
  },
  {
    letter: "M",
    name: "Monitorar Resultados",
    body: "Estabelecer indicadores claros e ciclos de revisão que sustentam a evolução comercial ao longo do tempo.",
    Icon: LineChart,
  },
];

function startDiagnostic() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("scaleo:start-diagnostic"));
}

export function MethodAlem() {
  return (
    <section id="metodo-alem" className="py-24 md:py-32">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="gold-rule" aria-hidden="true" />
            Método ALEM
          </p>
          <h2 className="mt-6 text-3xl leading-[1.15] sm:text-4xl md:text-[2.5rem]">
            Nossa forma de estruturar operações comerciais.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Toda a atuação da Scaleo é organizada pelo Método ALEM, uma estrutura que orienta o
            diagnóstico, a implantação e o acompanhamento da evolução comercial dos escritórios
            contábeis.
          </p>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-sm border border-hairline bg-hairline md:grid-cols-2">
          {pillars.map(({ letter, name, body, Icon }) => (
            <li key={letter} className="flex flex-col bg-background p-8 md:p-10">
              <div className="flex items-center gap-4">
                <span className="font-serif text-3xl text-gold">{letter}</span>
                <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-xl">{name}</h3>
              <p className="mt-3 text-[0.975rem] leading-relaxed text-muted-foreground">{body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 max-w-2xl">
          <p className="text-base leading-relaxed text-ink">
            Toda metodologia só faz sentido quando aplicada à realidade do seu escritório. Descubra
            como sua empresa está posicionada em cada etapa do Método ALEM.
          </p>
          <button
            type="button"
            onClick={startDiagnostic}
            className="mt-8 inline-flex items-center rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-ink"
          >
            Iniciar Diagnóstico
          </button>
        </div>
      </div>
    </section>
  );
}
