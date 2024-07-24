import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Pokemons,
  PokemonName,
} from '../interface/SearchComponent.interfaces';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getAllPokemonNames: builder.query<Pokemons, string>({
      query: () => 'pokemon',
    }),
    getPokemonByName: builder.query<PokemonName, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetAllPokemonNamesQuery, useGetPokemonByNameQuery } =
  pokemonApi;
export default pokemonApi;
