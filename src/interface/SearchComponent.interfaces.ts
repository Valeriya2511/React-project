export interface SearchComponentState {
  searchQuery: string;
}

export interface SearchResultState {
  searchResults: { title: string; description: string }[];
  searchQuery: string;
}

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
