import { Hero } from "@/components/sections/Hero";
import { LostIncomeCalculator } from "@/components/sections/LostIncomeCalculator";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { BenefitCards } from "@/components/sections/BenefitCards";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { serviceJsonLd } from "@/lib/jsonld";

export default function Home() {
  const jsonLd = serviceJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <LostIncomeCalculator />
      <LiveDemo />
      <BenefitCards />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
