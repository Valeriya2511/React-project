import { useState, useEffect } from 'react';
import SearchForm from './searchBar/SearchBar';
import SearchResults from './searchResult/SearchResult';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from 'react-router-dom';
import NotFound from './notFound/notFound';
import Pagination from './pagination/pagination';
import './App.css';

interface Pokemon {
  name: string;
  url: string;
}

function App() {
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [lastSearchQuery, setLastSearchQuery] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);
  const itemsPerPage = 50;

  const { page } = useParams<{ page: string }>();

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastSearchQuery') || '';
    setLastSearchQuery(lastQuery);
    fetchSearchResults(parseInt(page || '1', 5));
  }, [page]);

  const fetchSearchResults = (page: number) => {
    let apiUrl = `https://pokeapi.co/api/v2/pokemon`;
    const offset = (page - 1) * itemsPerPage;
    apiUrl += `?offset=${offset}&limit=${itemsPerPage}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setSearchResults(data.results);
        setTotalResults(data.count);
        setError(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(true);
      });
  };

  const handleSearch = (query: string) => {
    localStorage.setItem('lastSearchQuery', query);
    setLastSearchQuery(query);
    fetchSearchResults(1);
  };

  const triggerError = () => {
    throw new Error('Test error boundary');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="list">
              <h1>Pokedex</h1>
              <SearchForm
                onSearch={handleSearch}
                lastSearchQuery={lastSearchQuery}
              />
              <hr />
              {error ? (
                <div>
                  <p>Something went wrong. Please try again later.</p>
                  <button onClick={triggerError}>Trigger Error</button>
                </div>
              ) : (
                <>
                  <SearchResults results={searchResults} />
                  <Pagination
                    totalItems={totalResults}
                    itemsPerPage={itemsPerPage}
                  />
                </>
              )}
            </div>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
