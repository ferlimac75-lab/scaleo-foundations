import React from "react";
import logoAsset from "@/assets/scaleo-logotipo-transparente-recortado.png.asset.json";

interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Logo({ className = "h-10 md:h-12", style }: LogoProps) {
  return (
    <img
      src={logoAsset.url}
      alt="Scaleo — Estrutura | Processo | Crescimento"
      className={`w-auto ${className}`}
      style={style}
    />
  );
}
