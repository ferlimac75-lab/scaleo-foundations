import React from "react";
import logo from "@/assets/scaleo-logo.png";

interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Logo({ className = "h-10 md:h-12", style }: LogoProps) {
  return (
    <img
      src={logoAsset.url}
      alt="Scaleo — Estrutura | Processo | Crescimento"
      className={`w-auto bg-transparent ${className}`}
      style={style}
    />
  );
}


