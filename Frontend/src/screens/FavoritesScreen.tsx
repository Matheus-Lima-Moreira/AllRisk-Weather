import { ScrollView } from "react-native";
import { EmptyState } from "../components/EmptyState";
import { FavoriteCityCard } from "../components/FavoriteCityCard";
import { styles } from "../styles/appStyles";
import { FavoriteCity } from "../types/favorite";

type FavoritesScreenProps = {
  favorites: FavoriteCity[];
  onSelectFavorite: (city: string) => void;
  onHighlightFavorite: (id: number) => void;
  onRemoveFavorite: (id: number) => void;
};

export function FavoritesScreen({
  favorites,
  onSelectFavorite,
  onHighlightFavorite,
  onRemoveFavorite
}: FavoritesScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      {favorites.length === 0 ? (
        <EmptyState message="Suas cidades favoritas aparecem aqui." />
      ) : (
        favorites.map((favorite) => (
          <FavoriteCityCard
            key={favorite.id}
            favorite={favorite}
            onSelect={onSelectFavorite}
            onHighlight={onHighlightFavorite}
            onRemove={onRemoveFavorite}
          />
        ))
      )}
    </ScrollView>
  );
}
