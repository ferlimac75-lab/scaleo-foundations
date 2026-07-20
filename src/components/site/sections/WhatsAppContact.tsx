import { useMemo, useState } from "react";
import { SCALEO_WHATSAPP_NUMBER, buildWhatsAppUrl } from "@/config/contact";

type Pillar = "A" | "L" | "E" | "M";

const pillarNames: Record<Pillar, string> = {
  A: "Analisar",
  L: "Liberar Oportunidades",
  E: "Estruturar Crescimento",
  M: "Monitorar Resultados",
};

export type DiagnosticResult = {
  maturityLabel: string;
  overall: number;
  per: Record<Pillar, number>;
  weakest: Pillar;
};

function buildMessage(
  lead: { name: string; office: string; whatsapp: string },
  result: DiagnosticResult,
) {
  const { per } = result;
  return [
    `Olá, Fernando.`,
    ``,
    `Acabei de concluir o Diagnóstico de Maturidade Comercial da Scaleo.`,
    ``,
    `Meu nome é ${lead.name} e sou do escritório ${lead.office}.`,
    ``,
    `Meu resultado foi:`,
    ``,
    `Nível de maturidade:`,
    `${result.maturityLabel} (${result.overall}%).`,
    ``,
    `Método ALEM:`,
    `Analisar: ${per.A}%`,
    `Liberar Oportunidades: ${per.L}%`,
    `Estruturar Crescimento: ${per.E}%`,
    `Monitorar Resultados: ${per.M}%`,
    ``,
    `Meu principal ponto de atenção identificado foi:`,
    `${pillarNames[result.weakest]}.`,
    ``,
    `Gostaria de conversar sobre o resultado do meu escritório.`,
  ].join("\n");
}

function validatePhone(v: string) {
  const digits = v.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
}

export function WhatsAppContact({ result }: { result: DiagnosticResult }) {
  const [name, setName] = useState("");
  const [office, setOffice] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [errors, setErrors] = useState<{ name?: string; office?: string; whatsapp?: string }>({});
  const [copied, setCopied] = useState(false);

  const message = useMemo(
    () => buildMessage({ name: name || "—", office: office || "—", whatsapp }, result),
    [name, office, whatsapp, result],
  );

  function validate() {
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Informe seu nome para continuar.";
    if (!office.trim()) next.office = "Informe o nome do escritório.";
    if (!whatsapp.trim() || !validatePhone(whatsapp))
      next.whatsapp = "Informe um número de WhatsApp válido.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleContinue() {
    if (!validate()) return;
    const url = buildWhatsAppUrl(SCALEO_WHATSAPP_NUMBER, message);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function handleCopy() {
    if (!validate()) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div>
      <h3 className="font-serif text-2xl text-navy">Seu diagnóstico está pronto.</h3>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Informe seus dados para que possamos contextualizar o seu diagnóstico e continuar a conversa
        pelo WhatsApp.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field
          label="Nome"
          value={name}
          onChange={setName}
          error={errors.name}
          required
        />
        <Field
          label="Escritório"
          value={office}
          onChange={setOffice}
          error={errors.office}
          required
        />
        <div className="sm:col-span-2">
          <Field
            label="WhatsApp"
            value={whatsapp}
            onChange={setWhatsapp}
            error={errors.whatsapp}
            required
            type="tel"
            placeholder="(11) 99999-9999"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleContinue}
          className="inline-flex items-center justify-center rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-ink"
        >
          Conversar sobre meu diagnóstico
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center justify-center rounded-full border border-hairline px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-navy"
        >
          {copied ? "Mensagem copiada." : "Copiar mensagem"}
        </button>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Ao continuar, abriremos o WhatsApp com uma mensagem baseada no seu diagnóstico.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
        {required && <span className="text-gold"> *</span>}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-sm border bg-background px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-navy ${
          error ? "border-red-500" : "border-hairline"
        }`}
      />
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
