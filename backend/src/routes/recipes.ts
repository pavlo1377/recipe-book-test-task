import express, { Request, Response } from "express";
import { getRecipeById, getRecipes } from "../services/recipeService";

const router = express.Router();

// GET /recipes?ingredient=chicken&category=Seafood&area=Canadian
router.get("/", async (req: Request, res: Response) => {
  try {
    const { ingredient, category, area } = req.query;
    const recipes = await getRecipes({
      ingredient: ingredient as string,
      category: category as string,
      area: area as string,
    });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const recipe = await getRecipeById(id);

    if (!recipe) {
      res.status(404).json({ message: "Recipe not found" });
      return;
    }

    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;