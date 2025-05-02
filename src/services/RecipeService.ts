import api from "../lib/axios";
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../utils/recipes-schema";
import { Drink, SearchFilter } from "../types";

export async function getCategories() {
    const url: string = '/list.php?c=list'
    const {data} = await api(url)
    const result = CategoriesAPIResponseSchema.safeParse(data)
    if(result.success) {
        return result.data
    }  
}

export async function getRecipes(filters:SearchFilter) {
    const url: string = `/filter.php?c=${filters.category}&i=${filters.ingredient}`
    const {data} = await api(url)
    const result = DrinksAPIResponse.safeParse(data)
    if (result.success) {
        return result.data
    }
}

export async function getRecipeById(id:Drink['idDrink']) {
    const url: string = `/lookup.php?i=${id}`
    const { data } = await api(url)
    const result  = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    
    if (result.success) {
        return result.data
    }
}