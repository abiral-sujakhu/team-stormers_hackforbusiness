"use client"

import { useSubscription } from "@/components/subscription-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Lock, Star, CheckCircle } from "lucide-react"
import Link from "next/link"

interface PremiumGuardProps {
  children: React.ReactNode
  featureName?: string
  description?: string
  showUpgradeCard?: boolean
}

export function PremiumGuard({ 
  children, 
  featureName = "This Feature", 
  description = "This feature is available for premium subscribers only.",
  showUpgradeCard = true 
}: PremiumGuardProps) {
  const { isPremium, loading, upgradeToPremium } = useSubscription()

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Checking subscription status...</p>
        </div>
      </div>
    )
  }

  // If user is premium, show the protected content
  if (isPremium) {
    return <>{children}</>
  }

  // Show upgrade prompt for non-premium users
  if (!showUpgradeCard) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Premium Upgrade Card */}
      <Card className="border-2 border-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-800 dark:to-purple-800 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {featureName} - Premium Feature
          </CardTitle>
          <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0 mx-auto">
            <Lock className="h-3 w-3 mr-1" />
            Premium Only
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-gray-700 dark:text-gray-300 text-lg">
            {description}
          </p>
          
          {/* Premium Benefits */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-2" />
                Premium Benefits
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Access to qualified doctors
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  24/7 appointment booking
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Pregnancy specialist consultations
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Priority booking slots
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                <Crown className="h-4 w-4 text-purple-500 mr-2" />
                What You Get
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Unlimited meal plans 
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Premium recipes collection
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Advanced health tracking
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Personalized recommendations
                </li>
              </ul>
            </div>
          </div>

          {/* Upgrade Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link href="/dashboard/subscriptions" className="flex-1">
              <Button 
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3"
                size="lg"
              >
                <Crown className="h-4 w-4 mr-2" />
                View Premium Plans
              </Button>
            </Link>
            <Button 
              variant="outline"
              className="flex-1 border-pink-200 text-pink-600 hover:bg-pink-50 dark:border-pink-700 dark:text-pink-400 dark:hover:bg-pink-900/20"
              onClick={() => upgradeToPremium()}
              size="lg"
            >
              Quick Upgrade
            </Button>
          </div>

          {/* Already have premium? */}
          <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Already have premium? Try refreshing the page or{" "}
              <button 
                onClick={() => window.location.reload()} 
                className="text-pink-600 dark:text-pink-400 hover:underline"
              >
                click here to reload
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Quick premium status check hook
export function usePremiumGuard() {
  const { isPremium, loading } = useSubscription()
  return { isPremium, loading, isBlocked: !isPremium && !loading }
}
