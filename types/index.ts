export interface Pokemons {
  count: number;
  next: string;
  previous: null;
  results: [];
  name: string;
  url: string;
}

export interface PokemonName {
  name: string;
  height: number;
  weight: number;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    front_default: string;
  };
}

export interface PokemonProps {
  pokemons: Pokemons;
  pokemonName: PokemonName;
}
