import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { CtaSection } from "@/components/landing/cta-section"
import Dashboard from "@/app/dashboard/dashboard"
import { SiteLayout } from "@/components/site-layout"

export default function Page() {
  return (
    <SiteLayout>
      <Hero />
      <Features />
      <HowItWorks />
    </SiteLayout>

  );
  
}
