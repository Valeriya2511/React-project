import { useState, useEffect } from 'react';
import './App.css';
import SearchForm from './searchBar/SearchBar';
import SearchResults from './searchResult/SearchResult';

interface Pokemon {
  name: string;
  url: string;
}

function App() {
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [lastSearchQuery, setLastSearchQuery] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastSearchQuery') || '';
    setLastSearchQuery(lastQuery);
    fetchSearchResults(lastQuery);
  }, []);

  const fetchSearchResults = (query: string) => {
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon';
    if (query !== '') {
      apiUrl += `/${query}`;
    }

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.results) {
          setSearchResults(data.results);
          setError(false);
        } else {
          setSearchResults([data]);
          setError(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(true);
      });
  };

  const handleSearch = (query: string) => {
    localStorage.setItem('lastSearchQuery', query);
    setLastSearchQuery(query);
    fetchSearchResults(query);
  };

  const triggerError = () => {
    throw new Error('Test error boundary');
  };

  return (
    <div>
      <h1>Pokedex</h1>
      <SearchForm onSearch={handleSearch} lastSearchQuery={lastSearchQuery} />
      <hr />
      {error ? (
        <div>
          <p>Something went wrong. Please try again later.</p>
          <button onClick={triggerError}>Trigger Error</button>
        </div>
      ) : (
        <SearchResults results={searchResults} />
      )}
    </div>
  );
}

export default App;
