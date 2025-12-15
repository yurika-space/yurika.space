import { Section, SectionHeader } from "../atoms/Section"
import { SectionGrid } from "../atoms/Section"
import { Card } from "../atoms/Card"
import { RetroWindow } from "@/components/molecules/RetroWindow"
import { motion } from "framer-motion"
import FeatureCard from "../atoms/FeatureCard"
import ComponentHeader from "../atoms/ComponentHeader"
import ComponentBody from "../atoms/ComponentBody"
import "../stylesheets/eureka-launchpad.css"

const SpaceIntro: React.FC = () => {
  // Funding statistics data
  const stats = [
    { label: "Women-Only Teams", value: "2.3%", description: "of VC funding" },
    { label: "Black Founders", value: "0.4%", description: "of VC funding" },
    { label: "LGBTQ+ Founders", value: "0.5%", description: "of VC funding" },
  ]

  const featureCards = [
    {
      icon: "🌐",
      title: "Domain-Backed",
      description:
        "Your domain name is your collateral. Build equity through ownership.",
    },
    {
      icon: "🤝",
      title: "Community First",
      description:
        "Raise from people who believe in your vision, not your last name.",
    },
    {
      icon: "💎",
      title: "Fair Terms",
      description:
        "No predatory rates. No hidden fees. Just fair funding for real builders.",
    },
    {
      icon: "🚀",
      title: "Launch Ready",
      description:
        "Integrated with Haccelerator. Get funding and support together.",
    },
  ];

  return (
    <Section sectionId="about" background={null} className="flex items-center justify-center align-center overflow-hidden relative bg-theme-card py-8! md:py-12! pb-14! md:pb-22!">

        <div className="absolute min-h-[110vh] min-w-screen">
          {/* Circuit pattern - now the animation class works! */}
          <div
            className="absolute opacity-5 animate-circuit-pattern inset-0 bg-theme-card"
            style={{
              backgroundImage: `
                linear-gradient(90deg, var(--primary) 1px, transparent 1px),
                linear-gradient(180deg, var(--glow-primary) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-[rgba(0,0,0,0.9)] via-transparent to-[rgba(0,0,0,0.4)]"/>

          {/* Power-up glow - now the animation class works! */}
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-30 blur-3xl animate-power-up-glow"
            style={{
              background: 'radial-gradient(circle, var(--primary) 0%, var(--glow-primary) 50%, transparent 60%)'
            }}
          />
        </div>

        {/* Content container */}
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
          {/* Power-up style header */}
          <div className="text-center mb-2">
            <ComponentHeader
              title="FEATURE UNLOCKED"
              item="⚡"
              className="animate-fade-in-up w-3/4 mx-auto"
              style={{ animationDelay: "0.2s" }}
            />
            <ComponentBody className="animate-fade-in-up pt-6" delay={400}>
              <p className="font-jetbrains-mono text-theme-secondary text-base sm:text-3xl text-yurika-text-muted leading-relaxed">
                <span className="pixel-frame text-theme-primary text-background font-bold">
                  Domain Name-backed Crowdfunding
                </span>{" "}
                for those without rich parents or a wealthy network.
              </p>
            </ComponentBody>
          </div>

          {/* Feature cards */}
          <div
            className="grid w-[90%] md:grid-cols-2 gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            {featureCards.map((item) => (
              <FeatureCard key={item.title} {...item} className="" />
            ))}
          </div>
        </div>
    </Section>
  )
}

export default SpaceIntro;
