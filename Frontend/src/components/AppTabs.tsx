import { Pressable, Text, View } from "react-native";
import { styles } from "../styles/appStyles";
import { AppTab } from "../types/navigation";

type AppTabsProps = {
  activeTab: AppTab;
  onChangeTab: (tab: AppTab) => void;
};

export function AppTabs({ activeTab, onChangeTab }: AppTabsProps) {
  return (
    <View style={styles.tabs}>
      <TabButton active={activeTab === "search"} label="Busca" onPress={() => onChangeTab("search")} />
      <TabButton active={activeTab === "favorites"} label="Favoritos" onPress={() => onChangeTab("favorites")} />
    </View>
  );
}

function TabButton({ active, label, onPress }: { active: boolean; label: string; onPress: () => void }) {
  return (
    <Pressable style={[styles.tabButton, active && styles.tabButtonActive]} onPress={onPress}>
      <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
    </Pressable>
  );
}
