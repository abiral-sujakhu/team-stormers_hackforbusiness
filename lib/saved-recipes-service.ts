import { supabase } from './supabaseClient'

export interface SavedRecipe {
  id?: number
  user_id: string
  recipe_id: number
  recipe_data: any
  created_at?: string
  updated_at?: string
}

// Save a recipe to Supabase
export async function saveRecipeToSupabase(recipeId: number, recipeData: any) {
  try {
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      throw new Error('User not authenticated')
    }

    // Insert or update the saved recipe
    const { data, error } = await supabase
      .from('saved_recipes')
      .upsert({
        user_id: user.id,
        recipe_id: recipeId,
        recipe_data: recipeData,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,recipe_id'
      })
      .select()

    if (error) {
      throw error
    }

    return { success: true, data }  } catch (error) {
    console.error('Error saving recipe:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Remove a recipe from Supabase
export async function removeRecipeFromSupabase(recipeId: number) {
  try {
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      throw new Error('User not authenticated')
    }

    const { error } = await supabase
      .from('saved_recipes')
      .delete()
      .eq('user_id', user.id)
      .eq('recipe_id', recipeId)

    if (error) {
      throw error
    }

    return { success: true }  } catch (error) {
    console.error('Error removing recipe:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Get all saved recipes for current user
export async function getSavedRecipesFromSupabase() {
  try {
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return { success: false, error: 'User not authenticated', data: [] }
    }

    const { data, error } = await supabase
      .from('saved_recipes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    // Extract just the recipe data from each saved recipe
    const recipes = data.map(item => item.recipe_data)
    
    return { success: true, data: recipes }  } catch (error) {
    console.error('Error fetching saved recipes:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error', data: [] }
  }
}

// Check if a recipe is saved by current user
export async function isRecipeSaved(recipeId: number) {
  try {
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return { success: false, error: 'User not authenticated', isSaved: false }
    }

    const { data, error } = await supabase
      .from('saved_recipes')
      .select('id')
      .eq('user_id', user.id)
      .eq('recipe_id', recipeId)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" which is ok
      throw error
    }

    return { success: true, isSaved: !!data }  } catch (error) {
    console.error('Error checking if recipe is saved:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error', isSaved: false }
  }
}
