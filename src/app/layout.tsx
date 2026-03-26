import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import { Providers } from "./providers"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "yurika.space — Liquid Domains. Accelerated Founders.",
    template: "%s | yurika.space",
  },
  description:
    "Fractionalize your domain ownership, raise instant capital, and accelerate your vision within the Yurika ecosystem. The default launchpad for domain-first startups.",
  keywords: [
    "domain fractionalization",
    "Web3 crowdfunding",
    "startup accelerator",
    "domain ownership shards",
    "blockchain funding",
    "yurika forge",
  ],
  openGraph: {
    title: "yurika.space — Liquid Domains. Accelerated Founders.",
    description:
      "Turn static domain assets into liquid engines of growth. Vault, fractionalize, and raise.",
    url: "https://yurika.space",
    siteName: "yurika.space",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "yurika.space",
    description: "Liquid Domains. Accelerated Founders.",
    creator: "@yurikaspace",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-bg-primary text-text-primary font-body antialiased">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
