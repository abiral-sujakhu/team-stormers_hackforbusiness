"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Baby, Eye, EyeOff, Sparkles, Heart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { ThemeToggle } from "@/components/theme-toggle"
import { SubscriptionManager } from "@/lib/subscription-manager"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("🔐 Login attempt for:", email)

      // Simulate login - replace with actual Supabase auth
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get existing premium status for this user
      const existingPremiumStatus = SubscriptionManager.getPremiumStatus(email)
      const subscriptionDetails = SubscriptionManager.getSubscriptionDetails(email)

      console.log("📋 Existing subscription status:", {
        email,
        isPremium: existingPremiumStatus,
        details: subscriptionDetails,
      })

      // Create user object with preserved premium status
      const userData = {
        email: email.toLowerCase(),
        name: email.split("@")[0], // Simple name extraction
        isAuthenticated: true,
        isPremium: existingPremiumStatus,
        loginTime: new Date().toISOString(),
        subscriptionType: subscriptionDetails?.subscriptionType || "free",
      }

      // Store user session
      localStorage.setItem("aahar_user", JSON.stringify(userData))

      // Verify subscription if premium
      if (existingPremiumStatus) {
        SubscriptionManager.verifySubscription(email)
      }

      console.log("✅ Login successful:", userData)

      toast({
        title: existingPremiumStatus ? "Welcome back, Premium Member! 🎉" : "Welcome back! 👋",
        description: existingPremiumStatus
          ? "You have been successfully logged in. All premium features are active!"
          : "You have been successfully logged in.",
      })

      // Dispatch login event
      window.dispatchEvent(
        new CustomEvent("userLoggedIn", {
          detail: { user: userData },
        }),
      )

      router.push("/dashboard")
    } catch (error) {
      console.error("❌ Login error:", error)
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen gradient-bg dark:gradient-bg-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <Baby className="h-10 w-10 text-pink-500 animate-float" />
              <Sparkles className="h-4 w-4 text-purple-400 absolute -top-1 -right-1 animate-pulse-soft" />
            </div>
            <span className="text-3xl font-bold text-gradient">Aahar</span>
          </Link>
          <ThemeToggle />
        </div>

        <Card className="glass-effect border-0 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center mx-auto">
              <Heart className="h-8 w-8 text-pink-500 animate-pulse-soft" />
            </div>
            <CardTitle className="text-3xl font-bold text-gradient">Welcome Back</CardTitle>
            <CardDescription className="text-lg">Sign in to continue your nutrition journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 rounded-xl border-2 focus:border-pink-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 rounded-xl border-2 focus:border-pink-500 transition-colors pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 btn-gradient text-lg rounded-xl" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-base text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-pink-600 hover:text-pink-700 font-semibold hover:underline transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
