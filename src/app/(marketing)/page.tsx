import { HeroSection } from "@/components/marketing/HeroSection"
import { ProblemSection } from "@/components/marketing/ProblemSection"
import { SolutionSection } from "@/components/marketing/SolutionSection"
import { FeaturesSection } from "@/components/marketing/FeaturesSection"
import { ForgeSection } from "@/components/marketing/ForgeSection"
import { CtaSection } from "@/components/marketing/CtaSection"

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <ForgeSection />
      <CtaSection />
    </>
  )
}
