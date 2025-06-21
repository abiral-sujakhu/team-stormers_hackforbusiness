"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Baby, Calendar, Lightbulb, TrendingUp, Award, Sparkles } from "lucide-react"
import Link from "next/link"

const tips = [
  "Start your day with a glass of water and a prenatal vitamin.",
  "Include leafy greens in every meal for folate and iron.",
  "Eat small, frequent meals to manage morning sickness.",
  "Choose whole grains over refined carbohydrates.",
  "Include omega-3 rich foods like salmon and walnuts.",
]

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [tipOfTheDay, setTipOfTheDay] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Set random tip of the day
    const randomTip = tips[Math.floor(Math.random() * tips.length)]
    setTipOfTheDay(randomTip)
  }, [])

  const trimesterInfo = {
    1: {
      title: "First Trimester",
      description: "Focus on folate, iron, and managing morning sickness",
      weeks: "1-12 weeks",
      color:
        "bg-gradient-to-br from-green-100 to-emerald-100 text-green-800 dark:from-green-900/20 dark:to-emerald-900/20 dark:text-green-200",
      icon: "🌱",
    },
    2: {
      title: "Second Trimester",
      description: "Increase calcium and protein intake for baby's growth",
      weeks: "13-26 weeks",
      color:
        "bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-800 dark:from-blue-900/20 dark:to-cyan-900/20 dark:text-blue-200",
      icon: "🌸",
    },
    3: {
      title: "Third Trimester",
      description: "Focus on iron, omega-3s, and preparing for delivery",
      weeks: "27-40 weeks",
      color:
        "bg-gradient-to-br from-purple-100 to-pink-100 text-purple-800 dark:from-purple-900/20 dark:to-pink-900/20 dark:text-purple-200",
      icon: "🌺",
    },
  }

  return (
    <div className="space-y-8 p-6">
      {/* Welcome Section */}
      <div className="relative">
        <Card className="glass-effect border-0 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full -translate-y-16 translate-x-16"></div>
          <CardContent className="pt-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gradient mb-2">Welcome back, {user?.name || "Mom-to-be"}! 👋</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Let's continue your healthy pregnancy journey
                </p>
              </div>
              {user?.trimester && (
                <div className="text-right">
                  <Badge
                    className={`text-lg px-4 py-2 ${trimesterInfo[user.trimester as keyof typeof trimesterInfo]?.color}`}
                  >
                    <span className="mr-2">{trimesterInfo[user.trimester as keyof typeof trimesterInfo]?.icon}</span>
                    {trimesterInfo[user.trimester as keyof typeof trimesterInfo]?.title}
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tip of the Day */}
      <Card className="glass-effect border-0 shadow-xl bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">Tip of the Day</span>
            <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse-soft" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{tipOfTheDay}</p>
        </CardContent>
      </Card>

      {/* Trimester Cards */}
      <div>
        <h2 className="text-3xl font-bold text-gradient mb-6">Explore Trimester Guides</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(trimesterInfo).map(([key, info]) => (
            <Link key={key} href={`/dashboard/trimester/${key}`}>
              <Card className="card-hover glass-effect border-0 shadow-xl h-full overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{info.icon}</div>
                    <Badge className={`${info.color} border-0`}>{info.weeks}</Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold">{info.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{info.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Click to explore nutrition guidelines and recipes
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div>
        <h2 className="text-3xl font-bold text-gradient mb-6">Your Progress</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/dashboard/meal-plan">
            <Card className="card-hover glass-effect border-0 shadow-xl group overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-red-200/20 to-pink-200/20 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Saved Recipes</CardTitle>
                <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-pink-400 rounded-xl flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gradient">12</div>
                <p className="text-sm text-muted-foreground flex items-center mt-1">
                  <Award className="h-3 w-3 mr-1" />
                  +2 from last week
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/meal-plan">
            <Card className="card-hover glass-effect border-0 shadow-xl group overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Meal Plans</CardTitle>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gradient">3</div>
                <p className="text-sm text-muted-foreground flex items-center mt-1">
                  <Award className="h-3 w-3 mr-1" />
                  This week's plans
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/delivery-tracker">
            <Card className="card-hover glass-effect border-0 shadow-xl group overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Days Tracked</CardTitle>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                  <Baby className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gradient">45</div>
                <p className="text-sm text-muted-foreground flex items-center mt-1">
                  <Award className="h-3 w-3 mr-1" />
                  Keep up the great work!
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
