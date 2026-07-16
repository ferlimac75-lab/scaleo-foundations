import { useState } from "react";

export function DevolutivaForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    escritorio: "",
    email: "",
    telefone: "",
    colaboradores: "",
    mensagem: "",
  });

  function update(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  if (submitted) {
    return (
      <div className="rounded-sm border border-hairline bg-paper p-8">
        <p className="font-serif text-2xl text-navy">Recebemos sua solicitação.</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Em até um dia útil, o consultor entrará em contato para agendar a Reunião de Devolutiva
          em um horário conveniente.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-5 rounded-sm border border-hairline bg-paper p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Nome" name="nome" required value={form.nome} onChange={update} />
        <Input
          label="Escritório"
          name="escritorio"
          required
          value={form.escritorio}
          onChange={update}
        />
        <Input
          label="E-mail"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={update}
        />
        <Input
          label="Telefone"
          name="telefone"
          type="tel"
          value={form.telefone}
          onChange={update}
        />
      </div>
      <Input
        label="Número aproximado de colaboradores"
        name="colaboradores"
        value={form.colaboradores}
        onChange={update}
      />
      <div>
        <label
          htmlFor="mensagem"
          className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground"
        >
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
        Solicitar Reunião de Devolutiva
      </button>
      <p className="text-xs text-muted-foreground">
        Os dados serão utilizados apenas para o contato inicial.
      </p>
    </form>
  );
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
      <label
        htmlFor={name}
        className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground"
      >
        {label}
        {required && <span className="text-gold"> *</span>}
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
