import React from 'react';
import './App.css';
import SearchForm from './searchBar/SearchBar';
import SearchResults from './searchResult/SearchResult';

interface Pokemon {
  name: string;
  url: string;
}

interface AppState {
  searchResults: Pokemon[];
  lastSearchQuery: string;
  error: boolean;
}

class App extends React.Component<AppState> {
  state: AppState = {
    searchResults: [],
    lastSearchQuery: '',
    error: false,
  };

  componentDidMount() {
    const lastQuery = localStorage.getItem('lastSearchQuery') || '';
    this.setState({ lastSearchQuery: lastQuery });
    this.fetchSearchResults(lastQuery);
  }

  fetchSearchResults = (query: string) => {
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
          this.setState({ searchResults: data.results, error: false });
        } else {
          this.setState({ searchResults: [data], error: false });
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({ error: true });
      });
  };

  handleSearch = (query: string) => {
    localStorage.setItem('lastSearchQuery', query);
    this.setState({ lastSearchQuery: query });
    this.fetchSearchResults(query);
  };

  triggerError = () => {
    throw new Error('Test error boundary');
  };

  render() {
    const { searchResults, lastSearchQuery, error } = this.state;

    return (
      <div>
        <h1>Pokedex</h1>
        <SearchForm
          onSearch={this.handleSearch}
          lastSearchQuery={lastSearchQuery}
        />
        <hr />
        {error ? (
          <div>
            <p>Something went wrong. Please try again later.</p>
            <button onClick={this.triggerError}>Trigger Error</button>
          </div>
        ) : (
          <SearchResults results={searchResults} />
        )}
      </div>
    );
  }
}

export default App;
