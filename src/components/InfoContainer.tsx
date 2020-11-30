import React, { useEffect, useState } from 'react';
import { Pokemon } from '../types';
import typeMapping from './typeMapping';
import { fetchAbility } from '../utils';

interface moveProps {
  name: string;
  description: string;
  power: number;
  type: string;
}

//Maps each move to include the name, type, power (if it exists) and description (if one exists in a short format with latin letters)
function Move({ moveURL }: { moveURL: string }) {
  const [move, setMove] = useState<moveProps>(null);
  var latin = /^[A-Za-z0-9]/;

  useEffect(() => {
    fetchAbility(moveURL)
      .then((move) => setMove(move))
      .catch();
  }, [moveURL]);

  return (
    <div className="move-container">
      <div className="move-top">
        <img
          className="move-icon"
          src={typeMapping[move?.type]?.icon}
          alt={'move'}
        />
        <h3>{move?.name}</h3>
        <p>{move?.power ? move.power : 20}</p>
      </div>
      <p>{latin.test(move?.description || '') ? move?.description : ''}</p>
    </div>
  );
}

interface Props {
  pokemon?: Pokemon;
}

//The pokemoncard component. Includes mapping for background and icons based on type,
const InfoContainer: React.FunctionComponent<Props> = ({ pokemon }) => {
  if (pokemon) {
    let pokeType = pokemon.types.map((type) => type.type.name);
    let mainType = pokeType[0];
    return (
      <div
        className="infoContainer"
        style={{
          backgroundImage: `url(${typeMapping[mainType].background})`,
          backgroundSize: 'cover',
          color: typeMapping[mainType].dark ? 'white' : 'black',
        }}
      >
        <div className="card-header">
          <h2>{pokemon.name}</h2>
          <div className="left-container">
            <h4>{pokemon.base_experience + ' HP'}</h4>
            <img
              className="pokemon-icon"
              src={typeMapping[mainType].icon}
              alt={mainType}
            />
          </div>
        </div>
        <div className="image-container">
          <img
            src={pokemon.sprites.other.dream_world.front_default}
            alt={`${pokemon.name} illustration`}
            className="pokemon-image"
          />
        </div>
        <div className="stats-container">
          <p>{'NO. ' + pokemon.id}</p>
          <p>{mainType + ' Pokémon'}</p>
          <p>{'HT: ' + pokemon.height + "'"}</p>
          <p>{'WT: ' + pokemon.weight + ' lbs'}</p>
        </div>
        {pokemon.moves
          .map((move) => <Move moveURL={move.move.url} />)
          .slice(0, 2)}
      </div>
    );
  }
  return null;
};
export default InfoContainer;
