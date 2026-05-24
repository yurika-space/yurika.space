export interface SlideData {
  id: string
  label: string
  title: string
  bullets: string[]
}

export const slides: SlideData[] = [
  {
    id: "problem",
    label: "Problem",
    title: "THE LIQUIDITY GAP",
    bullets: [
      "Premium domains are illiquid — founders sell the brand to raise capital.",
      "Traditional funding excludes underrepresented domain-first builders.",
      "Web3 fractionalization exists for NFTs, not domain-backed startups.",
    ],
  },
  {
    id: "solution",
    label: "Solution",
    title: "LIQUID DOMAINS",
    bullets: [
      "Vault domain ownership on-chain with verification artifacts.",
      "Mint tradable shards — ERC-20/1155 per campaign.",
      "Raise from global curators while retaining vision control.",
    ],
  },
  {
    id: "how-it-works",
    label: "How It Works",
    title: "VAULT → SHARD → FORGE",
    bullets: [
      "01 Vault domain · 02 Mint shards · 03 Curators invest",
      "04 Forge pipeline executes concept → MVP",
      "05 Knowledge graph matches founders and collaborators",
    ],
  },
  {
    id: "market",
    label: "Market",
    title: "DOMAIN-FIRST STARTUPS",
    bullets: [
      "Millions of premium domains sit under-leveraged as static assets.",
      "Crowdfunding + accelerator TAM intersects Web3 liquidity rails.",
      "yurika.space is the launchpad for domain-native founders.",
    ],
  },
  {
    id: "business-model",
    label: "Business Model",
    title: "TOKEN + FEE RAILS",
    bullets: [
      "Fractionalization fees on vault and mint events.",
      "Secondary trading fees on shard marketplace.",
      "Forge execution partnerships and accelerator services.",
    ],
  },
  {
    id: "traction",
    label: "Traction",
    title: "PHASE 2 LIVE",
    bullets: [
      "Terminal marketing surface + Command Center at /app",
      "Django API, Solidity contracts, Neo4j graph stack scaffolded",
      "Founder vault wizard, shard configurator, curator terminal",
    ],
  },
  {
    id: "competition",
    label: "Competition",
    title: "WHY YURIKA",
    bullets: [
      "Fractional.art — NFTs, not domains + execution",
      "ENS — naming, not crowdfunding + Forge pipeline",
      "yurika — vault + shards + graph + accelerator in one terminal",
    ],
  },
  {
    id: "roadmap",
    label: "Roadmap",
    title: "30-DAY MVP",
    bullets: [
      "Q1: Wallet auth, live campaigns, graph discovery",
      "Q2: On-chain vault deploy on Base, curator checkout",
      "Q3: Forge milestone automation + governance votes",
    ],
  },
  {
    id: "ask",
    label: "The Ask",
    title: "$50K ANGEL ROUND",
    bullets: [
      "Engineering: smart contracts + subgraph indexing",
      "Growth: founder and curator acquisition",
      "Legal: domain custody and securities posture",
    ],
  },
]
