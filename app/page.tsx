import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Baby, Utensils, Shield, Star,ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import React from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen gradient-bg dark:gradient-bg-dark">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="glass-effect rounded-2xl px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Baby className="h-10 w-10 text-pink-500 animate-float" />
              <Sparkles className="h-4 w-4 text-purple-400 absolute -top-1 -right-1 animate-pulse-soft" />
            </div>
            <h1 className="text-3xl font-bold text-gradient">Aahar</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline" className="rounded-full border-2 hover:bg-pink-50 dark:hover:bg-pink-900/20">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="btn-gradient rounded-full px-6">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-20">
          <div className="mb-8">
            <h2 className="text-6xl md:text-7xl font-bold text-gradient mb-6 leading-tight">
              Nourish Your Journey
              <br />
              <span className="text-5xl md:text-6xl">to Motherhood</span>
            </h2>
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-6 w-6 fill-yellow-400 text-yellow-400 animate-pulse-soft" />
                ))}
              </div>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
            Get Personalized nutrition guidance for every trimester of your pregnancy. From essential nutrients to
            delicious recipes, we've got you covered with expert-backed content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup">
              <Button size="lg" className="btn-gradient text-xl px-10 py-4 rounded-full shadow-2xl">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            {/* <p className="text-sm text-gray-500 dark:text-gray-400">Join 10,000+ expecting mothers</p> */}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              icon: Heart,
              title: "Trimester-Wise Guidance",
              description: "Get specific nutrition advice tailored to each stage of your pregnancy",
              color: "text-pink-500",
              bgColor: "bg-pink-50 dark:bg-pink-900/20",
            },
            {
              icon: Utensils,
              title: "Healthy Recipes",
              description: "Access hundreds of pregnancy-safe recipes rich in essential nutrients",
              color: "text-green-500",
              bgColor: "bg-green-50 dark:bg-green-900/20",
            },
            {
              icon: Baby,
              title: "AI Nutrition Assistant",
              description: "Get instant answers to your nutrition questions from our AI chatbot",
              color: "text-blue-500",
              bgColor: "bg-blue-50 dark:bg-blue-900/20",
            },
            {
              icon: Shield,
              title: "Expert-Backed Content",
              description: "All our recommendations are based on medical research and expert advice",
              color: "text-purple-500",
              bgColor: "bg-purple-50 dark:bg-purple-900/20",
            },
          ].map((benefit, index) => (
            <Card key={index} className="card-hover glass-effect border-0 shadow-xl">
              <CardHeader className="text-center pb-4">
                <div
                  className={`w-16 h-16 ${benefit.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  <benefit.icon className={`h-8 w-8 ${benefit.color}`} />
                </div>
                <CardTitle className="text-xl font-bold">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Showcase */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gradient mb-4">Everything You Need</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">Comprehensive tools for your pregnancy journey</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Meal Planning",
                description: "Create personalized meal plans with shopping lists",
                features: ["Weekly meal plans", "Shopping lists", "Recipe favorites"],
              },
              {
                title: "Baby Tracker",
                description: "Track your baby's development week by week",
                features: ["Growth milestones", "Development updates", "Preparation checklist"],
              },
              {
                title: "Expert Support",
                description: "Connect with certified nutritionists and doctors",
                features: ["Doctor appointments", "Expert consultations", "24/7 AI support"],
              },
            ].map((feature, index) => (
              <Card key={index} className="card-hover glass-effect border-0 shadow-xl overflow-hidden">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="glass-effect border-0 shadow-2xl p-12 max-w-4xl mx-auto">
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
                  Ready to Start Your Healthy Pregnancy Journey?
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Join thousands of expecting mothers who trust Aahar for their nutrition needs
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link href="/signup">
                  <Button size="lg" className="btn-gradient text-xl px-10 py-4 rounded-full shadow-xl">
                    Get Started Free
                    <Sparkles className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-xl px-10 py-4 rounded-full border-2 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                  >
                    Already have an account?
                  </Button>
                </Link>
              </div>
              <div className="flex justify-center items-center space-x-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                {/* <div className="text-center">
                  <div className="text-2xl font-bold text-pink-500">10,000+</div>
                  <div className="text-sm text-gray-500">Happy Mothers</div>
                </div> */}
                {/* <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">500+</div>
                  <div className="text-sm text-gray-500">Healthy Recipes</div>
                </div> */}
                {/* <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">24/7</div>
                  <div className="text-sm text-gray-500">AI Support</div>
                </div> */}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
