import React, { useEffect, useState } from 'react';
import { Pokemon } from '../types';
import { fetchPokemonType } from '../utils';

interface IProps {
  searchFunction: (term: string) => void;
  type: string;
}

const SimilarPokemon = ({ searchFunction, type }: IProps) => {
  const [similarPokemon, setSimilarPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    if (type) {
      fetchPokemonType(type).then((res) => setSimilarPokemon(res.slice(0, 8)));
    }
  }, [type]);

  return (
    <div className="similar-container">
      <h2 className="similar-head">Similar Pokémon</h2>
      <div className="search-container">
        {similarPokemon.map((pokemon) => (
          <div
            className="search-result"
            onClick={() => searchFunction(pokemon.name)}
          >
            <img
              alt={pokemon.name}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
            />{' '}
            <span>{pokemon.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export { SimilarPokemon };
