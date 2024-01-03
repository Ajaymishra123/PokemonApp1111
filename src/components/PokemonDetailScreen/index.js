import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useGetPokemonDetailsQuery } from '../../features/pokemonAPI';
import { SvgUri } from 'react-native-svg';

const PokemonDetailScreen = () => {
  const route = useRoute();
  const { id } = route.params;
  const { data: pokemonDetails, isLoading } = useGetPokemonDetailsQuery(id.name);

  if (isLoading) {
    return <Text style={styles.loadingText}>Loading Details...</Text>;
  }

  // Render flatlist rows
  const renderItem = ({ item }) => (
    <View style={styles.detailRowView}>
      <Text style={styles.titleText}>{item.label}</Text>
      <Text style={styles.valueText}>{item.value}</Text>
    </View>
  );

  const detailsData = [
    { label: 'Name', value: pokemonDetails.name },
    { label: 'Height', value: `${pokemonDetails.height} cm` },
    { label: 'Weight', value: `${pokemonDetails.weight} kg` },
    { label: 'Types', value: pokemonDetails.types !== undefined ? pokemonDetails.types.map((type) => type.type.name).join(', ') : "" },
  ];

  return (
    <FlatList
      ListHeaderComponent={() => (
        <SvgUri
          width='100%'
          height={200}
          marginTop={20}
          uri={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id.url.split('/')[6]}.svg`}
        />
      )}
      data={detailsData}
      keyExtractor={(item) => item.label}
      renderItem={renderItem}
      ItemSeparatorComponent={() => (
        <View style={styles.separatorView} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  detailRowView: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  titleText: { fontWeight: 'bold', fontSize: 16, color: 'black' },
  separatorView: { backgroundColor: "lightgray", height: 1 },
  loadingText: { textAlign: "center", marginTop: 20, fontSize: 15, color: 'black' },
  valueText: { fontSize: 16, color: 'black' },
});


export default PokemonDetailScreen;
