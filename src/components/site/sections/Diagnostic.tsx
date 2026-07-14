import { useState } from "react";
import diagImg from "@/assets/section-diagnostic.jpg";

export function Diagnostic() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    escritorio: "",
    email: "",
    telefone: "",
    colaboradores: "",
    mensagem: "",
  });

  return (
    <section id="diagnostico" className="py-24 md:py-32">
      <div className="container-page grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <figure className="mb-10 md:mb-0">
            <img
              src={diagImg}
              alt="Mesa organizada com documentos, agenda de couro e caneta tinteiro em um escritório institucional."
              width={1408}
              height={1008}
              loading="lazy"
              className="w-full rounded-sm object-cover"
            />
          </figure>
        </div>

        <div className="md:col-span-7 md:pl-6">
          <p className="eyebrow flex items-center gap-3">
            <span className="gold-rule" aria-hidden="true" />
            Diagnóstico Comercial
          </p>
          <h2 className="mt-6 text-3xl leading-[1.15] sm:text-4xl md:text-[2.5rem]">
            Uma conversa consultiva para compreender a situação do escritório.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            O diagnóstico é uma reunião de escuta e observação. O objetivo não
            é apresentar uma proposta. É compreender a operação comercial atual
            e devolver uma leitura clara sobre o que pode ser organizado.
          </p>

          <ul className="mt-8 grid gap-3 text-sm text-ink">
            {[
              "Análise objetiva da operação comercial atual",
              "Identificação dos principais pontos de perda",
              "Sugestões iniciais de organização",
              "Sem apresentação comercial ou proposta durante a conversa",
            ].map((i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2.5 inline-block h-px w-4 shrink-0 bg-gold" aria-hidden="true" />
                {i}
              </li>
            ))}
          </ul>

          <form
            className="mt-10 grid gap-5 rounded-sm border border-hairline bg-paper p-8"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            {submitted ? (
              <div>
                <p className="font-serif text-2xl text-navy">Recebemos sua solicitação.</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Em até um dia útil, o consultor entrará em contato para
                  agendar a conversa em um horário conveniente.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input label="Nome" name="nome" required value={form.nome} onChange={update} />
                  <Input label="Escritório" name="escritorio" required value={form.escritorio} onChange={update} />
                  <Input label="E-mail" name="email" type="email" required value={form.email} onChange={update} />
                  <Input label="Telefone" name="telefone" type="tel" value={form.telefone} onChange={update} />
                </div>
                <Input label="Número aproximado de colaboradores" name="colaboradores" value={form.colaboradores} onChange={update} />
                <div>
                  <label htmlFor="mensagem" className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Contexto (opcional)
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={4}
                    value={form.mensagem}
                    onChange={update}
                    className="w-full rounded-sm border border-hairline bg-background px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-navy"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center self-start rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-ink"
                >
                  Solicitar diagnóstico
                </button>
                <p className="text-xs text-muted-foreground">
                  Os dados serão utilizados apenas para o contato inicial.
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );

  function update(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }
}

function Input({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}{required && <span className="text-gold"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full rounded-sm border border-hairline bg-background px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-navy"
      />
    </div>
  );
}
