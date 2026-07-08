export type CurrentWeather = {
  city: string;
  temperature: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  condition: string;
  iconUrl: string;
};

export type DailyForecast = {
  date: string;
  tempMin: number;
  tempMax: number;
  condition: string;
  iconUrl: string;
};

export type WeatherSearchResult = {
  current: CurrentWeather;
  forecast: DailyForecast[];
};
