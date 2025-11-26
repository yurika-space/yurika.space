import type { Metadata } from "next";
import { IBM_Plex_Sans, Pixelify_Sans, Sixtyfour, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import { ThemeProvider } from "next-themes";
import ThemeWrapper from "@/components/providers/ThemeWrapper";
import "./globals.css";
import "./retro-globals.css";
import Head from "next/head";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});
const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pixelify-sans",
});
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
  title: "yurika.space - Community-driven Blockchain Innovation and Community Support",
  description: "yurika.space is a community-driven blockchain innovation and community support platform supporting marginalized founders and outcasts.",
  keywords: ["yurika.space", "blockchain", "innovation", "community", "support", "marginalized", "founders", "outcasts"],
  authors: [{ name: "teenyweeny studio", url: "https://teenyweeny.studio" }],
  creator: "onceuponaprince",
  publisher: "teenyweeny studio",
  openGraph: {
    title: "yurika.space - Community-driven Blockchain Innovation and Community Support",
    description: "yurika.space is a community-driven blockchain innovation and community support platform supporting marginalized founders and outcasts.",
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
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className={`${ibmPlexSans.variable} ${pixelifySans.variable} ${sixtyfour.variable} ${jetBrainsMono.variable} ${pressStart2p.variable} antialiased dark`}>
        <ThemeProvider
        attribute="class"
        defaultTheme="default"
        themes={[
          "default",
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
