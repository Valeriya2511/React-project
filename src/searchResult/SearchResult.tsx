import { useState } from 'react';
import AboutPokemon from '../aboutPokemon/aboutPokemon';
import './SearchResult.css';
interface SearchResult {
  name: string;
  url: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

function SearchResults({ results }: SearchResultsProps) {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>('');
  const [isActive, setIsActive] = useState(false);

  const handlePokemonClick = (pokemon: string) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseDetails = () => {
    setSelectedPokemon(null);
    setIsActive(!isActive);
  };

  return (
    <div>
      <h2>Search Results:</h2>
      <div className="normal-box">
        <ul className="normal-box-ul">
          {results.map((result, index) => (
            <li key={index}>
              <strong
                className="name-pokemon"
                onClick={() => handlePokemonClick(result.name)}
              >
                {result.name}
              </strong>
            </li>
          ))}
        </ul>
        {selectedPokemon && (
          <AboutPokemon
            namePokemon={selectedPokemon}
            onClose={handleCloseDetails}
          />
        )}
      </div>
    </div>
  );
}

export default SearchResults;
