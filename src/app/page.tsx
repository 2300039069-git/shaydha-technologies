import React from "react";
import { Hero } from "@/components/hero/Hero";
import { ServicesSection } from "@/components/services/ServicesSection";
import { WhyUsSection } from "@/components/why-us/WhyUsSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ProcessSection } from "@/components/process/ProcessSection";
import { TechSection } from "@/components/tech/TechSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { FAQSection } from "@/components/faq/FAQSection";
import { CTASection } from "@/components/cta/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <WhyUsSection />
      <ProjectsSection />
      <ProcessSection />
      <TechSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
