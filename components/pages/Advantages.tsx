import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { Badge, badgeVariants } from "../atoms/Badge";
import { Card } from "../atoms/Card";
import { Section, SectionHeader } from "../atoms/Section";
import ComponentHeader from "../atoms/ComponentHeader";
import { InvaderField } from "../atoms/SpaceInvader";

export const CompetitionSection: React.FC = () => {
  const competitors = [
    {
      name: "AngelList",
      asset: "Equity",
      accredited: "Yes",
      liquidity: false,
      web3: false,
    },
    {
      name: "Republic",
      asset: "Equity",
      accredited: "No",
      liquidity: false,
      web3: false,
    },
    {
      name: "Kickstarter",
      asset: "Rewards",
      accredited: "N/A",
      liquidity: false,
      web3: false,
    },
    {
      name: "DAOs",
      asset: "Governance",
      accredited: "No",
      liquidity: true,
      web3: true,
    },
    {
      name: "Yurika",
      asset: "Domain + Revenue + Governance",
      accredited: "No",
      liquidity: true,
      web3: true,
      highlight: true,
    },
  ];

  const advantages = [
    "Domain as Collateral",
    "Built-in Liquidity",
    "Recurring Value Model",
    "Engaged Community Governance",
    "10x Larger Addressable Market",
  ];

  return (
    <Section sectionId="competition" className="bg-[var(--primary-foreground)] relative">
      <InvaderField count={12} color="var(--primary)" className="absolute inset-0"/>
      <ComponentHeader title="OUR ADVANTAGES" item="" className="font-jetbrains-mono"/>

      {/* Advantages badges */}
      <div className=" hidden md:flex flex-wrap justify-center gap-3 mb-12">
        {advantages.map((adv, i) => {
          const badgeVariantOptions: VariantProps<
            typeof badgeVariants
          >["variant"][] = ["lime", "purple", "cyan", "yellow", "lime"];
          const badgeVariant =
            badgeVariantOptions[i % badgeVariantOptions.length];

          return (
            <Badge key={adv} variant={badgeVariant} size="md" animated>
              {adv}
            </Badge>
          );
        })}
      </div>

      {/* Comparison table */}
      <Card
        variant="window"
        padding="none"
        className="w-3/4 max-w-5xl mx-auto overflow-hidden"
      >
        <div className="flex justify-start gap-1.5 py-3 bg-linear-to-r from-(--card) to-(--sidebar) pl-6 border-b-2 border-theme-border">
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-red-500" />
        </div>
        <div className="overflow-x-auto">
          <table className="md:hidden table w-full font-mono text-sm">
            <thead className="bg-theme-card">
              <tr>
                <th className="p-4 text-center text-theme-card font-bold">
                  Yurika.space
                </th>
              </tr>
            </thead>
            <tbody>
              {advantages.map((adv, i) => (
                <tr key={i} className={cn(
                  "border-t border-theme-border",
                  i === advantages.length - 1 && "border-b border-theme-border"
                )}>
                  <td className="p-4 text-center bg-theme-success text-theme-primary">{adv}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="hidden md:table w-full font-mono text-sm">
            <thead className="bg-theme-card">
              <tr>
                <th className="p-4 text-left text-theme-card font-bold">Platform</th>
                <th className="p-4 text-left text-theme-card font-bold">Asset</th>
                <th className="p-4 text-center text-theme-card font-bold">Accredited?</th>
                <th className="p-4 text-center text-theme-card font-bold">Liquidity</th>
                <th className="p-4 text-center text-theme-card font-bold">Web3</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((comp, i) => (
                <motion.tr
                  key={comp.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "border-t border-theme-border text-theme-secondary",
                    comp.highlight
                      ? "bg-[var(--primary)] text-theme-primary"
                      : "bg-[var(--card)] text-theme-secondary"
                  )}
                >
                  <td
                    className={cn(
                      "p-4",
                      comp.highlight && "font-bold text-theme-primary"
                    )}
                  >
                    {comp.name}
                  </td>
                  <td className={cn("p-4", comp.highlight && "text-theme-primary")}>{comp.asset}</td>
                  <td className={cn("p-4 text-center", comp.highlight && "text-theme-primary")}>
                    {comp.accredited}
                  </td>
                  <td className={cn("p-4 text-center", comp.highlight && "text-theme-primary")}>
                    {comp.liquidity ? "✓" : "✗"}
                  </td>
                  <td className="p-4 text-center">{comp.web3 ? "✓" : "✗"}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Section>
  );
};
