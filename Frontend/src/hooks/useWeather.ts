import { useState } from "react";
import { Alert } from "react-native";
import { searchWeatherByCity } from "../services/weatherService";
import { CurrentWeather, DailyForecast } from "../types/weather";

export function useWeather(initialCity = "Sao Paulo") {
  const [city, setCity] = useState(initialCity);
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(false);

  async function searchWeather(nextCity = city) {
    const cityToSearch = nextCity.trim();

    if (!cityToSearch) {
      Alert.alert("Cidade obrigatória", "Digite uma cidade para consultar a previsão.");
      return false;
    }

    setLoading(true);
    try {
      const result = await searchWeatherByCity(cityToSearch);
      setCurrent(result.current);
      setForecast(result.forecast);
      setCity(result.current.city);
      return true;
    } catch (error) {
      Alert.alert("Erro na busca", getSearchErrorMessage(error));
      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    city,
    setCity,
    current,
    forecast,
    loading,
    searchWeather
  };
}

function getSearchErrorMessage(error: unknown) {
  if (error instanceof TypeError && error.message.includes("Not Found")) {
    return "Cidade Não encontrada. Verifique o nome e tente novamente.";
  }

  return error instanceof Error ? error.message : "Tente novamente.";
}
