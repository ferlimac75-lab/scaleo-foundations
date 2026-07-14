interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
}

// Typographic wordmark until the official scaleo-header-positiva.png is provided.
export function Logo({ className = "", variant = "dark" }: LogoProps) {
  const color = variant === "light" ? "text-paper" : "text-navy";
  return (
    <span
      className={`inline-flex items-baseline font-serif text-2xl tracking-tight ${color} ${className}`}
      aria-label="Scaleo"
    >
      <span className="font-medium">scaleo</span>
      <span className="ml-[2px] text-gold">.</span>
    </span>
  );
}
