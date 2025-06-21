"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { LogOut, Sparkles, Crown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useSubscription } from "@/components/subscription-provider"
import { SubscriptionManager } from "@/lib/subscription-manager"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { isPremium, refreshSubscriptionStatus } = useSubscription()

  useEffect(() => {
    console.log("🏠 Dashboard layout initializing...")

    // Check authentication status
    const user = SubscriptionManager.getCurrentUser()
    console.log("👤 Current user from manager:", user)

    if (user?.isAuthenticated) {
      setIsAuthenticated(true)
      setCurrentUser(user)

      // Refresh subscription status
      refreshSubscriptionStatus()
    } else {
      console.log("❌ No authenticated user, redirecting to login")
      router.push("/login")
    }
    setIsLoading(false)
  }, [router, refreshSubscriptionStatus])

  // Listen for user events
  useEffect(() => {
    const handleUserLogin = (e: CustomEvent) => {
      console.log("🔐 User login event received:", e.detail)
      setCurrentUser(e.detail.user)
      setIsAuthenticated(true)
      refreshSubscriptionStatus()
    }

    const handleSubscriptionChange = (e: CustomEvent) => {
      console.log("💳 Subscription change event received:", e.detail)
      refreshSubscriptionStatus()
    }

    window.addEventListener("userLoggedIn" as any, handleUserLogin)
    window.addEventListener("subscriptionChanged" as any, handleSubscriptionChange)

    return () => {
      window.removeEventListener("userLoggedIn" as any, handleUserLogin)
      window.removeEventListener("subscriptionChanged" as any, handleSubscriptionChange)
    }
  }, [refreshSubscriptionStatus])

  const handleLogout = () => {
    console.log("🚪 Logging out user...")

    // Clear user session but preserve subscription data
    localStorage.removeItem("aahar_user")

    setIsAuthenticated(false)
    setCurrentUser(null)

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen gradient-bg dark:gradient-bg-dark">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-xl text-gradient font-semibold">Loading your dashboard...</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Verifying subscription status...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen gradient-bg dark:gradient-bg-dark">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex-1">
            <header className="glass-effect border-b border-white/20 dark:border-gray-700/20 sticky top-0 z-50">
              <div className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger className="hover:bg-pink-100 dark:hover:bg-pink-900/20 rounded-xl" />
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-pink-500 animate-pulse-soft" />
                    <span className="text-lg font-semibold text-gradient">Dashboard</span>
                    {isPremium && (
                      <div className="flex items-center space-x-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 px-2 py-1 rounded-full">
                        <Crown className="h-3 w-3 text-purple-600" />
                        <span className="text-xs font-semibold text-purple-700 dark:text-purple-300">Premium</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {currentUser && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Welcome, {currentUser.name || currentUser.email?.split("@")[0]}
                    </div>
                  )}
                  <ThemeToggle />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="rounded-xl border-2 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
