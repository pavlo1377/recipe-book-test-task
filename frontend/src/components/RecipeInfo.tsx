import { useParams, useNavigate } from "react-router-dom";
import styles from "./RecipeInfo.module.css";
import { useEffect, useState } from "react";
import Sidebar from "../ui/Sidebar";
import {
  fetchRecipeById,
  type Recipe,
  fetchRecipes,
} from "../services/recipeApi";
import Loader from "../ui/Loader";

export default function RecipeInfo() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [categoryRecipes, setCategoryRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const loadRecipe = async (recipeId: string) => {
      try {
        setIsLoading(true);
        const data = await fetchRecipeById(recipeId);
        if (!data) {
          setError("Recipe not found");
          setRecipe(null);
        } else {
          setRecipe(data);
          setError(null);
        }
      } catch {
        setError("Failed to fetch recipe");
      } finally {
        setIsLoading(false);
      }
    };
    loadRecipe(id);
  }, [id]);

  useEffect(() => {
    const loadCategoryRecipes = async () => {
      if (!recipe?.strCategory) return;

      try {
        const recipes = await fetchRecipes({ category: recipe.strCategory });
        setCategoryRecipes(recipes);
      } catch {
        console.error("Failed to fetch category recipes");
      }
    };

    loadCategoryRecipes();
  }, [recipe]);

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (error) {
    return <div className={styles.notFound}>{error}</div>;
  }

  if (!recipe) {
    return <div className={styles.notFound}>Recipe not found</div>;
  }

  const onAreaClick = () => {
    navigate(`/recipes?area=${recipe.strArea}`);
  };

  const onIngredientClick = (ingredient: string) => {
    navigate(`/recipes?ingredient=${ingredient}`);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContent}>
        <div className={styles.card}>
          <img
            className={styles.img}
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
          />

          <div className={styles.details}>
            <h2 className={styles.title}>{recipe.strMeal}</h2>

            <p className={styles.clickable} onClick={onAreaClick}>
              {recipe.strArea}
            </p>

            <p className={styles.instructions}>{recipe.strInstructions}</p>

            <h3>Ingredients:</h3>
            <ul className={styles.ingredientsList}>
              {recipe.ingredients.map(({ ingredient, measure }) => (
                <li
                  key={ingredient}
                  className={styles.clickable}
                  onClick={() => onIngredientClick(ingredient)}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  {ingredient} - {measure}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Sidebar recipes={categoryRecipes} currentRecipeId={recipe.idMeal} />
    </div>
  );
}
