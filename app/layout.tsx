import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SubscriptionProvider } from "@/components/subscription-provider"
import { Toaster } from "@/components/ui/toaster"
import RegisterSW from "@/components/RegisterSW"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aahar - Pregnancy Nutrition Guide",
  description: "Your complete guide to healthy eating during pregnancy with trimester-wise nutrition plans",
  generator: "v0.dev",
  manifest: "/manifest.json",
  icons: [
    { rel: "icon", url: "/icons/icon-192x192.png" },
    { rel: "apple-touch-icon", url: "/icons/icon-192x192.png" }
  ]
}

// ✅ New: moved themeColor to viewport export
export const viewport: Viewport = {
  themeColor: "#f97316"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f97316" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SubscriptionProvider>
            <RegisterSW />
            {children}
            <Toaster />
          </SubscriptionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
