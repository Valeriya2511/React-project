import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Pokemons,
  PokemonName,
} from '../interface/SearchComponent.interfaces';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getAllPokemonNames: builder.query<Pokemons, void>({
      query: () => 'pokemon',
    }),
    getPokemonByName: builder.query<PokemonName, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonPage: builder.query<Pokemons, number>({
      query: (page) => `pokemon?limit=20&offset=${page}`,
    }),
  }),
});

export const {
  useGetAllPokemonNamesQuery,
  useGetPokemonByNameQuery,
  useGetPokemonPageQuery,
} = pokemonApi;
export default pokemonApi;
