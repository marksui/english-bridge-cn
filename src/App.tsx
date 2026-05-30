import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useFavorites } from "./hooks/useFavorites";
import AllWordsPage from "./pages/AllWordsPage";
import CategoryPage from "./pages/CategoryPage";
import FavoritesPage from "./pages/FavoritesPage";
import Home from "./pages/Home";

export default function App() {
  const favorites = useFavorites();

  return (
    <div className="min-h-screen text-ink">
      <Navbar favoriteCount={favorites.favoriteIds.length} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/category/:categoryId"
          element={
            <CategoryPage
              favoriteIds={favorites.favoriteIds}
              onToggleFavorite={favorites.toggleFavorite}
            />
          }
        />
        <Route
          path="/words"
          element={
            <AllWordsPage
              favoriteIds={favorites.favoriteIds}
              onToggleFavorite={favorites.toggleFavorite}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favoriteIds={favorites.favoriteIds}
              onToggleFavorite={favorites.toggleFavorite}
            />
          }
        />
      </Routes>
    </div>
  );
}
