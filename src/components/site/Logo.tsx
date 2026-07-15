import React from "react";

interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Logo({ className = "h-10 md:h-12", style }: LogoProps) {
  return (
    <img
      src="/scaleo-logo-nova.png"
      alt="Scaleo — Estrutura | Processo | Crescimento"
      className={`w-auto ${className}`}
      style={style}
    />
  );
}
