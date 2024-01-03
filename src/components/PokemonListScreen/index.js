import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetPokemonListQuery } from '../../features/pokemonAPI';
import { SvgUri } from 'react-native-svg';

const PokemonListScreen = () => {
  const navigation = useNavigation();
  const { data: pokemonList, isLoading } = useGetPokemonListQuery(10);

  // Navigation to detail screen
  const navigateToDetails = (id) => {
    navigation.navigate('Pokemon Details', { id });
  };

  if (isLoading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <FlatList
      data={pokemonList?.results}
      keyExtractor={(item) => item.name}
      ItemSeparatorComponent={() => (
        <View style={styles.separatorView} />
      )}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigateToDetails(item)}>
          <View style={styles.itemRowView}>
            <SvgUri
              width={30}
              height={30}
              uri={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${item.url.split('/')[6]}.svg`}
            />
            <Text style={styles.nameText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  separatorView: { backgroundColor: "lightgray", height: 1 },
  itemRowView: { flexDirection: 'row', padding: 20, alignItems: 'center' },
  nameText: { color: 'black', fontSize: 18, textAlign: 'center', flex: 1 },
  loadingText: { textAlign: "center", marginTop: 20, fontSize: 15 }
});

export default PokemonListScreen;