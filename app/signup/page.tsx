"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Baby, Eye, EyeOff, Sparkles, Star } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { ThemeToggle } from "@/components/theme-toggle"
import { SubscriptionManager } from "@/lib/subscription-manager"
import { supabase } from '@/lib/supabaseClient'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    trimester: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Supabase signup
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        toast({
          title: "Signup failed",
          description: error.message,
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Insert into users table
      const { error: insertError } = await supabase
        .from('users')
        .insert([{
          email: formData.email,
          name: formData.name,
          trimester: formData.trimester,
        }])

      if (insertError) {
        toast({
          title: "Profile Save Failed",
          description: insertError.message,
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Save session locally
      SubscriptionManager.setPremiumStatus(formData.email, false, "free")
      const userData = {
        email: formData.email.toLowerCase(),
        name: formData.name,
        trimester: formData.trimester,
        isAuthenticated: true,
        isPremium: false,
        signupTime: new Date().toISOString(),
        subscriptionType: "free",
      }
      localStorage.setItem("aahar_user", JSON.stringify(userData))

      toast({
        title: "Welcome to Aahar! 🎉",
        description: "Your account has been created successfully.",
      })

      window.dispatchEvent(
        new CustomEvent("userSignedUp", {
          detail: { user: userData },
        }),
      )

      router.push("/dashboard")
    } catch (error) {
      console.error("❌ Signup error:", error)
      toast({
        title: "Signup failed",
        description: "Please try again later.",
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
              <Star className="h-8 w-8 text-pink-500 animate-pulse-soft" />
            </div>
            <CardTitle className="text-3xl font-bold text-gradient">Join Aahar</CardTitle>
            <CardDescription className="text-lg">Start your personalized nutrition journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-12 rounded-xl border-2 focus:border-pink-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-12 rounded-xl border-2 focus:border-pink-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trimester" className="text-base font-medium">
                  Current Trimester
                </Label>
                <Select onValueChange={(value) => setFormData({ ...formData, trimester: value })}>
                  <SelectTrigger className="h-12 rounded-xl border-2 focus:border-pink-500 transition-colors">
                    <SelectValue placeholder="Select your trimester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">First Trimester (1-12 weeks)</SelectItem>
                    <SelectItem value="2">Second Trimester (13-26 weeks)</SelectItem>
                    <SelectItem value="3">Third Trimester (27-40 weeks)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-base font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    className="h-12 rounded-xl border-2 focus:border-pink-500 transition-colors pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 btn-gradient text-lg rounded-xl" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-base text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-pink-600 hover:text-pink-700 font-semibold hover:underline transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
