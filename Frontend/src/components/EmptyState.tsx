import { Text } from "react-native";
import { styles } from "../styles/appStyles";

export function EmptyState({ message }: { message: string }) {
  return <Text style={styles.emptyText}>{message}</Text>;
}
