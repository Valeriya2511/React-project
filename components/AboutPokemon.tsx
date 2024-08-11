import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/AboutPokemon.module.css';

export interface PokemonData {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
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
        const datas = await response.json();
        setPokemonData({
          name: datas.name,
          height: datas.height,
          weight: datas.weight,
          sprites: {
            front_default: datas.sprites.front_default,
          },
        });
        setPokemonData(datas);
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
      <Image
        width={150}
        src={pokemonData.sprites.front_default}
        alt="pokemon"
      />
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default AboutPokemon;