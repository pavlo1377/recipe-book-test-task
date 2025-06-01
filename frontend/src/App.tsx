import { Routes, Route, Navigate } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeInfo from "./components/RecipeInfo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/recipes" />} />
      <Route path="/recipes" element={<RecipeList />} />
      <Route path="/recipes/:id" element={<RecipeInfo />} />
    </Routes>
  );
}

export default App;
