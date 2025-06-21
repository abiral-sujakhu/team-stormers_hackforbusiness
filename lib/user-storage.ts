// Utility functions for user-specific data management

export interface UserData {
  email: string
  name?: string
  trimester?: string
  isAuthenticated: boolean
  isPremium: boolean
  loginTime?: string
  signupTime?: string
}

export class UserStorageManager {
  private static getUserPremiumKey(email: string): string {
    return `isPremium_${email}`
  }

  private static getUserDataKey(email: string): string {
    return `userData_${email}`
  }

  static setUserPremiumStatus(email: string, isPremium: boolean): void {
    const key = this.getUserPremiumKey(email)
    localStorage.setItem(key, isPremium.toString())
  }

  static getUserPremiumStatus(email: string): boolean {
    const key = this.getUserPremiumKey(email)
    return localStorage.getItem(key) === "true"
  }

  static setUserData(userData: UserData): void {
    // Store current session
    localStorage.setItem("user", JSON.stringify(userData))

    // Store user-specific premium status
    this.setUserPremiumStatus(userData.email, userData.isPremium)

    // Store additional user data
    const userDataKey = this.getUserDataKey(userData.email)
    localStorage.setItem(
      userDataKey,
      JSON.stringify({
        name: userData.name,
        trimester: userData.trimester,
        signupTime: userData.signupTime,
        lastLogin: new Date().toISOString(),
      }),
    )
  }

  static getCurrentUser(): UserData | null {
    const userData = localStorage.getItem("user")
    if (!userData) return null

    try {
      return JSON.parse(userData)
    } catch {
      return null
    }
  }

  static clearCurrentUser(): void {
    localStorage.removeItem("user")
  }

  static getUserHistory(email: string): any {
    const userDataKey = this.getUserDataKey(email)
    const userData = localStorage.getItem(userDataKey)

    if (!userData) return null

    try {
      return JSON.parse(userData)
    } catch {
      return null
    }
  }

  // Clean up old user data (optional - for maintenance)
  static cleanupOldUserData(): void {
    const keys = Object.keys(localStorage)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    keys.forEach((key) => {
      if (key.startsWith("userData_")) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || "{}")
          const lastLogin = new Date(data.lastLogin || 0)

          if (lastLogin < thirtyDaysAgo) {
            localStorage.removeItem(key)
            // Also remove associated premium status
            const email = key.replace("userData_", "")
            localStorage.removeItem(`isPremium_${email}`)
          }
        } catch {
          // Remove corrupted data
          localStorage.removeItem(key)
        }
      }
    })
  }
}
