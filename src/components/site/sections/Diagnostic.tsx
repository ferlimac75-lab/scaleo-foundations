import { useEffect, useMemo, useRef, useState } from "react";
import { WhatsAppContact } from "./WhatsAppContact";

type Pillar = "A" | "L" | "E" | "M";
type Phase = "idle" | "active" | "processing" | "result";

const pillarNames: Record<Pillar, string> = {
  A: "Analisar",
  L: "Liberar Oportunidades",
  E: "Estruturar Crescimento",
  M: "Monitorar Resultados",
};

type Question = {
  pillar: Pillar;
  prompt: string;
  options: [string, string, string]; // A alto (3), B médio (2), C baixo (1)
};

const questions: Question[] = [
  {
    pillar: "A",
    prompt: "Como o escritório acompanha os contatos comerciais que chegam?",
    options: [
      "Todo contato é registrado e revisado periodicamente em uma rotina definida.",
      "Existe algum registro, mas depende da pessoa que atendeu.",
      "Os contatos ficam dispersos entre e-mail, WhatsApp e memória da equipe.",
    ],
  },
  {
    pillar: "A",
    prompt: "Existe clareza sobre de onde vêm os novos clientes?",
    options: [
      "Sim, os canais de entrada são conhecidos e mensurados.",
      "Sabemos por percepção, sem dados consolidados.",
      "Não há visibilidade sobre a origem das oportunidades.",
    ],
  },
  {
    pillar: "A",
    prompt: "Com que frequência a operação comercial é analisada pelos sócios?",
    options: [
      "Há uma reunião recorrente para leitura dos números comerciais.",
      "Acontece pontualmente, quando algum indicador chama atenção.",
      "Raramente. O tempo dos sócios é consumido pela operação técnica.",
    ],
  },
  {
    pillar: "L",
    prompt: "Como o escritório trata as oportunidades que não avançam de imediato?",
    options: [
      "Existe uma rotina de follow-up documentada, com prazos e responsáveis.",
      "Fazemos follow-up quando lembramos ou quando o contato retorna.",
      "Sem retorno rápido, a oportunidade tende a se perder.",
    ],
  },
  {
    pillar: "L",
    prompt: "As indicações recebidas são trabalhadas de forma organizada?",
    options: [
      "Sim, cada indicação segue um fluxo claro até o desfecho.",
      "Depende de quem recebe a indicação e do momento.",
      "Muitas indicações não chegam a ser contatadas com consistência.",
    ],
  },
  {
    pillar: "L",
    prompt: "Existem propostas em aberto que não têm um responsável definido?",
    options: [
      "Não. Toda proposta tem responsável e prazo de acompanhamento.",
      "Algumas ficam sem dono claro dependendo do período.",
      "Sim, é comum propostas ficarem paradas sem ninguém acompanhando.",
    ],
  },
  {
    pillar: "E",
    prompt: "O processo comercial do escritório está desenhado e documentado?",
    options: [
      "Sim, há etapas claras, critérios de avanço e materiais de apoio.",
      "Existe um fluxo informal que a equipe segue por hábito.",
      "Cada oportunidade é conduzida do jeito de quem está atendendo.",
    ],
  },
  {
    pillar: "E",
    prompt: "Os papéis comerciais estão definidos dentro da equipe?",
    options: [
      "Sim, cada etapa tem responsável definido, independente da pessoa.",
      "Estão parcialmente definidos, com sobreposição em alguns pontos.",
      "Vender, atender e propor recai sobre uma ou duas pessoas.",
    ],
  },
  {
    pillar: "E",
    prompt: "Existe uma ferramenta (CRM ou equivalente) sustentando a operação?",
    options: [
      "Sim, com rotinas configuradas e uso consistente pela equipe.",
      "Existe, mas o uso é irregular ou parcial.",
      "Não usamos uma ferramenta específica para a área comercial.",
    ],
  },
  {
    pillar: "M",
    prompt: "Quais indicadores comerciais são acompanhados hoje?",
    options: [
      "Um conjunto pequeno e escolhido, revisado em ciclos consistentes.",
      "Alguns números são olhados esporadicamente, sem cadência definida.",
      "Não há indicadores comerciais formalmente acompanhados.",
    ],
  },
  {
    pillar: "M",
    prompt: "Como o escritório revisa o que funcionou e o que não funcionou no período?",
    options: [
      "Existem reuniões periódicas de leitura e ajuste da operação.",
      "Revisamos quando algo dá errado ou quando o resultado surpreende.",
      "Não há um momento estruturado de revisão comercial.",
    ],
  },
  {
    pillar: "M",
    prompt: "As decisões comerciais são tomadas com base em quê?",
    options: [
      "Em dados objetivos da própria operação.",
      "Em uma mistura de percepção e alguns dados disponíveis.",
      "Predominantemente em percepção e experiência dos sócios.",
    ],
  },
];

