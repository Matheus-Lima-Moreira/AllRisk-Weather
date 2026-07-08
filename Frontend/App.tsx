import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { AppHeader } from "./src/components/AppHeader";
import { AppTabs } from "./src/components/AppTabs";
import { useFavorites } from "./src/hooks/useFavorites";
import { useWeather } from "./src/hooks/useWeather";
import { FavoritesScreen } from "./src/screens/FavoritesScreen";
import { SearchScreen } from "./src/screens/SearchScreen";
import { styles } from "./src/styles/appStyles";
import { AppTab } from "./src/types/navigation";

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>("search");
  const { city, setCity, current, forecast, loading, searchWeather } = useWeather();
  const { favorites, isCurrentCityFavorite, addFavorite, removeFavorite, highlightFavorite } = useFavorites(
    current?.city
  );

  async function handleSearch(nextCity?: string) {
    const foundWeather = await searchWeather(nextCity);
    if (foundWeather) {
      setActiveTab("search");
    }
  }

  function handleAddFavorite() {
    if (current) {
      addFavorite(current.city);
    }
  }

  function handleSelectFavorite(favoriteCity: string) {
    setCity(favoriteCity);
    handleSearch(favoriteCity);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <AppHeader temperature={current?.temperature} />
      <AppTabs activeTab={activeTab} onChangeTab={setActiveTab} />
      {activeTab === "search" ? (
        <SearchScreen
          city={city}
          current={current}
          forecast={forecast}
          loading={loading}
          isFavorite={isCurrentCityFavorite}
          onChangeCity={setCity}
          onSearch={handleSearch}
          onAddFavorite={handleAddFavorite}
        />
      ) : (
        <FavoritesScreen
          favorites={favorites}
          onSelectFavorite={handleSelectFavorite}
          onHighlightFavorite={highlightFavorite}
          onRemoveFavorite={removeFavorite}
        />
      )}
    </SafeAreaView>
  );
}
