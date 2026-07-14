import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/sections/Hero";
import { Problem } from "@/components/site/sections/Problem";
import { WhyItHappens } from "@/components/site/sections/WhyItHappens";
import { HowItWorks } from "@/components/site/sections/HowItWorks";
import { WhatWillBeStructured } from "@/components/site/sections/WhatWillBeStructured";
import { Calculator } from "@/components/site/sections/Calculator";
import { Diagnostic } from "@/components/site/sections/Diagnostic";
import { About } from "@/components/site/sections/About";
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
        <WhyItHappens />
        <HowItWorks />
        <WhatWillBeStructured />
        <Calculator />
        <Diagnostic />
        <About />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
