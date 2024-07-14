import { useEffect, useState } from 'react';
import './aboutPokemon.css';

export interface PokemonData {
  name: string;
  height: number;
  weight: number;
}

function AboutPokemon({
  namePokemon,
  onClose,
}: {
  namePokemon: string;
  onClose: () => void;
  className?: string;
}) {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${namePokemon}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setPokemonData({
          name: data.name,
          height: data.height,
          weight: data.weight,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [namePokemon]);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="about-pokemon">
      <h1>{pokemonData.name}</h1>
      <p>Height: {pokemonData.height}</p>
      <p>Weight: {pokemonData.weight}</p>
      {/* Добавьте другие данные о покемоне, которые хотите отобразить */}
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default AboutPokemon;
