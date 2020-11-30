import React, { useEffect, useState } from 'react';
import { fetchPokemon } from './utils';
import { Pokemon } from './types';

import { SearchPokename } from './components/searchPokename';
import { SimilarPokemon } from './components/similarPokemon';
import InfoContainer from './components/InfoContainer';

import './app.css';

const App = () => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokeName, setPokeName] = useState<string>('eevee');

  useEffect(() => {
    fetchPokemon(pokeName).then((res) => setPokemon(res));
  }, [pokeName]);

  return (
    <div className="appRoot">
      <div className="app-header">
        <SearchPokename searchFunction={setPokeName} />
      </div>
      <InfoContainer pokemon={pokemon} />
      <SimilarPokemon
        searchFunction={setPokeName}
        type={pokemon?.types[0].type.name}
      />
    </div>
  );
};

export default App;
