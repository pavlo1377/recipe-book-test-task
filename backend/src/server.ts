import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recipesRouter from "./routes/recipes"; // Вкажи правильний шлях до твого файлу з роутером


dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/recipes", recipesRouter);




app.get("/", (req, res) => {
  res.send("API is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
