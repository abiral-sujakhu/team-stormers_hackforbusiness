"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, ChefHat, Trash2, Heart, Plus, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"

const mockSavedRecipes = [
  {
    id: 1,
    name: "Spinach and Lentil Curry",
    difficulty: "Easy",
    time: "30 min",
    category: "Main Course",
    trimester: 1,
    liked: true,
  },
  {
    id: 4,
    name: "Bean and Vegetable Stew",
    difficulty: "Easy",
    time: "45 min",
    category: "Main Course",
    trimester: 1,
    liked: false,
  },
  {
    id: 7,
    name: "Creamy Spinach Smoothie",
    difficulty: "Easy",
    time: "10 min",
    category: "Breakfast",
    trimester: 2,
    liked: true,
  },
  {
    id: 10,
    name: "Herb-Roasted Chicken",
    difficulty: "Medium",
    time: "60 min",
    category: "Main Course",
    trimester: 2,
    liked: false,
  },
  {
    id: 14,
    name: "Chia Seed Pudding",
    difficulty: "Easy",
    time: "10 min",
    category: "Dessert",
    trimester: 3,
    liked: true,
  },
  {
    id: 16,
    name: "Massaged Kale Salad",
    difficulty: "Easy",
    time: "15 min",
    category: "Salad",
    trimester: 3,
    liked: false,
  },
]

const weeklyPlan = {
  monday: [
    { meal: "Breakfast", recipe: "Creamy Spinach Smoothie", time: "10 min" },
    { meal: "Lunch", recipe: "Massaged Kale Salad", time: "15 min" },
    { meal: "Dinner", recipe: "Herb-Roasted Chicken", time: "60 min" },
  ],
  tuesday: [
    { meal: "Breakfast", recipe: "Chia Seed Pudding", time: "10 min" },
    { meal: "Lunch", recipe: "Bean and Vegetable Stew", time: "45 min" },
    { meal: "Dinner", recipe: "Spinach and Lentil Curry", time: "30 min" },
  ],
  wednesday: [
    { meal: "Breakfast", recipe: "Creamy Spinach Smoothie", time: "10 min" },
    { meal: "Lunch", recipe: "Massaged Kale Salad", time: "15 min" },
    { meal: "Dinner", recipe: "Herb-Roasted Chicken", time: "60 min" },
  ],
}

export default function MealPlanPage() {
  const [savedRecipes, setSavedRecipes] = useState(mockSavedRecipes)
  const [likedRecipes, setLikedRecipes] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [newRecipeName, setNewRecipeName] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Initialize liked recipes
    const liked = savedRecipes.filter((recipe) => recipe.liked).map((recipe) => recipe.id)
    setLikedRecipes(liked)
  }, [])

  const handleRemoveRecipe = (recipeId: number) => {
    setSavedRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId))
    toast({
      title: "Recipe removed",
      description: "Recipe has been removed from your meal plan.",
    })
  }

  const handleToggleLike = (recipeId: number) => {
    setLikedRecipes((prev) => (prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]))
    setSavedRecipes((prev) =>
      prev.map((recipe) => (recipe.id === recipeId ? { ...recipe, liked: !recipe.liked } : recipe)),
    )
  }

  const handleAddRecipe = () => {
    if (!newRecipeName.trim()) return

    const newRecipe = {
      id: Date.now(),
      name: newRecipeName,
      difficulty: "Easy",
      time: "30 min",
      category: "Main Course",
      trimester: 2,
      liked: false,
    }

    setSavedRecipes((prev) => [...prev, newRecipe])
    setNewRecipeName("")
    toast({
      title: "Recipe added!",
      description: "New recipe has been added to your meal plan.",
    })
  }

  const handleGenerateMealPlan = () => {
    toast({
      title: "Meal plan generated!",
      description: "A new weekly meal plan has been created based on your preferences.",
    })
  }

  const handleExportShoppingList = () => {
    toast({
      title: "Shopping list exported!",
      description: "Your shopping list has been downloaded.",
    })
  }

  const filteredRecipes = savedRecipes.filter((recipe) => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getCategoryColor = (category: string) => {
    const colors = {
      Breakfast: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      "Main Course": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Salad: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Dessert: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Meal Plan</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Organize your saved recipes and plan your weekly meals
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleGenerateMealPlan}>
            <Plus className="h-4 w-4 mr-2" />
            Generate Plan
          </Button>
          <Button variant="outline" onClick={handleExportShoppingList}>
            Export Shopping List
          </Button>
        </div>
      </div>

      <Tabs defaultValue="saved" className="space-y-4">
        <TabsList>
          <TabsTrigger value="saved">Saved Recipes ({filteredRecipes.length})</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="space-y-4">
          {/* Search and Add Recipe */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="search">Search recipes</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search your saved recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Recipe
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Recipe</DialogTitle>
                    <DialogDescription>Add a custom recipe to your meal plan</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="recipeName">Recipe Name</Label>
                      <Input
                        id="recipeName"
                        placeholder="Enter recipe name..."
                        value={newRecipeName}
                        onChange={(e) => setNewRecipeName(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddRecipe} className="w-full">
                      Add Recipe
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {filteredRecipes.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ChefHat className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {searchTerm ? "No recipes found" : "No saved recipes yet"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Start exploring trimester-wise nutrition guides to save your favorite recipes!"}
                </p>
                {!searchTerm && (
                  <Link href="/dashboard/trimester/1">
                    <Button>Explore Recipes</Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRecipes.map((recipe) => (
                <Card key={recipe.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{recipe.name}</CardTitle>
                      <Badge className={getCategoryColor(recipe.category)}>{recipe.category}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{recipe.time}</span>
                      </div>
                      <span>{recipe.difficulty}</span>
                      <Badge variant="outline" className="text-xs">
                        T{recipe.trimester}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleToggleLike(recipe.id)} className="p-1">
                          <Heart
                            className={`h-4 w-4 ${
                              likedRecipes.includes(recipe.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                            }`}
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Recipe details",
                              description: "Recipe details would open here.",
                            })
                          }}
                          className="p-1"
                        >
                          View Recipe
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveRecipe(recipe.id)}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">This Week's Meal Plan</h3>
            <div className="space-x-2">
              <Button variant="outline" onClick={handleExportShoppingList}>
                Shopping List
              </Button>
              <Button onClick={handleGenerateMealPlan}>Regenerate Plan</Button>
            </div>
          </div>

          <div className="grid gap-6">
            {Object.entries(weeklyPlan).map(([day, meals]) => (
              <Card key={day}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 capitalize">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span>{day}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {meals.map((meal, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{meal.meal}</h4>
                          <Badge variant="outline" className="text-xs">
                            {meal.time}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{meal.recipe}</p>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              toast({
                                title: "Recipe opened",
                                description: `Opening ${meal.recipe} recipe details.`,
                              })
                            }}
                          >
                            View Recipe
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              toast({
                                title: "Meal replaced",
                                description: "Choose a new recipe for this meal slot.",
                              })
                            }}
                          >
                            Replace
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
