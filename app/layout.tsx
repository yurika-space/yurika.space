import ThemeWrapper from "@/lib/ThemeWrapper";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { JetBrains_Mono, Press_Start_2P, Sixtyfour } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import "./retro-globals.css";

const sixtyfour = Sixtyfour({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-sixtyfour",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrains-mono",
});

const pressStart2p = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-press-start-2p",
});

export const metadata: Metadata = {
  title:
    "yurika.space - Community-driven Blockchain Innovation and Community Support",
  description:
    "yurika.space is a community-driven blockchain innovation and community support platform supporting marginalized founders and outcasts.",
  keywords: [
    "yurika.space",
    "blockchain",
    "innovation",
    "community",
    "support",
    "marginalized",
    "founders",
    "outcasts",
  ],
  authors: [{ name: "teenyweeny studio", url: "https://teenyweeny.studio" }],
  creator: "onceuponaprince",
  publisher: "teenyweeny studio",
  openGraph: {
    title:
      "yurika.space - Community-driven Blockchain Innovation and Community Support",
    description:
      "yurika.space is a community-driven blockchain innovation and community support platform supporting marginalized founders and outcasts.",
    url: "https://yurika.space",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body
        className={`${sixtyfour.variable} ${jetBrainsMono.variable} ${pressStart2p.variable} antialiased min-h-screen w-screen overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="terminal"
          themes={[
            "terminal",
            "sega",
            "nintendo",
            "gameboy",
            "atari",
            "arcade",
            "neo-geo",
            "soft-pop",
            "vhs",
            "pacman",
            "cassette",
            "rusty-byte",
          ]}
          enableSystem={false}
          enableColorScheme={false}
        >
          <ThemeWrapper>{children}</ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
