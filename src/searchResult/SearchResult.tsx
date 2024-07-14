import { useState } from 'react';
import './SearchResult.css';
import AboutPokemon from '../aboutPokemon/aboutPokemon';
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
    console.log(selectedPokemon);
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
