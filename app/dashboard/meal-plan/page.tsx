"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, ChefHat, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
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
import { trimesterRecipes } from "@/lib/utils"
import { 
  getSavedRecipesFromSupabase, 
  removeRecipeFromSupabase 
} from "@/lib/saved-recipes-service"

// Add a Recipe type for type safety
interface Recipe {
  id: number;
  name: string;
  time: string;
  category?: string;
  trimester?: number;
  liked?: boolean;
  premium?: boolean;
  ingredients?: string[];
  instructions?: string[];
  nutrients?: string[];
  tips?: string[];
  safetyNotes?: string[];
  pregnancyBenefits?: string;
  image?: string;
  servings?: number;
  calories?: number;
  difficulty?: string;
}

function setSavedRecipesToStorage(recipes: Recipe[]) {
  // This function is no longer needed as we use Supabase
  // Keeping for backwards compatibility but it does nothing
  return
}

export default function MealPlanPage() {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([])
  const [likedRecipes, setLikedRecipes] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [newRecipeName, setNewRecipeName] = useState("")
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  // Load saved recipes from Supabase on mount
  useEffect(() => {
    const loadSavedRecipes = async () => {
      setLoading(true)
      try {
        const result = await getSavedRecipesFromSupabase()
        if (result.success) {
          setSavedRecipes(result.data)
          // Initialize liked recipes
          const liked = result.data.filter((recipe: Recipe) => recipe.liked).map((recipe: Recipe) => recipe.id)
          setLikedRecipes(liked)
        } else {
          console.error('Failed to load saved recipes:', result.error)
          toast({
            title: "Error loading recipes",
            description: "Failed to load your saved recipes. Please try again.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error('Error loading saved recipes:', error)
        toast({
          title: "Error loading recipes",
          description: "Failed to load your saved recipes. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadSavedRecipes()
  }, [toast])

  const handleRemoveRecipe = async (recipeId: number) => {
    try {
      const result = await removeRecipeFromSupabase(recipeId)
      if (result.success) {
        const updated = savedRecipes.filter((recipe: Recipe) => recipe.id !== recipeId)
        setSavedRecipes(updated)
        toast({
          title: "Recipe removed",
          description: "Recipe has been removed from your meal plan.",
        })
      } else {
        toast({
          title: "Error removing recipe",
          description: "Failed to remove recipe. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error removing recipe:', error)
      toast({
        title: "Error removing recipe",
        description: "Failed to remove recipe. Please try again.",
        variant: "destructive",
      })
    }
  }
  const handleClearAllRecipes = async () => {
    try {
      // Remove all recipes from Supabase one by one
      const removePromises = savedRecipes.map(recipe => removeRecipeFromSupabase(recipe.id))
      await Promise.all(removePromises)
      
      setSavedRecipes([])
      toast({
        title: "All recipes cleared",
        description: "All saved recipes have been removed from your meal plan.",
      })
    } catch (error) {
      console.error('Error clearing all recipes:', error)
      toast({
        title: "Error clearing recipes",
        description: "Failed to clear all recipes. Please try again.",
        variant: "destructive",
      })
    }
  }
  const handleToggleLike = (recipeId: number) => {
    setLikedRecipes((prev: number[]) => (prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]))
    setSavedRecipes((prev: Recipe[]) =>
      prev.map((recipe: Recipe) => (recipe.id === recipeId ? { ...recipe, liked: !recipe.liked } : recipe)),
    )
    // Note: This only updates local state. To persist liked state to Supabase,
    // you would need to add a "liked" column to the saved_recipes table and update it here.
  }

  const filteredRecipes = savedRecipes.filter(
  (recipe: Recipe) =>
    recipe.name?.toLowerCase().includes(searchTerm.toLowerCase())
);


  const getCategoryColor = (category: string) => {
    const colors = {
      Breakfast: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      "Main Course": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Salad: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Dessert: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }
  const getRecipeDetails = (id: number): Recipe | undefined => {
    // Find the saved recipe and the full trimester recipe
    const saved = savedRecipes.find((r: any) => Number(r.id) === Number(id));
    const full = Array.isArray(trimesterRecipes)
      ? trimesterRecipes.find((r: any) => Number(r.id) === Number(id))
      : undefined;
    
    if (!saved) return undefined; // Only show details if recipe is actually saved
    
    // If we have both saved and full recipe data, merge them
    if (full && typeof full === 'object') {
      return {
        ...full,
        ...saved,
        // Use full recipe data for arrays if saved doesn't have them
        ingredients: Array.isArray(saved.ingredients) && saved.ingredients.length > 0 
          ? saved.ingredients 
          : Array.isArray(full.ingredients) ? full.ingredients : [],
        instructions: Array.isArray(saved.instructions) && saved.instructions.length > 0 
          ? saved.instructions 
          : Array.isArray(full.instructions) ? full.instructions : [],
        nutrients: Array.isArray(saved.nutrients) && saved.nutrients.length > 0 
          ? saved.nutrients 
          : Array.isArray(full.nutrients) ? full.nutrients : [],
        tips: Array.isArray(saved.tips) && saved.tips.length > 0 
          ? saved.tips 
          : Array.isArray(full.tips) ? full.tips : [],
        safetyNotes: Array.isArray(saved.safetyNotes) && saved.safetyNotes.length > 0 
          ? saved.safetyNotes 
          : Array.isArray(full.safetyNotes) ? full.safetyNotes : [],
        pregnancyBenefits: saved.pregnancyBenefits || full.pregnancyBenefits || '',
        image: saved.image || full.image || '',
        servings: saved.servings || full.servings || 1,
        calories: saved.calories || full.calories || 0,
        difficulty: saved.difficulty || full.difficulty || 'Easy',
      } as Recipe;
    }
    
    // If we only have saved data, return that
    return saved as Recipe;
  }

  return (
    <div className="space-y-6">      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Meal Plan</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Organize your saved recipes and plan your weekly meals
          </p>
        </div>
        {savedRecipes.length > 0 && (
          <Button 
            variant="outline" 
            onClick={handleClearAllRecipes}
            className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
          >
            Clear All Recipes
          </Button>
        )}
      </div>

      <Tabs defaultValue="saved" className="space-y-4">
        <TabsList>
          <TabsTrigger value="saved">Saved Recipes ({filteredRecipes.length})</TabsTrigger>
        </TabsList>        <TabsContent value="saved" className="space-y-4">
          {loading ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading your saved recipes...</p>
              </CardContent>
            </Card>
          ) : filteredRecipes.length === 0 ? (
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
                      {recipe.category && (
                        <Badge className={getCategoryColor(recipe.category)}>{recipe.category}</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{recipe.time}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="rounded-full font-bold bg-white dark:bg-gray-900 text-pink-600 dark:text-pink-400 border border-pink-200 dark:border-pink-700 shadow transition-transform duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 flex items-center gap-2 px-4 py-2"
                            >
                              <ChefHat className="h-5 w-5 mr-1 text-pink-500" />
                              <span className="tracking-wide">View Recipe</span>
                            </Button>
                          </DialogTrigger>                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            {getRecipeDetails(recipe.id) ? (
                              <div>
                                {/* Removed Add to Shopping List and Print Recipe buttons */}
                                <DialogHeader>
                                  <DialogTitle className="text-3xl font-bold text-gradient flex items-center space-x-3">
                                    <ChefHat className="h-8 w-8 text-pink-500" />
                                    <span>{getRecipeDetails(recipe.id)?.name}</span>
                                  </DialogTitle>
                                </DialogHeader>
                                <Tabs defaultValue="overview" className="space-y-6">
                                  <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                                    <TabsTrigger value="instructions">Instructions</TabsTrigger>
                                    <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                                  </TabsList>
                                  <TabsContent value="overview" className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                      <Card className="glass-effect border-0">
                                        <CardContent className="pt-6">
                                          <img
                                            src={getRecipeDetails(recipe.id)?.image || "/placeholder.svg"}
                                            alt={getRecipeDetails(recipe.id)?.name}
                                            className="w-full h-48 object-cover rounded-xl mb-4"
                                          />
                                          <div className="grid grid-cols-2 gap-4 text-center">
                                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-3">
                                              <Clock className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                                              <div className="font-semibold">{getRecipeDetails(recipe.id)?.time}</div>
                                              <div className="text-xs text-gray-500">Prep + Cook</div>
                                            </div>
                                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-3">
                                              <span className="h-5 w-5 mx-auto mb-1 text-green-500 flex items-center justify-center">🍽️</span>
                                              <div className="font-semibold">{getRecipeDetails(recipe.id)?.servings}</div>
                                              <div className="text-xs text-gray-500">Servings</div>
                                            </div>
                                            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-3">
                                              <span className="h-5 w-5 mx-auto mb-1 text-orange-500 flex items-center justify-center">🔥</span>
                                              <div className="font-semibold">{getRecipeDetails(recipe.id)?.calories}</div>
                                              <div className="text-xs text-gray-500">Calories</div>
                                            </div>
                                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-3">
                                              <span className="h-5 w-5 mx-auto mb-1 text-purple-500 flex items-center justify-center">⭐</span>
                                              <div className="font-semibold">{getRecipeDetails(recipe.id)?.difficulty || "Easy"}</div>
                                              <div className="text-xs text-gray-500">Difficulty</div>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                      <div className="space-y-4">
                                        <Card className="glass-effect border-0">
                                          <CardHeader>
                                            <CardTitle className="flex items-center space-x-2">
                                              <span>Pregnancy Benefits</span>
                                            </CardTitle>
                                          </CardHeader>
                                          <CardContent>
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                              {getRecipeDetails(recipe.id)?.pregnancyBenefits}
                                            </p>
                                          </CardContent>
                                        </Card>
                                        <Card className="glass-effect border-0">
                                          <CardHeader>
                                            <CardTitle className="flex items-center space-x-2">
                                              <span className="h-5 w-5 text-yellow-500 flex items-center justify-center">💡</span>
                                              <span>Pro Tips</span>
                                            </CardTitle>
                                          </CardHeader>
                                          <CardContent>
                                            <ul className="space-y-2">
                                              {getRecipeDetails(recipe.id)?.tips?.map((tip: string, idx: number) => (
                                                <li key={idx} className="flex items-start space-x-2">
                                                  <span className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0">✔️</span>
                                                  <span className="text-sm">{tip}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          </CardContent>
                                        </Card>
                                      </div>
                                    </div>
                                  </TabsContent>
                                  <TabsContent value="ingredients" className="space-y-4">
                                    <Card className="glass-effect border-0">
                                      <CardHeader>
                                        <CardTitle className="text-2xl">Ingredients</CardTitle>
                                        <div className="text-gray-500 text-sm mb-2">Everything you need for {getRecipeDetails(recipe.id)?.servings} servings</div>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="grid md:grid-cols-2 gap-4">
                                          {(getRecipeDetails(recipe.id)?.ingredients ?? []).map((ingredient: string, idx: number) => (
                                            <div
                                              key={idx}
                                              className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl"
                                            >
                                              <span className="h-5 w-5 text-green-500 flex-shrink-0">✔️</span>
                                              <span>{ingredient}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </TabsContent>
                                  <TabsContent value="instructions" className="space-y-4">
                                    <Card className="glass-effect border-0">
                                      <CardHeader>
                                        <CardTitle className="text-2xl">Cooking Instructions</CardTitle>
                                        <div className="text-gray-500 text-sm mb-2">Step-by-step guide to perfect results</div>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="space-y-4">
                                          {(getRecipeDetails(recipe.id)?.instructions ?? []).map((instruction: string, idx: number) => (
                                            <div key={idx} className="flex space-x-4">
                                              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                                {idx + 1}
                                              </div>
                                              <div className="flex-1 pt-1">
                                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{instruction}</p>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </CardContent>
                                    </Card>
                                    {getRecipeDetails(recipe.id)?.safetyNotes && (
                                      <Card className="glass-effect border-0 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
                                        <CardHeader>
                                          <CardTitle className="flex items-center space-x-2 text-orange-700 dark:text-orange-300">
                                            <span>Pregnancy Safety Notes</span>
                                          </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <ul className="space-y-2">
                                            {(getRecipeDetails(recipe.id)?.safetyNotes ?? []).map((note: string, idx: number) => (
                                              <li key={idx} className="flex items-start space-x-2">
                                                <span className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0">⚠️</span>
                                                <span className="text-sm text-orange-700 dark:text-orange-300">{note}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        </CardContent>
                                      </Card>
                                    )}
                                  </TabsContent>
                                  <TabsContent value="nutrition" className="space-y-4">
                                    <Card className="glass-effect border-0">
                                      <CardHeader>
                                        <CardTitle className="text-2xl">Nutritional Information</CardTitle>
                                        <div className="text-gray-500 text-sm mb-2">Per serving nutritional breakdown</div>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                          {(getRecipeDetails(recipe.id)?.nutrients ?? []).map((nutrient: string, idx: number) => (
                                            <div
                                              key={idx}
                                              className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 text-center"
                                            >
                                              <div className="font-bold text-lg text-green-700 dark:text-green-300">
                                                {nutrient.split(":")[1]?.trim() || nutrient}
                                              </div>
                                              <div className="text-sm text-green-600 dark:text-green-400">
                                                {nutrient.split(":")[0]?.trim() || "Nutrient"}
                                              </div>
                                            </div>
                                          ))}
                                        </div>                                      </CardContent>
                                    </Card>
                                  </TabsContent>
                                </Tabs>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center p-8">
                                <div className="text-center">
                                  <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                  <p>Loading recipe details...</p>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
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
      </Tabs>
    </div>
  )
}
