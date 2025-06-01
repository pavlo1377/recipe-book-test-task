import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import type { Recipe } from "../services/recipeApi";

type SidebarProps = {
  recipes: Recipe[];
  currentRecipeId: string;
};

export default function Sidebar({ recipes, currentRecipeId }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <aside className={styles.sidebar}>
      <h3>More from this category:</h3>
      <ul className={styles.recipeList}>
        {recipes
          .filter((r) => r.idMeal !== currentRecipeId)
          .slice(0, 5)
          .map((r) => (
            <li
              key={r.idMeal}
              className={styles.recipeItem}
              onClick={() => navigate(`/recipes/${r.idMeal}`)}
            >
              <img src={r.strMealThumb} alt={r.strMeal} />
              <span>{r.strMeal}</span>
            </li>
          ))}
      </ul>
    </aside>
  );
}
