import { StyleSheet } from "react-native";
import { colors } from "./theme";

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  header: {
    alignItems: "center",
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18
  },
  appName: { color: colors.white, fontSize: 22, fontWeight: "800" },
  headerMetric: { color: colors.palePrimary, fontSize: 28, fontWeight: "800" },
  tabs: { backgroundColor: colors.white, flexDirection: "row", gap: 8, padding: 12 },
  tabButton: { alignItems: "center", borderRadius: 8, flex: 1, paddingVertical: 12 },
  tabButtonActive: { backgroundColor: colors.primary },
  tabText: { color: "#155e75", fontSize: 15, fontWeight: "700" },
  tabTextActive: { color: colors.white },
  content: { gap: 16, padding: 16, paddingBottom: 32 },
  searchPanel: { flexDirection: "row", gap: 10, zIndex: 2 },
  autocompleteContainer: { flex: 1 },
  searchInput: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.primaryDark,
    fontSize: 16,
    height: 48,
    paddingHorizontal: 14
  },
  searchButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
    paddingHorizontal: 18
  },
  searchButtonText: { color: colors.white, fontSize: 15, fontWeight: "800" },
  suggestionList: { backgroundColor: colors.white, borderRadius: 8, elevation: 4 },
  suggestionRow: { padding: 12 },
  suggestionText: { color: colors.primaryDark },
  weatherCard: { backgroundColor: colors.white, borderRadius: 8, gap: 16, padding: 18 },
  cityName: { color: colors.primaryDark, fontSize: 28, fontWeight: "900" },
  condition: { color: colors.secondaryText, fontSize: 17, marginTop: 4, textTransform: "capitalize" },
  temperature: { color: colors.primaryText, fontSize: 58, fontWeight: "900", marginTop: 8 },
  weatherIcon: { height: 92, position: "absolute", right: 16, top: 18, width: 92 },
  metricsGrid: { flexDirection: "row", gap: 10 },
  metric: { backgroundColor: colors.softPrimary, borderRadius: 8, flex: 1, padding: 12 },
  metricLabel: { color: "#155e75", fontSize: 12, fontWeight: "700" },
  metricValue: { color: colors.primaryText, fontSize: 18, fontWeight: "900", marginTop: 4 },
  favoriteButton: { alignItems: "center", backgroundColor: colors.accent, borderRadius: 8, paddingVertical: 13 },
  favoriteButtonDisabled: { backgroundColor: colors.disabled },
  favoriteButtonText: { color: colors.white, fontSize: 15, fontWeight: "800" },
  forecastList: { gap: 10 },
  sectionTitle: { color: colors.primaryDark, fontSize: 20, fontWeight: "900" },
  forecastItem: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    flexDirection: "row",
    gap: 10,
    padding: 12
  },
  forecastDate: { color: colors.primaryDark, fontSize: 14, fontWeight: "800", width: 74 },
  forecastIcon: { height: 42, width: 42 },
  forecastCondition: { color: colors.secondaryText, flex: 1, fontSize: 14, textTransform: "capitalize" },
  forecastTemp: { color: colors.primaryText, fontSize: 14, fontWeight: "900" },
  emptyText: { color: "#155e75", fontSize: 16, textAlign: "center" },
  favoriteCard: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14
  },
  favoriteCardHighlighted: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accent,
    borderWidth: 2,
    transform: [{ scale: 1.02 }]
  },
  favoriteCity: { color: colors.primaryDark, fontSize: 19, fontWeight: "900" },
  favoriteHint: { color: colors.secondaryText, fontSize: 13, marginTop: 2 },
  favoriteActions: { alignItems: "flex-end", gap: 8 },
  smallButton: { backgroundColor: colors.primary, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  smallButtonText: { color: colors.white, fontSize: 12, fontWeight: "800" },
  removeButton: { backgroundColor: colors.dangerSoft, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  removeButtonText: { color: colors.danger, fontSize: 12, fontWeight: "800" }
});
