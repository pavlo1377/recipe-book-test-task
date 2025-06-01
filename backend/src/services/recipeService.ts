import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

type FilterParams = {
  ingredient?: string;
  category?: string;
  area?: string;
};

export const getRecipes = async ({
  ingredient,
  category,
  area,
}: FilterParams) => {
  try {
    if (ingredient) {
      const res = await axios.get(`${BASE_URL}/filter.php?i=${ingredient}`);
      return res.data.meals;
    }

    if (category) {
      const res = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
      return res.data.meals;
    }

    if (area) {
      const res = await axios.get(`${BASE_URL}/filter.php?a=${area}`);
      return res.data.meals;
    }

    const res = await axios.get(`${BASE_URL}/search.php?s=`);
    return res.data.meals;
  } catch (err) {
    throw new Error("API call failed");
  }
};

export const getRecipeById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);

  const meal = response.data.meals?.[0];

  if (!meal) return null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() || "",
      });
    }
  }

  return {
    idMeal: meal.idMeal,
    strMeal: meal.strMeal,
    strMealThumb: meal.strMealThumb,
    strCategory: meal.strCategory,
    strArea: meal.strArea,
    strInstructions: meal.strInstructions,
    ingredients,
  };
};
