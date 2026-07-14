import logoAsset from "@/assets/scaleo-header-positiva.png.asset.json";

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
