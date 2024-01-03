import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { useRoute } from '@react-navigation/native';
import PokemonDetails from '../PokemonDetailScreen';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: jest.fn(),
}));

jest.mock('../../features/pokemonAPI', () => ({
  ...jest.requireActual('../../features/pokemonAPI'),
  useGetPokemonDetailsQuery: jest.fn(() => ({
    data: {
      name: 'bulbasaur',
      height: 7,
      weight: 69,
    },
    isLoading: false,
  })),
}));

describe('Pokemon Details Component', () => {
  it('renders Pokemon details', async () => {
    const mockPokemon = { name: 'bulbasaur', url: "https://pokeapi.co/api/v2/pokemon/1/" };

    useRoute.mockReturnValue({
      params: { id: mockPokemon },
    });

    const { getByText } = render(<PokemonDetails />);
    await waitFor(() => getByText('bulbasaur'));

    expect(getByText('bulbasaur')).toBeTruthy();
    expect(getByText('Height')).toBeTruthy();
    expect(getByText('Weight')).toBeTruthy();
  });
});
