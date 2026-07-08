import { Text, View } from "react-native";
import { styles } from "../styles/appStyles";

type AppHeaderProps = {
  temperature?: number;
};

export function AppHeader({ temperature }: AppHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.appName}>AllRisk Weather</Text>
      <Text style={styles.headerMetric}>{temperature === undefined ? "--" : `${temperature}°`}</Text>
    </View>
  );
}
