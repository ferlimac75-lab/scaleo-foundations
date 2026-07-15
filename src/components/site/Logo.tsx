interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-10 md:h-12" }: LogoProps) {
  return (
    <img
      src="/scaleo-logo-nova.png"
      alt="Scaleo — Estrutura | Processo | Crescimento"
      className={`w-auto ${className}`}
    />
  );
}
