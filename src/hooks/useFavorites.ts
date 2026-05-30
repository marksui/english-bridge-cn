import { useCallback, useEffect, useState } from "react";

const FAVORITES_KEY = "daily-english-cn:favorites";

function readFavorites() {
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(readFavorites);

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((current) =>
      current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id],
    );
  }, []);

  return { favoriteIds, toggleFavorite };
}