type Answer = { value: 0 | 1 | 2 | 3; otherText?: string };

const levels = [
  { min: 75, label: "Estrutura Comercial Consolidada" },
  { min: 50, label: "Estrutura Comercial em Desenvolvimento" },
  { min: 25, label: "Estrutura Comercial Inicial" },
  { min: 0, label: "Operação Comercial Ainda Não Estruturada" },
];

function levelFor(score: number) {
  return levels.find((l) => score >= l.min)!.label;
}

function recommendation(overall: number, weakest: Pillar): {
  cenario: string;
  prioridades: string;
  oportunidades: string;
  proximos: string;
} {
  const weakName = pillarNames[weakest];
  const cenario =
    overall >= 75
      ? "O escritório apresenta uma operação comercial já organizada, com rotinas e critérios claros. O trabalho agora é de refinamento e consistência, não de reconstrução."
      : overall >= 50
        ? "Existe uma base comercial em construção, com elementos organizados e outros ainda dependentes de pessoas específicas. A operação já produz resultado, mas ainda oscila."
        : overall >= 25
          ? "A operação comercial ainda é conduzida principalmente pela iniciativa dos sócios. Há esforço, mas falta estrutura que sustente o crescimento além do momento atual."
          : "A operação comercial ainda não está estruturada. O crescimento depende quase inteiramente de indicações espontâneas e da disponibilidade dos sócios.";

  const prioridades = `A prioridade imediata está no pilar ${weakest} — ${weakName}. É onde a estrutura atual do escritório oferece menos sustentação e onde uma organização pequena tende a produzir efeito rápido.`;

  const oportunidades =
    overall >= 50
      ? "Há espaço para consolidar rotinas, reduzir dependência de pessoas específicas e transformar o que hoje funciona por hábito em processo documentado."
      : "Existem oportunidades relevantes na organização de contatos, formalização do processo e definição de responsáveis por etapa — elementos que costumam devolver clareza em pouco tempo.";

  const proximos =
    "Um passo natural é uma conversa consultiva para leitura conjunta destes pontos, sem apresentação comercial, com o objetivo de traduzir o diagnóstico em prioridades concretas.";

  return { cenario, prioridades, oportunidades, proximos };
}

