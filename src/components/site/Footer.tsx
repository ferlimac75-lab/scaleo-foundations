import { Logo } from "./Logo";
import { Mail, MessageCircle, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-paper" id="contato">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo className="h-12 md:h-14" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Estruturação comercial para escritórios contábeis. Processos claros,
            adaptados à realidade da sua operação.
          </p>
        </div>

        <div>
          <p className="eyebrow">Contato</p>
          <ul className="mt-4 space-y-3 text-sm text-ink">
            <li>
              <a
                href="https://wa.me/5500000000000"
                className="inline-flex items-center gap-2 hover:text-navy"
              >
                <MessageCircle className="size-4 text-gold" aria-hidden="true" />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="mailto:contato@scaleo.com.br"
                className="inline-flex items-center gap-2 hover:text-navy"
              >
                <Mail className="size-4 text-gold" aria-hidden="true" />
                contato@scaleo.com.br
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/"
                className="inline-flex items-center gap-2 hover:text-navy"
                rel="noopener"
              >
                <Linkedin className="size-4 text-gold" aria-hidden="true" />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Institucional</p>
          <ul className="mt-4 space-y-3 text-sm text-ink">
            <li>
              <a href="#como-funciona" className="hover:text-navy">
                Como trabalhamos
              </a>
            </li>
            <li>
              <a href="/politica-de-privacidade" className="hover:text-navy">
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href="/termos-de-uso" className="hover:text-navy">
                Termos de Uso
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Scaleo Consultoria. Todos os direitos reservados.</p>
          <p>Brasil</p>
        </div>
      </div>
    </footer>
  );
}
