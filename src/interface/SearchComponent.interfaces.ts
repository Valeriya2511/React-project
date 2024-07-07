export interface SearchComponentState {
  searchQuery: string;
}

export interface SearchResultState {
  searchResults: { title: string; description: string }[];
  searchQuery: string;
}

export interface Pokemon {
  name: string;
  url: string;
}
