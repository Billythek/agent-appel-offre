import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { playfair, inter } from "@/lib/fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "Agent Appel d'Offre — Plateforme IA Marchés Publics",
  description:
    "Réduisez le temps de réponse aux marchés publics de 40h à 4h avec 99.5% de conformité juridique.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
