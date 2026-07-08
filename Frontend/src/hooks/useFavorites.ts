import { useEffect, useMemo, useState } from "react";
import { loadFavoriteCities, saveFavoriteCities } from "../storage/favoriteStorage";
import { FavoriteCity } from "../types/favorite";

const DEFAULT_USER_ID = "demo-user";

export function useFavorites(currentCity?: string) {
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);

  const isCurrentCityFavorite = useMemo(
    () => favorites.some((favorite) => sameCity(favorite.nome, currentCity)),
    [currentCity, favorites]
  );

  useEffect(() => {
    loadFavoriteCities().then(setFavorites).catch(() => setFavorites([]));
  }, []);

  async function persist(nextFavorites: FavoriteCity[]) {
    setFavorites(nextFavorites);
    await saveFavoriteCities(nextFavorites);
  }

  async function addFavorite(city: string) {
    if (!city.trim() || favorites.some((favorite) => sameCity(favorite.nome, city))) {
      return;
    }

    await persist([
      {
        id: Date.now(),
        nome: city.trim(),
        usuarioId: DEFAULT_USER_ID,
        highlighted: favorites.length === 0
      },
      ...favorites
    ]);
  }

  async function removeFavorite(id: number) {
    await persist(favorites.filter((favorite) => favorite.id !== id));
  }

  async function highlightFavorite(id: number) {
    await persist(
      favorites.map((favorite) => ({
        ...favorite,
        highlighted: favorite.id === id
      }))
    );
  }

  return {
    favorites,
    isCurrentCityFavorite,
    addFavorite,
    removeFavorite,
    highlightFavorite
  };
}

function sameCity(left?: string, right?: string) {
  return Boolean(left && right && left.trim().toLowerCase() === right.trim().toLowerCase());
}
