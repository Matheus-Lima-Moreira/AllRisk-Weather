import { ActivityIndicator, ScrollView } from "react-native";
import { EmptyState } from "../components/EmptyState";
import { ForecastList } from "../components/ForecastList";
import { SearchBar } from "../components/SearchBar";
import { WeatherCard } from "../components/WeatherCard";
import { colors } from "../styles/theme";
import { styles } from "../styles/appStyles";
import { CurrentWeather, DailyForecast } from "../types/weather";

type SearchScreenProps = {
  city: string;
  current: CurrentWeather | null;
  forecast: DailyForecast[];
  loading: boolean;
  isFavorite: boolean;
  onChangeCity: (city: string) => void;
  onSearch: (city?: string) => void;
  onAddFavorite: () => void;
};

export function SearchScreen({
  city,
  current,
  forecast,
  loading,
  isFavorite,
  onChangeCity,
  onSearch,
  onAddFavorite
}: SearchScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <SearchBar city={city} onChangeCity={onChangeCity} onSearch={onSearch} />
      {loading ? <ActivityIndicator size="large" color={colors.primary} /> : null}
      {current ? (
        <WeatherCard weather={current} isFavorite={isFavorite} onAddFavorite={onAddFavorite} />
      ) : (
        <EmptyState message="Busque uma cidade para ver a previsão..." />
      )}
      <ForecastList forecast={forecast} />
    </ScrollView>
  );
}
