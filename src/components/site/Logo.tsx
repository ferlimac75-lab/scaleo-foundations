import logoAsset from "@/assets/scaleo-logo-vector.svg.asset.json";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-10 md:h-12" }: LogoProps) {
  return (
    <img
      src={logoAsset.url}
      alt="Scaleo — Estrutura | Processo | Crescimento"
      className={`w-auto ${className}`}
    />
  );
}
