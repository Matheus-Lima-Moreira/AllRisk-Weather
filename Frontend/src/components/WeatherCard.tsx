import { Image, Pressable, Text, View } from "react-native";
import { styles } from "../styles/appStyles";
import { CurrentWeather } from "../types/weather";
import { Metric } from "./Metric";

type WeatherCardProps = {
  weather: CurrentWeather;
  isFavorite: boolean;
  onAddFavorite: () => void;
};

export function WeatherCard({ weather, isFavorite, onAddFavorite }: WeatherCardProps) {
  return (
    <View style={styles.weatherCard}>
      <View>
        <Text style={styles.cityName}>{weather.city}</Text>
        <Text style={styles.condition}>{weather.condition}</Text>
        <Text style={styles.temperature}>{weather.temperature}°</Text>
      </View>
      {weather.iconUrl ? <Image source={{ uri: weather.iconUrl }} style={styles.weatherIcon} /> : null}
      <View style={styles.metricsGrid}>
        <Metric label="Minima" value={`${weather.tempMin}°`} />
        <Metric label="Maxima" value={`${weather.tempMax}°`} />
        <Metric label="Umidade" value={`${weather.humidity}%`} />
      </View>
      <Pressable style={[styles.favoriteButton, isFavorite && styles.favoriteButtonDisabled]} onPress={onAddFavorite}>
        <Text style={styles.favoriteButtonText}>
          {isFavorite ? "Cidade favoritada" : "Adicionar aos favoritos"}
        </Text>
      </Pressable>
    </View>
  );
}
