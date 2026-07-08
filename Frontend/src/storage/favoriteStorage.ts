import AsyncStorage from "@react-native-async-storage/async-storage";
import { FavoriteCity } from "../types/favorite";

const STORAGE_KEY = "@allrisk-weather:favorites";

export async function loadFavoriteCities(): Promise<FavoriteCity[]> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  return stored ? (JSON.parse(stored) as FavoriteCity[]) : [];
}

export async function saveFavoriteCities(favorites: FavoriteCity[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}
