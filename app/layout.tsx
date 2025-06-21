import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SubscriptionProvider } from "@/components/subscription-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aahar - Pregnancy Nutrition Guide",
  description: "Your complete guide to healthy eating during pregnancy with trimester-wise nutrition plans",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SubscriptionProvider>
            {children}
            <Toaster />
          </SubscriptionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
