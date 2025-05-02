import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"
import { FavoritesSliceType } from "./favoritesSlice"

export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks
    selectedRecipe: Recipe
    modal: boolean
    loadingCategories: boolean
    loadingDrinks: boolean
    loadingDrink: boolean
    fecthCategories: () => Promise<void>
    searchRecipes: (SearchFilters: SearchFilter) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
}
export const createRecipesSlice: StateCreator<RecipesSliceType & FavoritesSliceType, [], [], RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    modal: false,
    loadingCategories: false,
    loadingDrinks: false,
    loadingDrink: false,
    selectedRecipe: {} as Recipe,
    fecthCategories: async () => {
        set({ loadingCategories: true })
        const categories = await getCategories()
        set({
            loadingCategories: false,
            categories
        })
    },
    searchRecipes: async (filters) => {
        set({loadingDrinks: true})
        const drinks = await getRecipes(filters)
        set({
            drinks,
            loadingDrinks: false
        })
        
    },
    selectRecipe: async (id) => {
        set({ loadingDrink: true })
        const selectedRecipe = await getRecipeById(id)
        set({
            selectedRecipe,
            modal: true,
            loadingDrink: false
        })
    },
    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {} as Recipe
        })
    }
})