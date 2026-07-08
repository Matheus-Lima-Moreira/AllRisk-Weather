import { Pressable, Text, View } from "react-native";
import { styles } from "../styles/appStyles";
import { FavoriteCity } from "../types/favorite";

type FavoriteCityCardProps = {
  favorite: FavoriteCity;
  onSelect: (city: string) => void;
  onHighlight: (id: number) => void;
  onRemove: (id: number) => void;
};

export function FavoriteCityCard({ favorite, onSelect, onHighlight, onRemove }: FavoriteCityCardProps) {
  return (
    <Pressable
      style={[styles.favoriteCard, favorite.highlighted && styles.favoriteCardHighlighted]}
      onPress={() => onSelect(favorite.nome)}
    >
      <View>
        <Text style={styles.favoriteCity}>{favorite.nome}</Text>
        <Text style={styles.favoriteHint}>{favorite.highlighted ? "Cidade destacada" : "Toque para consultar"}</Text>
      </View>
      <View style={styles.favoriteActions}>
        <Pressable style={styles.smallButton} onPress={() => onHighlight(favorite.id)}>
          <Text style={styles.smallButtonText}>Destacar</Text>
        </Pressable>
        <Pressable style={styles.removeButton} onPress={() => onRemove(favorite.id)}>
          <Text style={styles.removeButtonText}>Remover</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
