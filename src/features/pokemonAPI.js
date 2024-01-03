import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonAPI = createApi({
  reducerPath: 'pokemonAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonList: builder.query({
      query: (limit = 10) => `pokemon?limit=${limit}`,
    }),
    getPokemonDetails: builder.query({
      query: (id) => `pokemon/${id}`,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailsQuery } = pokemonAPI;
