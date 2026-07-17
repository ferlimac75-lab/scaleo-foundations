import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "#metodo-alem", label: "Método ALEM" },
  { href: "#diagnostico", label: "Diagnóstico" },
  { href: "#proximo-passo", label: "Próximo passo" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-hairline bg-background/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-44 items-center justify-between">
        <a href="#inicio" className="flex items-center" aria-label="Scaleo — Início">
          <Logo className="w-auto" style={{ height: "126px" }} />
        </a>

        <nav aria-label="Principal" className="header-nav hidden md:block">
          <ul className="flex items-center gap-9">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-navy"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>


        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid size-11 place-items-center rounded-full text-navy md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-hairline bg-background md:hidden">
          <nav aria-label="Móvel" className="container-page py-6">
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-3 text-base text-ink hover:bg-muted"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
