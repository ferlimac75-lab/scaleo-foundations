import { useMemo, useState } from "react";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export function Calculator() {
  const [ticket, setTicket] = useState(1500);
  const [lostPerMonth, setLostPerMonth] = useState(4);
  const [months, setMonths] = useState(12);

  const annualPotential = useMemo(() => {
    // Ticket recorrente mensal × oportunidades perdidas × meses de permanência médios.
    return ticket * lostPerMonth * months;
  }, [ticket, lostPerMonth, months]);

  return (
    <section className="bg-paper py-16 md:py-20">
      <div className="container-page grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow flex items-center gap-3">
            <span className="gold-rule" aria-hidden="true" />
            Uma reflexão
          </p>
          <h2 className="mt-6 text-3xl leading-[1.15] sm:text-4xl">
            Qual é o potencial comercial do seu escritório?
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Este não é um cálculo financeiro. É um exercício para colocar em perspectiva quanto
            representa, ao longo do tempo, cada oportunidade que hoje não recebe acompanhamento
            estruturado.
          </p>
        </div>

        <div className="md:col-span-7">
          <div className="rounded-sm border border-hairline bg-background p-8 md:p-10">
            <div className="grid gap-8">
              <Field label="Ticket médio mensal por cliente" value={currency.format(ticket)}>
                <input
                  type="range"
                  min={500}
                  max={10000}
                  step={100}
                  value={ticket}
                  onChange={(e) => setTicket(Number(e.target.value))}
                  aria-label="Ticket médio mensal por cliente"
                  className="range"
                />
              </Field>

              <Field label="Oportunidades não acompanhadas por mês" value={String(lostPerMonth)}>
                <input
                  type="range"
                  min={0}
                  max={20}
                  step={1}
                  value={lostPerMonth}
                  onChange={(e) => setLostPerMonth(Number(e.target.value))}
                  aria-label="Oportunidades não acompanhadas por mês"
                  className="range"
                />
              </Field>

              <Field label="Permanência média (meses)" value={`${months} meses`}>
                <input
                  type="range"
                  min={6}
                  max={48}
                  step={1}
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  aria-label="Permanência média em meses"
                  className="range"
                />
              </Field>
            </div>

            <div className="mt-10 border-t border-hairline pt-8">
              <p className="eyebrow">Potencial recorrente para reflexão</p>
              <p className="mt-2 font-serif text-4xl text-navy sm:text-5xl">
                {currency.format(annualPotential)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Ordem de grandeza estimada considerando a permanência média dos clientes. Um
                número que costuma provocar mais reflexão do que resposta imediata.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 2px;
          background: var(--hairline);
          border-radius: 999px;
          outline: none;
        }
        .range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: var(--navy);
          cursor: pointer;
          border: 3px solid #fff;
          box-shadow: 0 0 0 1px var(--navy);
          transition: transform .15s ease;
        }
        .range::-webkit-slider-thumb:hover { transform: scale(1.08); }
        .range::-moz-range-thumb {
          width: 18px; height: 18px; border-radius: 999px;
          background: var(--navy); border: 3px solid #fff; cursor: pointer;
          box-shadow: 0 0 0 1px var(--navy);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label className="text-sm text-muted-foreground">{label}</label>
        <span className="font-serif text-lg text-navy">{value}</span>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
