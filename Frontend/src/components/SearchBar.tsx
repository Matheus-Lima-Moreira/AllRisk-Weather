import { Pressable, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { appConfig } from "../config/appConfig";
import { styles } from "../styles/appStyles";

type SearchBarProps = {
  city: string;
  onChangeCity: (city: string) => void;
  onSearch: (city?: string) => void;
};

export function SearchBar({ city, onChangeCity, onSearch }: SearchBarProps) {
  return (
    <View style={styles.searchPanel}>
      <GooglePlacesAutocomplete
        placeholder="Buscar cidade"
        fetchDetails={false}
        query={{
          key: appConfig.googlePlacesApiKey,
          language: "pt-BR",
          types: "(cities)"
        }}
        onPress={(data) => {
          const selectedCity = data.description.split(",")[0];
          onChangeCity(selectedCity);
          onSearch(selectedCity);
        }}
        textInputProps={{
          value: city,
          onChangeText: onChangeCity,
          onSubmitEditing: () => onSearch(),
          returnKeyType: "search"
        }}
        styles={{
          container: styles.autocompleteContainer,
          textInput: styles.searchInput,
          listView: styles.suggestionList,
          row: styles.suggestionRow,
          description: styles.suggestionText
        }}
      />
      <Pressable style={styles.searchButton} onPress={() => onSearch()}>
        <Text style={styles.searchButtonText}>Buscar</Text>
      </Pressable>
    </View>
  );
}
