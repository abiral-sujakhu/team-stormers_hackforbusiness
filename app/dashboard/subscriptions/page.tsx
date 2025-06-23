"use client";

import { useEffect } from "react";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Calendar, MessageSquare, Stethoscope, Baby, Sparkles } from "lucide-react";
import { useSubscription } from "@/components/subscription-provider";
import { useToast } from "@/hooks/use-toast";
import { SubscriptionManager } from "@/lib/subscription-manager";

// Plan structure
const plans = [
  {
    name: "Premium Monthly",
    price: "Rs. 249",
    period: "month",
    description: "Full access to all features, billed monthly.",
    features: ["All app features included"],
    popular: true,
    subscriptionType: "premium_monthly",
    limitations: [],
  },
  {
    name: "Golden Trimester Pack",
    price: "Rs. 1399",
    period: "whole pregnancy",
    description: "Full access for your entire pregnancy (all 3 trimesters) at a discounted price.",
    features: ["All app features included"],
    bestValue: true,
    subscriptionType: "Golden Trimester Pack",
    limitations: [],
  },
  {
    name: "Trimester Subscription",
    price: "Rs. 599",
    period: "trimester",
    description: "Full access to all features, billed per trimester.",
    features: ["All app features included"],
    subscriptionType: "trimester",
    limitations: [],
  },
];

export default function SubscriptionsPage() {
  const { isPremium, refreshSubscriptionStatus, subscriptionDetails } = useSubscription();
  const { toast } = useToast();

  useEffect(() => {
    refreshSubscriptionStatus();
  }, [refreshSubscriptionStatus]);

  // Instantly unlock premium on upgrade
  const handleInstantUpgrade = (planName: string, subscriptionType: string) => {
    // You can fetch the current user's email if you have authentication
    SubscriptionManager.setPremiumStatus("user@example.com", true, subscriptionType);
    toast({
      title: "🎉 Welcome to Premium!",
      description: `You've successfully upgraded to ${planName}. All premium features are now unlocked!`
    });
    refreshSubscriptionStatus();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Choose Your Plan</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Unlock premium features to enhance your pregnancy nutrition journey
        </p>
      </div>

      {isPremium && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Crown className="h-5 w-5 text-purple-600" />
              <span>Premium Active</span>
              <Sparkles className="h-4 w-4 text-purple-500 animate-pulse" />
            </CardTitle>
            <CardDescription>
              You're currently enjoying all premium features. Thank you for choosing Aahar Premium!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge className="bg-purple-600 text-white">
                  {subscriptionDetails?.subscriptionType || "Premium"}
                </Badge>
                <span className="text-sm text-purple-700 dark:text-purple-300">
                  All premium features unlocked
                </span>
              </div>
              {subscriptionDetails?.expiresAt && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Expires: {new Date(subscriptionDetails.expiresAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, index) => {
          const isCurrentPlan = isPremium && subscriptionDetails?.subscriptionType === plan.subscriptionType;
          const showUpgradeButton = !isPremium || (isPremium && !isCurrentPlan);

          return (
            <Card
              key={index}
              className={`relative ${plan.popular ? "border-purple-500 shadow-lg scale-105" : ""} ${
                plan.bestValue ? "border-green-500 shadow-lg" : ""
              } ${isCurrentPlan ? "ring-2 ring-purple-500 bg-purple-50/50 dark:bg-purple-900/10" : ""}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600">
                  Most Popular
                </Badge>
              )}
              {plan.bestValue && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-600">
                  Best Value
                </Badge>
              )}
              {isCurrentPlan && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600">
                  Current Plan
                </Badge>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
                  </div>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {Array.isArray(plan.limitations) && plan.limitations.length > 0 && (
                  <div className="space-y-2 pt-4 border-t">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Limitations:</p>
                    {plan.limitations.map((limitation, limitIndex) => (
                      <div key={limitIndex} className="flex items-center space-x-2">
                        <div className="h-4 w-4 flex-shrink-0 flex items-center justify-center">
                          <div className="h-1 w-3 bg-gray-400 rounded"></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-4">
                  {isCurrentPlan ? (
                    <Button variant="outline" className="w-full" disabled>
                      <Crown className="h-4 w-4 mr-2" />
                      Current Plan
                    </Button>
                  ) : showUpgradeButton ? (
                    <Button
                      className="w-full"
                      onClick={() => handleInstantUpgrade(plan.name, plan.subscriptionType)}
                      variant={plan.popular || plan.bestValue || plan.subscriptionType === "trimester" ? "default" : "outline"}
                    >
                      {`Upgrade to ${plan.name}`}
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Premium Active
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Premium Features Showcase */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
        <Card className="text-center">
          <CardHeader>
            <Stethoscope className="h-8 w-8 text-blue-600 mx-auto" />
            <CardTitle className="text-lg">Doctor Consultations</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Book appointments with certified nutritionists and doctors
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Baby className="h-8 w-8 text-pink-600 mx-auto" />
            <CardTitle className="text-lg">Delivery Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Track your baby's development and delivery preparations
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <MessageSquare className="h-8 w-8 text-green-600 mx-auto" />
            <CardTitle className="text-lg">Priority AI Support</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Get instant, detailed responses from our AI nutrition assistant
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Calendar className="h-8 w-8 text-purple-600 mx-auto" />
            <CardTitle className="text-lg">Advanced Planning</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Create detailed meal plans with shopping lists and prep guides
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
