import { useState, useEffect, useCallback } from 'react';
import Loader from './loader/loader';
import SearchForm from './searchBar/SearchBar';
import SearchResults from './searchResult/SearchResult';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useParams,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, RootState } from './store/store';
import NotFound from './notFound/notFound';
import Pagination from './pagination/pagination';
import pokemonApi from './store/apiSlice';
import './App.css';

interface Pokemon {
  name: string;
  url: string;
}

function App() {
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [lastSearchQuery, setLastSearchQuery] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [numbPage, setNumbPage] = useState<number>(0);
  const { data: dataAll } = pokemonApi.useGetAllPokemonNamesQuery();
  const { data: dataName } = pokemonApi.useGetPokemonByNameQuery(
    lastSearchQuery,
    { skip: !lastSearchQuery }
  );
  const { data: dataAllPage } = pokemonApi.useGetPokemonPageQuery(numbPage);

  useEffect(() => {
    setLoading(true);

    if (dataAll) {
      setSearchResults(dataAll.results);
      setTotalResults(dataAll.count);
      setError(false);
      setLoading(false);
    }

    if (dataAllPage) {
      setSearchResults(dataAllPage.results);
      setLoading(false);
    }
  }, [dataAllPage, dataAll]);

  const fetchSearchResults = useCallback(
    (query: string) => {
      setLoading(true);
      if (query === '') {
        if (dataAll) {
          setSearchResults(dataAll.results);
          setTotalResults(dataAll.count);
          setError(false);
        }
      } else {
        if (dataName) {
          setSearchResults([dataName.species]);
          setError(false);
        }
      }
      setLoading(false);
    },
    [dataAll, dataName]
  );

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastSearchQuery') || '';
    setLastSearchQuery(lastQuery);
    fetchSearchResults(lastQuery);
  }, [fetchSearchResults]);

  const getNumberPage = (page: number) => {
    setNumbPage(page - 1);
    if (dataAllPage) {
      setSearchResults(dataAllPage.results);
    }
  };

  const handleSearch = (query: string) => {
    localStorage.setItem('lastSearchQuery', query);
    setLastSearchQuery(query);
    fetchSearchResults(query);
  };

  const triggerError = () => {
    throw new Error('Test error boundary');
  };

  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className={`list ${themeMode}`}>
              <button onClick={toggleThemeHandler}>Theme</button>
              <h1>Pokedex</h1>
              <SearchForm
                onSearch={handleSearch}
                lastSearchQuery={lastSearchQuery}
              />
              <hr />
              {loading ? (
                <Loader />
              ) : error ? (
                <div>
                  <p>Something went wrong. Please try again later.</p>
                  <button onClick={triggerError}>Trigger Error</button>
                </div>
              ) : (
                <>
                  <SearchResults results={searchResults} />
                  <Pagination
                    totalItems={totalResults}
                    callback={getNumberPage}
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
