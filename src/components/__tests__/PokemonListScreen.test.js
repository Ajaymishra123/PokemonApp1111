import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import PokemonList from '../PokemonListScreen';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('../../features/pokemonAPI', () => ({
  ...jest.requireActual('../../features/pokemonAPI'),
  useGetPokemonListQuery: jest.fn(() => ({
    data: {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
    },
    isLoading: false,
  })),
}));

describe('Pokemon List Component', () => {
  it('renders a list of Pokemon', async () => {

    useNavigation.mockReturnValue({
      navigate: jest.fn(),
    });

    const { getByText } = render(<PokemonList />);
    await waitFor(() => getByText('bulbasaur'));

    expect(getByText('bulbasaur')).toBeTruthy();
    expect(getByText('ivysaur')).toBeTruthy();
  });

  it('navigates to details screen on item press', async () => {
    const navigate = jest.fn();
    useNavigation.mockReturnValue({
      navigate,
    });

    const { getByText } = render(<PokemonList />);
    await waitFor(() => getByText('bulbasaur'));
    const mockPokemon = { name: 'bulbasaur', url: "https://pokeapi.co/api/v2/pokemon/1/" };

    fireEvent.press(getByText('bulbasaur'));

    expect(navigate).toHaveBeenCalledWith('Pokemon Details', { id: mockPokemon });
  });
});
