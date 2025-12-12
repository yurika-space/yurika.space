import { Section, SectionHeader } from "../atoms/Section";
import { Card } from "../atoms/Card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ComponentHeader from "../atoms/ComponentHeader";

export const CompetitionSection: React.FC = () => {
  const competitors = [
    { name: "AngelList", asset: "Equity", accredited: "Yes", liquidity: false, web3: false },
    { name: "Republic", asset: "Equity", accredited: "No", liquidity: false, web3: false },
    { name: "Kickstarter", asset: "Rewards", accredited: "N/A", liquidity: false, web3: false },
    { name: "DAOs", asset: "Governance", accredited: "No", liquidity: true, web3: true },
    { name: "Yurika", asset: "Domain + Revenue + Governance", accredited: "No", liquidity: true, web3: true, highlight: true },
  ]

  const advantages = [
    "Domain as Collateral",
    "Built-in Liquidity",
    "Recurring Value Model",
    "Engaged Community Governance",
    "10x Larger Addressable Market",
  ]

  return (
    <Section sectionId="competition" background="gradient">
      <SectionHeader title="OUR UNFAIR ADVANTAGES" align="center" />

      {/* Advantages badges */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {advantages.map((adv, i) => (
          <ComponentHeader
            key={i.toString()}
            title={adv}
            className="text-center"
            item={i.toString()}
          />
        ))}
      </div>

      {/* Comparison table */}
      <Card variant="window" padding="none" className="max-w-5xl mx-auto overflow-hidden">
        <div className="flex justify-center gap-1.5 py-3 bg-gradient-to-r from-[var(--card)] to-[var(--sidebar)]">
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-red-500" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full font-mono text-sm">
            <thead className="bg-theme-card">
              <tr>
                <th className="p-4 text-left text-foreground">Platform</th>
                <th className="p-4 text-left text-foreground">Asset</th>
                <th className="p-4 text-center text-foreground">Accredited?</th>
                <th className="p-4 text-center text-foreground">Liquidity</th>
                <th className="p-4 text-center text-foreground">Web3</th>
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
                    "border-t border-theme-border",
                    comp.highlight ? "bg-[color-mix(in_oklch,_var(--primary)_10%,_transparent)]" : "bg-background"
                  )}
                >
                  <td className={cn("p-4", comp.highlight && "font-bold text-theme-primary")}>{comp.name}</td>
                  <td className="p-4 text-theme-muted">{comp.asset}</td>
                  <td className="p-4 text-center text-theme-muted">{comp.accredited}</td>
                  <td className="p-4 text-center">{comp.liquidity ? "✓" : "✗"}</td>
                  <td className="p-4 text-center">{comp.web3 ? "✓" : "✗"}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Section>
  )
}
