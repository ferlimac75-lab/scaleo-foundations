import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/sections/Hero";
import { Problem } from "@/components/site/sections/Problem";
import { Calculator } from "@/components/site/sections/Calculator";
import { About } from "@/components/site/sections/About";
import { MethodAlem } from "@/components/site/sections/MethodAlem";
import { Diagnostic } from "@/components/site/sections/Diagnostic";
import { HowItWorks } from "@/components/site/sections/HowItWorks";
import { FinalCta } from "@/components/site/sections/FinalCta";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-dvh bg-background text-ink">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Calculator />
        <About />
        <MethodAlem />
        <Diagnostic />
        <HowItWorks />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
