"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { SubscriptionManager } from "@/lib/subscription-manager"

interface SubscriptionContextType {
  isPremium: boolean
  upgradeToPremium: (subscriptionType?: string) => void
  downgradeToFree: () => void
  loading: boolean
  refreshSubscriptionStatus: () => void
  subscriptionDetails: any
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [isPremium, setIsPremium] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null)

  const refreshSubscriptionStatus = useCallback(() => {
    console.log("🔄 Refreshing subscription status...")

    const user = SubscriptionManager.getCurrentUser()
    setCurrentUser(user)

    if (user?.email) {
      const premiumStatus = SubscriptionManager.getPremiumStatus(user.email)
      const details = SubscriptionManager.getSubscriptionDetails(user.email)

      console.log("📊 Subscription refresh result:", {
        email: user.email,
        premiumStatus,
        details,
        previousStatus: isPremium,
      })

      setIsPremium(premiumStatus)
      setSubscriptionDetails(details)

      // Verify subscription is still valid
      if (premiumStatus) {
        SubscriptionManager.verifySubscription(user.email)
      }
    } else {
      console.log("❌ No user found, setting premium to false")
      setIsPremium(false)
      setSubscriptionDetails(null)
    }
  }, [isPremium])

  useEffect(() => {
    console.log("🚀 SubscriptionProvider initializing...")
    refreshSubscriptionStatus()
    setLoading(false)

    // Listen for storage changes across tabs
    const handleStorageChange = (e: StorageEvent) => {
      console.log("📡 Storage change detected:", e.key, e.newValue)
      if (e.key?.includes("aahar_premium_") || e.key?.includes("aahar_subscription_") || e.key === "aahar_user") {
        console.log("🔄 Relevant storage change, refreshing...")
        setTimeout(refreshSubscriptionStatus, 100)
      }
    }

    // Listen for custom subscription events
    const handleSubscriptionChange = (e: CustomEvent) => {
      console.log("🎯 Custom subscription event:", e.detail)
      setTimeout(refreshSubscriptionStatus, 100)
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("subscriptionChanged" as any, handleSubscriptionChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("subscriptionChanged" as any, handleSubscriptionChange)
    }
  }, [refreshSubscriptionStatus])

  const upgradeToPremium = useCallback(
    (subscriptionType = "premium_monthly") => {
      if (!currentUser?.email) {
        console.error("❌ Cannot upgrade: No current user")
        return
      }

      console.log("⬆️ Upgrading to premium:", {
        email: currentUser.email,
        subscriptionType,
        currentStatus: isPremium,
      })

      // Set premium status using the manager
      SubscriptionManager.setPremiumStatus(currentUser.email, true, subscriptionType)

      // Update local state immediately
      setIsPremium(true)

      // Refresh to ensure consistency
      setTimeout(() => {
        refreshSubscriptionStatus()

        // Dispatch custom event for other components
        window.dispatchEvent(
          new CustomEvent("subscriptionChanged", {
            detail: { isPremium: true, email: currentUser.email },
          }),
        )
      }, 100)

      console.log("✅ Premium upgrade initiated")
    },
    [currentUser, isPremium, refreshSubscriptionStatus],
  )

  const downgradeToFree = useCallback(() => {
    if (!currentUser?.email) {
      console.error("❌ Cannot downgrade: No current user")
      return
    }

    console.log("⬇️ Downgrading to free:", currentUser.email)

    SubscriptionManager.setPremiumStatus(currentUser.email, false, "free")
    setIsPremium(false)

    setTimeout(() => {
      refreshSubscriptionStatus()

      window.dispatchEvent(
        new CustomEvent("subscriptionChanged", {
          detail: { isPremium: false, email: currentUser.email },
        }),
      )
    }, 100)

    console.log("✅ Downgrade completed")
  }, [currentUser, refreshSubscriptionStatus])

  // Debug logging
  useEffect(() => {
    if (currentUser?.email) {
      const debugInfo = SubscriptionManager.debugSubscriptionState(currentUser.email)
      console.log("🐛 Subscription Debug Info:", debugInfo)
    }
  }, [currentUser, isPremium])

  const contextValue = {
    isPremium,
    upgradeToPremium,
    downgradeToFree,
    loading,
    refreshSubscriptionStatus,
    subscriptionDetails,
  }

  console.log("🎯 SubscriptionProvider render:", {
    isPremium,
    loading,
    userEmail: currentUser?.email,
    subscriptionDetails: subscriptionDetails?.subscriptionType,
  })

  return <SubscriptionContext.Provider value={contextValue}>{children}</SubscriptionContext.Provider>
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider")
  }
  return context
}
