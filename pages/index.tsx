import { useState, useEffect, useCallback } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResult";
import { Advent_Pro } from "next/font/google";
import { Pokemons, PokemonName } from "@/types";

const inter = Advent_Pro({ subsets: ["latin"], weight: ["400", "700"] });

interface Pokemon {
  name: string;
  url: string;
}
 
export const getServerSideProps = (async (context) => {
  const {namePokemon} = context.query;
  const resPokemons = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
  const dataPokemons: Pokemons = await resPokemons.json()

  const resPokemonName = await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`);
  const dataPokemonName: PokemonName = await resPokemonName.json();

  return { 
    props: { dataPokemons, dataPokemonName }
  }
}) satisfies GetServerSideProps<{ dataPokemons: Pokemons, dataPokemonName: PokemonName }>;


export default function Home({ dataPokemons, dataPokemonName} : InferGetServerSidePropsType<typeof getServerSideProps>) {

  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [lastSearchQuery, setLastSearchQuery] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [numbPage, setNumbPage] = useState<number>(0);

  const fetchSearchResults = useCallback(
    (query: string) => {
      setLoading(true);
      if (query === '') {
        setSearchResults(dataPokemons.results);
        setTotalResults(dataPokemons.count);
        setError(false);
      } else {
        setSearchResults([dataPokemonName.species]);
        setError(false);
      }
      setLoading(false);
    },
    [dataPokemons, dataPokemonName]
  );

  const handleSearch = (query: string) => {
    localStorage.setItem('lastSearchQuery', query);
    setLastSearchQuery(query);
    fetchSearchResults(query);
  };

  return (
  <main className={`main ${inter.className}`}>
    <SearchBar lastSearchQuery={lastSearchQuery} onSearch={handleSearch}></SearchBar>
    <SearchResults results={searchResults}></SearchResults>
  </main>
  )
}
