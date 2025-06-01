import { Link } from "react-router-dom";
import styles from "./RecipeListItem.module.css";
import type { Recipe } from "../services/recipeApi";

type RecipeListItemProps = {
  data: Recipe;
};

export default function RecipeListItem({ data }: RecipeListItemProps) {
  return (
    <li className={styles.card}>
      <Link to={`/recipes/${data.idMeal}`}>
        <img
          src={data.strMealThumb}
          alt={data.strMeal}
          className={styles.image}
        />
        <div className={styles.title}>{data.strMeal}</div>
      </Link>
    </li>
  );
}
