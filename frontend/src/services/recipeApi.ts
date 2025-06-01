import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export type Ingredient = {
  ingredient: string;
  measure: string;
  category: string;
};

export type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  ingredients: Ingredient[];
};

export const fetchRecipes = async (filters?: {
  ingredient?: string;
  area?: string;
  category?: string;
}): Promise<Recipe[]> => {
  const params = new URLSearchParams();

  if (filters?.ingredient) {
    params.append("ingredient", filters.ingredient);
  }
  if (filters?.area) {
    params.append("area", filters.area);
  }
  if (filters?.category) {
    params.append("category", filters.category);
  }

  const queryString = params.toString();
  const res = await axios.get(
    `${API_URL}/recipes${queryString ? `?${queryString}` : ""}`
  );
  return res.data;
};

export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  const res = await axios.get(`${API_URL}/recipes/${id}`);
  return res.data;
};
