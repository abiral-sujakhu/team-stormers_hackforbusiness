// Centralized subscription management utility
export interface UserSubscription {
  email: string
  isPremium: boolean
  subscriptionType: "free" | "premium_monthly" | "premium_yearly"
  activatedAt: string
  expiresAt?: string
  lastVerified: string
}

export class SubscriptionManager {
  private static readonly PREMIUM_KEY_PREFIX = "aahar_premium_"
  private static readonly USER_KEY = "aahar_user"
  private static readonly SUBSCRIPTION_KEY_PREFIX = "aahar_subscription_"

  // Get user-specific premium key
  private static getPremiumKey(email: string): string {
    return `${this.PREMIUM_KEY_PREFIX}${email.toLowerCase().replace(/[^a-z0-9]/g, "_")}`
  }

  // Get user-specific subscription key
  private static getSubscriptionKey(email: string): string {
    return `${this.SUBSCRIPTION_KEY_PREFIX}${email.toLowerCase().replace(/[^a-z0-9]/g, "_")}`
  }

  // Set premium status for user
  static setPremiumStatus(email: string, isPremium: boolean, subscriptionType = "premium_monthly"): void {
    console.log("🔄 Setting premium status:", { email, isPremium, subscriptionType })

    const premiumKey = this.getPremiumKey(email)
    const subscriptionKey = this.getSubscriptionKey(email)

    // Store premium flag
    localStorage.setItem(premiumKey, isPremium.toString())

    // Store detailed subscription info
    const subscription: UserSubscription = {
      email: email.toLowerCase(),
      isPremium,
      subscriptionType: isPremium ? (subscriptionType as any) : "free",
      activatedAt: new Date().toISOString(),
      lastVerified: new Date().toISOString(),
      ...(isPremium &&
        subscriptionType === "premium_yearly" && {
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        }),
      ...(isPremium &&
        subscriptionType === "premium_monthly" && {
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        }),
    }

    localStorage.setItem(subscriptionKey, JSON.stringify(subscription))

    // Update current user session
    this.updateCurrentUserSession(email, isPremium)

    // Trigger storage event for cross-tab sync
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: premiumKey,
        newValue: isPremium.toString(),
        oldValue: (!isPremium).toString(),
      }),
    )

    console.log("✅ Premium status set successfully:", {
      premiumKey,
      subscriptionKey,
      subscription,
      localStorage: localStorage.getItem(premiumKey),
    })
  }

  // Get premium status for user
  static getPremiumStatus(email: string): boolean {
    const premiumKey = this.getPremiumKey(email)
    const subscriptionKey = this.getSubscriptionKey(email)

    // Check premium flag
    const premiumFlag = localStorage.getItem(premiumKey) === "true"

    // Check detailed subscription
    const subscriptionData = localStorage.getItem(subscriptionKey)
    let subscriptionValid = false

    if (subscriptionData) {
      try {
        const subscription: UserSubscription = JSON.parse(subscriptionData)
        subscriptionValid =
          subscription.isPremium && (!subscription.expiresAt || new Date(subscription.expiresAt) > new Date())
      } catch (error) {
        console.error("Error parsing subscription data:", error)
      }
    }

    const isPremium = premiumFlag && subscriptionValid

    console.log("🔍 Checking premium status:", {
      email,
      premiumKey,
      premiumFlag,
      subscriptionValid,
      finalStatus: isPremium,
    })

    return isPremium
  }

  // Update current user session
  private static updateCurrentUserSession(email: string, isPremium: boolean): void {
    const currentUser = localStorage.getItem(this.USER_KEY)
    if (currentUser) {
      try {
        const userData = JSON.parse(currentUser)
        if (userData.email?.toLowerCase() === email.toLowerCase()) {
          userData.isPremium = isPremium
          userData.lastUpdated = new Date().toISOString()
          localStorage.setItem(this.USER_KEY, JSON.stringify(userData))
          console.log("📝 Updated current user session:", userData)
        }
      } catch (error) {
        console.error("Error updating user session:", error)
      }
    }
  }

  // Get current user
  static getCurrentUser(): any {
    const userData = localStorage.getItem(this.USER_KEY)
    if (!userData) return null

    try {
      const user = JSON.parse(userData)
      // Verify premium status is current
      if (user.email) {
        const actualPremiumStatus = this.getPremiumStatus(user.email)
        if (user.isPremium !== actualPremiumStatus) {
          user.isPremium = actualPremiumStatus
          localStorage.setItem(this.USER_KEY, JSON.stringify(user))
        }
      }
      return user
    } catch (error) {
      console.error("Error parsing user data:", error)
      return null
    }
  }

  // Verify and refresh subscription status
  static verifySubscription(email: string): boolean {
    const subscription = this.getSubscriptionDetails(email)
    if (!subscription) return false

    // Update last verified timestamp
    subscription.lastVerified = new Date().toISOString()
    const subscriptionKey = this.getSubscriptionKey(email)
    localStorage.setItem(subscriptionKey, JSON.stringify(subscription))

    return subscription.isPremium
  }

  // Get detailed subscription information
  static getSubscriptionDetails(email: string): UserSubscription | null {
    const subscriptionKey = this.getSubscriptionKey(email)
    const subscriptionData = localStorage.getItem(subscriptionKey)

    if (!subscriptionData) return null

    try {
      return JSON.parse(subscriptionData)
    } catch (error) {
      console.error("Error parsing subscription details:", error)
      return null
    }
  }

  // Clear subscription data
  static clearSubscription(email: string): void {
    const premiumKey = this.getPremiumKey(email)
    const subscriptionKey = this.getSubscriptionKey(email)

    localStorage.removeItem(premiumKey)
    localStorage.removeItem(subscriptionKey)

    this.updateCurrentUserSession(email, false)
  }

  // Debug function to check all subscription data
  static debugSubscriptionState(email: string): any {
    const premiumKey = this.getPremiumKey(email)
    const subscriptionKey = this.getSubscriptionKey(email)

    return {
      email,
      premiumKey,
      subscriptionKey,
      premiumFlag: localStorage.getItem(premiumKey),
      subscriptionData: localStorage.getItem(subscriptionKey),
      currentUser: this.getCurrentUser(),
      isPremium: this.getPremiumStatus(email),
    }
  }
}
