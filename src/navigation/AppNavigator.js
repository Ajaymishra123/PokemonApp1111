import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonListScreen from '../components/PokemonListScreen';
import PokemonDetailScreen from '../components/PokemonDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Pokemon List">
        <Stack.Screen name="Pokemon List" component={PokemonListScreen} />
        <Stack.Screen name="Pokemon Details" component={PokemonDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
