import { getJson } from "./httpClient";
import { CurrentWeather, DailyForecast, WeatherSearchResult } from "../types/weather";

export async function searchWeatherByCity(city: string): Promise<WeatherSearchResult> {
  const encodedCity = encodeURIComponent(city.trim());
  const [current, forecast] = await Promise.all([
    getJson<CurrentWeather>(`/api/weather/current?city=${encodedCity}`),
    getJson<DailyForecast[]>(`/api/weather/forecast?city=${encodedCity}`)
  ]);

  return { current, forecast };
}
