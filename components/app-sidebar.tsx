"use client"

import { Home, Crown, MessageSquare, Baby, Heart, Utensils, Stethoscope, Sparkles } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { useSubscription } from "@/components/subscription-provider"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    color: "text-blue-500",
  },
  {
    title: "Meal Plan",
    url: "/dashboard/meal-plan",
    icon: Utensils,
    color: "text-green-500",
  },  {
    title: "Delivery Tracker",
    url: "/dashboard/delivery-tracker",
    icon: Baby,
    color: "text-pink-500",
    premium: true,
  },{
    title: "Doctor Appointments",
    url: "/dashboard/doctors",
    icon: Stethoscope,
    color: "text-purple-500",
    premium: true,
  },
  {
    title: "Subscriptions",
    url: "/dashboard/subscriptions",
    icon: Crown,
    color: "text-yellow-500",
  },
  {
    title: "AI Assistant",
    url: "/dashboard/chatbot",
    icon: MessageSquare,
    color: "text-cyan-500",
  },
]

const trimesterItems = [
  {
    title: "First Trimester",
    url: "/dashboard/trimester/1",
    icon: Baby,
    color: "text-green-500",
  },
  {
    title: "Second Trimester",
    url: "/dashboard/trimester/2",
    icon: Baby,
    color: "text-blue-500",
  },
  {
    title: "Third Trimester",
    url: "/dashboard/trimester/3",
    icon: Baby,
    color: "text-purple-500",
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { isPremium } = useSubscription()

  return (
    <Sidebar className="glass-effect border-r border-white/20 dark:border-gray-700/20">
      <SidebarHeader className="border-b border-white/20 dark:border-gray-700/20">
        <div className="flex items-center space-x-3 px-4 py-6">
          <div className="relative">
            <Baby className="h-10 w-10 text-pink-500 animate-float" />
            <Sparkles className="h-4 w-4 text-purple-400 absolute -top-1 -right-1 animate-pulse-soft" />
          </div>
          <span className="text-2xl font-bold text-gradient">Aahar</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-semibold text-gray-600 dark:text-gray-400 px-2 py-3">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.url}>
                    <SidebarMenuButton
                      isActive={pathname === item.url}
                      className="rounded-xl hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-200 data-[active=true]:bg-gradient-to-r data-[active=true]:from-pink-100 data-[active=true]:to-purple-100 dark:data-[active=true]:from-pink-900/30 dark:data-[active=true]:to-purple-900/30 data-[active=true]:text-pink-700 dark:data-[active=true]:text-pink-300"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-3">
                          <item.icon className={`h-5 w-5 ${item.color}`} />
                          <span className="font-medium">{item.title}</span>
                        </div>
                        {item.premium && !isPremium && (
                          <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-2 py-0.5 ml-2">
                            <Crown className="h-3 w-3 mr-1" />
                            Pro
                          </Badge>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-semibold text-gray-600 dark:text-gray-400 px-2 py-3">
            Trimester Guides
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">              {trimesterItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.url}>
                    <SidebarMenuButton
                      isActive={pathname === item.url}
                      className="rounded-xl hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-200 data-[active=true]:bg-gradient-to-r data-[active=true]:from-pink-100 data-[active=true]:to-purple-100 dark:data-[active=true]:from-pink-900/30 dark:data-[active=true]:to-purple-900/30 data-[active=true]:text-pink-700 dark:data-[active=true]:text-pink-300"
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                        <span className="font-medium">{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/20 dark:border-gray-700/20">
        <div className="p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center">
            Made with <Heart className="h-3 w-3 mx-1 text-red-500 animate-pulse-soft" /> for expecting mothers
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