export function Diagnostic() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [otherDraft, setOtherDraft] = useState("");
  const [reveal, setReveal] = useState(0); // 0..3
  const [showForm, setShowForm] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const total = questions.length;

  // Body class + custom-event coordination
  useEffect(() => {
    const active = phase !== "idle";
    if (active) document.body.classList.add("diagnostic-active");
    else document.body.classList.remove("diagnostic-active");
    return () => document.body.classList.remove("diagnostic-active");
  }, [phase]);

  useEffect(() => {
    function onStart() {
      setPhase((p) => (p === "idle" ? "active" : p));
      requestAnimationFrame(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    window.addEventListener("scaleo:start-diagnostic", onStart);
    return () => window.removeEventListener("scaleo:start-diagnostic", onStart);
  }, []);

  // Processing → result reveal animation
  useEffect(() => {
    if (phase !== "processing") return;
    const t = setTimeout(() => {
      setPhase("result");
      setReveal(1);
    }, 900);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "result") return;
    if (reveal >= 3) return;
    const t = setTimeout(() => setReveal((r) => r + 1), 700);
    return () => clearTimeout(t);
  }, [phase, reveal]);

  const scores = useMemo(() => {
    const totals: Record<Pillar, { sum: number; max: number }> = {
      A: { sum: 0, max: 0 },
      L: { sum: 0, max: 0 },
      E: { sum: 0, max: 0 },
      M: { sum: 0, max: 0 },
    };
    questions.forEach((q, i) => {
      totals[q.pillar].max += 3;
      totals[q.pillar].sum += answers[i]?.value ?? 0;
    });
    const pct = (p: Pillar) => Math.round((totals[p].sum / totals[p].max) * 100);
    const per = { A: pct("A"), L: pct("L"), E: pct("E"), M: pct("M") };
    const overall = Math.round((per.A + per.L + per.E + per.M) / 4);
    const weakest = (Object.keys(per) as Pillar[]).reduce((a, b) => (per[a] <= per[b] ? a : b));
    return { per, overall, weakest };
  }, [answers]);

  function selectOption(idx: 0 | 1 | 2) {
    const value = (3 - idx) as 3 | 2 | 1;
    setAnswers((a) => ({ ...a, [stepIndex]: { value } }));
    advance();
  }

  function submitOther() {
    setAnswers((a) => ({ ...a, [stepIndex]: { value: 0, otherText: otherDraft.trim() } }));
    setOtherDraft("");
    advance();
  }

  function advance() {
    if (stepIndex + 1 >= total) {
      setPhase("processing");
    } else {
      setStepIndex((i) => i + 1);
    }
  }

  function goBack() {
    if (stepIndex === 0) return;
    setStepIndex((i) => i - 1);
    setOtherDraft("");
  }

  function exitToPage() {
    setPhase("idle");
    setShowForm(false);
    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const currentAnswer = answers[stepIndex];
  const isOther = currentAnswer?.value === 0;
  const progress = Math.round(((stepIndex + (currentAnswer ? 1 : 0)) / total) * 100);

  return (
    <section
      id="diagnostico"
      ref={sectionRef}
      className={`relative bg-background transition-all duration-500 ${
        phase === "idle" ? "py-16 md:py-20" : "min-h-[95vh] py-16 md:py-20"
      }`}
    >
      <div className="container-page">
        {phase === "idle" && <IdleIntro />}

        {(phase === "active" || phase === "processing") && (
          <div className="mx-auto max-w-3xl">
            <DiagHeader />
            {phase === "active" && (
              <>
                <Progress current={stepIndex + 1} total={total} percent={progress} />
                <QuestionBlock
                  question={questions[stepIndex]}
                  selectedValue={currentAnswer?.value}
                  isOther={!!isOther}
                  otherDraft={otherDraft}
                  onOtherChange={setOtherDraft}
                  onSelect={selectOption}
                  onOther={() => {
                    setAnswers((a) => ({ ...a, [stepIndex]: { value: 0, otherText: "" } }));
                  }}
                  onSubmitOther={submitOther}
                />
                <div className="mt-10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={stepIndex === 0}
                    className="text-sm text-muted-foreground transition-colors hover:text-navy disabled:opacity-30"
                  >
                    ← Voltar
                  </button>
                  <button
                    type="button"
                    onClick={exitToPage}
                    className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-navy"
                  >
                    Sair
                  </button>
                </div>
              </>
            )}
            {phase === "processing" && <Processing />}
          </div>
        )}

        {phase === "result" && (
          <div className="mx-auto max-w-3xl">
            <ResultView
              reveal={reveal}
              overall={scores.overall}
              per={scores.per}
              weakest={scores.weakest}
              showForm={showForm}
              onRequest={() => setShowForm(true)}
              onExit={exitToPage}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function IdleIntro() {
  return (
    <div className="grid gap-14 md:grid-cols-12">
      <div className="md:col-span-6">
        <p className="eyebrow flex items-center gap-3">
          <span className="gold-rule" aria-hidden="true" />
          Diagnóstico
        </p>
        <h2 className="mt-6 text-3xl leading-[1.15] sm:text-4xl md:text-[2.5rem]">
          Diagnóstico de Maturidade Comercial.
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Uma sequência curta de perguntas para avaliar como está estruturada a operação comercial
          do seu escritório, à luz do Método ALEM. Ao final, você recebe uma leitura personalizada e
          uma recomendação.
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Baseado no Método ALEM · 3 a 5 minutos
        </p>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("scaleo:start-diagnostic"))
          }
          className="mt-10 inline-flex items-center rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-ink"
        >
          Iniciar Diagnóstico
        </button>
      </div>
      <div className="md:col-span-6">
        <div className="rounded-sm border border-hairline bg-paper p-8 md:p-10">
          <p className="eyebrow">O que será avaliado</p>
          <ul className="mt-5 space-y-4 text-sm text-ink">
            {(["A", "L", "E", "M"] as const).map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="font-serif text-lg text-gold">{p}</span>
                <span>{pillarNames[p]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function DiagHeader() {
  return (
    <header className="text-center">
      <p className="eyebrow">Baseado no Método ALEM · 3 a 5 minutos</p>
      <h2 className="mt-3 text-2xl sm:text-3xl">Diagnóstico de Maturidade Comercial</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Responda algumas perguntas para avaliar como está estruturada a operação comercial do seu
        escritório.
      </p>
    </header>
  );
}

function Progress({ current, total, percent }: { current: number; total: number; percent: number }) {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <span>
          Pergunta {current} de {total}
        </span>
        <span>{percent}%</span>
      </div>
      <div className="mt-3 h-px w-full bg-hairline">
        <div
          className="h-px bg-navy transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function QuestionBlock({
  question,
  selectedValue,
  isOther,
  otherDraft,
  onOtherChange,
  onSelect,
  onOther,
  onSubmitOther,
}: {
  question: Question;
  selectedValue?: number;
  isOther: boolean;
  otherDraft: string;
  onOtherChange: (v: string) => void;
  onSelect: (idx: 0 | 1 | 2) => void;
  onOther: () => void;
  onSubmitOther: () => void;
}) {
  return (
    <div className="mt-12" aria-live="polite">
      <h3 className="text-center font-serif text-2xl leading-snug text-ink sm:text-3xl">
        {question.prompt}
      </h3>
      <div className="mt-10 grid gap-3">
        {question.options.map((opt, i) => {
          const value = 3 - i;
          const selected = selectedValue === value;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i as 0 | 1 | 2)}
              className={`group w-full rounded-sm border px-5 py-4 text-left text-sm leading-relaxed transition-colors ${
                selected
                  ? "border-navy bg-navy/5 text-ink"
                  : "border-hairline text-ink hover:border-navy hover:bg-paper"
              }`}
            >
              <span className="mr-3 font-serif text-gold">
                {["A", "B", "C"][i]}
              </span>
              {opt}
            </button>
          );
        })}
        <button
          type="button"
          onClick={onOther}
          className={`w-full rounded-sm border px-5 py-4 text-left text-sm leading-relaxed transition-colors ${
            isOther
              ? "border-navy bg-navy/5 text-ink"
              : "border-hairline text-ink hover:border-navy hover:bg-paper"
          }`}
        >
          <span className="mr-3 font-serif text-gold">Outro</span>
          Prefiro descrever com minhas palavras.
        </button>
      </div>

      {isOther && (
        <div className="mt-6">
          <textarea
            rows={3}
            value={otherDraft}
            onChange={(e) => onOtherChange(e.target.value)}
            placeholder="Descreva brevemente (opcional)"
            className="w-full rounded-sm border border-hairline bg-background px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-navy"
          />
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={onSubmitOther}
              className="inline-flex items-center rounded-full bg-navy px-6 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink"
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Processing() {
  return (
    <div className="mt-24 text-center" aria-live="polite">
      <div className="mx-auto h-px w-40 overflow-hidden bg-hairline">
        <div className="h-px w-1/3 animate-[slide_1.2s_ease-in-out_infinite] bg-navy" />
      </div>
      <p className="mt-8 font-serif text-xl text-navy">Preparando seu diagnóstico…</p>
      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}

function ResultView({
  reveal,
  overall,
  per,
  weakest,
  showForm,
  onRequest,
  onExit,
}: {
  reveal: number;
  overall: number;
  per: Record<Pillar, number>;
  weakest: Pillar;
  showForm: boolean;
  onRequest: () => void;
  onExit: () => void;
}) {
  const level = levelFor(overall);
  const rec = recommendation(overall, weakest);

  return (
    <div>
      {reveal >= 1 && (
        <div className="fade-in-up text-center">
          <p className="eyebrow">Seu Diagnóstico</p>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Nível de Maturidade Comercial
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-navy sm:text-4xl">
            {level}
          </h2>
        </div>
      )}

      {reveal >= 2 && (
        <div className="fade-in-up mt-16">
          <p className="eyebrow text-center">Pilares do Método ALEM</p>
          <ul className="mt-8 space-y-6">
            {(Object.keys(per) as Pillar[]).map((p) => (
              <li key={p}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-ink">
                    <span className="mr-3 font-serif text-gold">{p}</span>
                    {pillarNames[p]}
                  </span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-hairline">
                  <div
                    className="h-full bg-navy transition-[width] duration-[900ms] ease-out"
                    style={{ width: `${per[p]}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {reveal >= 3 && (
        <div className="fade-in-up mt-16">
          <p className="eyebrow flex items-center gap-3">
            <span className="gold-rule" aria-hidden="true" />
            Recomendação Scaleo
          </p>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-ink">
            <p>{rec.cenario}</p>
            <p className="text-muted-foreground">{rec.prioridades}</p>
            <p className="text-muted-foreground">{rec.oportunidades}</p>
            <p className="text-muted-foreground">{rec.proximos}</p>
          </div>

          <div className="mt-14 rounded-sm border border-hairline bg-paper p-8 md:p-10">
            {!showForm ? (
              <>
                <h3 className="font-serif text-2xl text-navy">
                  Vamos aprofundar este diagnóstico?
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Você já tem uma visão inicial da maturidade comercial do seu escritório. Se quiser
                  aprofundar essa leitura, podemos continuar a conversa pelo WhatsApp.
                </p>
                <button
                  type="button"
                  onClick={onRequest}
                  className="mt-8 inline-flex items-center rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-ink"
                >
                  Conversar sobre meu diagnóstico
                </button>
              </>
            ) : (
              <WhatsAppContact
                result={{
                  maturityLabel: level,
                  overall,
                  per,
                  weakest,
                }}
              />
            )}
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={onExit}
              className="text-sm text-muted-foreground underline-offset-4 hover:text-navy hover:underline"
            >
              Voltar à página
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
