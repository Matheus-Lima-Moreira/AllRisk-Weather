import { Image, Text, View } from "react-native";
import { styles } from "../styles/appStyles";
import { DailyForecast } from "../types/weather";
import { formatForecastDate } from "../utils/date";

type ForecastListProps = {
  forecast: DailyForecast[];
};

export function ForecastList({ forecast }: ForecastListProps) {
  if (forecast.length === 0) {
    return null;
  }

  return (
    <View style={styles.forecastList}>
      <Text style={styles.sectionTitle}>Próximos 5 dias</Text>
      {forecast.map((day) => (
        <View key={day.date} style={styles.forecastItem}>
          <Text style={styles.forecastDate}>{formatForecastDate(day.date)}</Text>
          {day.iconUrl ? <Image source={{ uri: day.iconUrl }} style={styles.forecastIcon} /> : null}
          <Text style={styles.forecastCondition}>{day.condition}</Text>
          <Text style={styles.forecastTemp}>
            {day.tempMin}° / {day.tempMax}°
          </Text>
        </View>
      ))}
    </View>
  );
}
