import React, { useEffect, useState } from 'react';
import { fetchPokemons } from '../utils';

interface IProps {
  searchFunction: (term: string) => void;
}

interface IPokemon {
  name: string;
  id: number;
}

const SearchPokename = ({ searchFunction }: IProps) => {
  const [availablePokemons, setAvailablePokemons] = useState<IPokemon[]>([]);
  const [visiblePokemons, setVisiblePokemons] = useState<IPokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPokemons()
      .then((names: IPokemon[]) => setAvailablePokemons(names))
      .catch();
  }, []);

  useEffect(() => {
    if (availablePokemons) {
      const searchBeginsWith = new RegExp(
        '^' + searchTerm.toLowerCase().replace(/[^a-z]/g, '')
      );
      setVisiblePokemons(
        availablePokemons.filter(
          (pokemon) =>
            pokemon.name.indexOf('-') === -1 &&
            searchBeginsWith.test(pokemon.name)
        )
      );
    }
  }, [searchTerm, availablePokemons]);

  function validInput(searchTerm: string) {
    return availablePokemons.some(
      (pokemon) => pokemon.name === searchTerm.toLowerCase()
    );
  }

  return (
    <div className="search-header">
      <input
        className="search"
        placeholder="Søk ..."
        value={searchTerm}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && validInput(searchTerm)) {
            searchFunction(searchTerm);
          }
        }}
        onChange={(input) => setSearchTerm(input?.target.value)}
      />
      <div>
        {searchTerm
          ? visiblePokemons.length +
            'possible match' +
            (visiblePokemons.length !== 1 ? 'es' : '')
          : ''}
      </div>
      <div className="search-container">
        {searchTerm &&
          visiblePokemons.slice(0, 8).map((pokemon) => (
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

export { SearchPokename };
