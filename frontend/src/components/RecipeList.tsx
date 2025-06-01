import { useEffect, useState } from "react";
import RecipeListItem from "./RecipeListItem";
import { fetchRecipes } from "../services/recipeApi";
import type { Recipe } from "../services/recipeApi";
import { useSearchParams } from "react-router-dom";
import styles from "./RecipeList.module.css";
import Loader from "../ui/Loader";

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const ingredient = searchParams.get("ingredient");
  const area = searchParams.get("area");

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchRecipes({
          ingredient: ingredient || undefined,
          area: area || undefined,
        });
        setRecipes(data || []);
        setError(null);
      } catch {
        setError("Failed to load recipes");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [ingredient, area]);

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!recipes.length) return <div>No recipes found</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Recipe Book</h1>
      <p className={styles.subheading}>Available recipes:</p>
      <ul className={styles.grid}>
        {recipes.map((recipe) => (
          <RecipeListItem key={recipe.idMeal} data={recipe} />
        ))}
      </ul>
    </div>
  );
}
