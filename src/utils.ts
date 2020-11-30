import { Pokemon } from './types';

export const fetchPokemon = async (pokemonName: string) =>
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then<Pokemon>(
    (res) => {
      const expectedResponseCode = 200;
      if (res.status === expectedResponseCode) {
        return res.json();
      }
      throw new Error(
        `Got HTTP status code ${res.status}, when HTTP status code ${expectedResponseCode} was expected`
      );
    }
  );

export const fetchPokemons = async () =>
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=2000`)
    .then((res) => {
      const expectedResponseCode = 200;
      if (res.status === expectedResponseCode) {
        return res.json();
      }
      throw new Error(
        `Got HTTP status code ${res.status}, when HTTP status code ${expectedResponseCode} was expected`
      );
    })
    .then((res) =>
      res.results.map((pokemon: any, id: number) => ({
        id: id + 1,
        name: pokemon.name,
      }))
    );

export const fetchPokemonType = async (type: string) =>
  fetch(`https://pokeapi.co/api/v2/type/${type}?limit=7`)
    .then((res) => {
      const expectedResponseCode = 200;
      if (res.status === expectedResponseCode) {
        return res.json();
      }
      throw new Error(
        `Got HTTP status code ${res.status}, when HTTP status code ${expectedResponseCode} was expected`
      );
    })
    .then((res) =>
      res.pokemon.map((pokemon: any) => ({
        id: parseInt(pokemon.pokemon.url.split('/')[6]),
        name: pokemon.pokemon.name,
      }))
    );

export const fetchAbility = async (abilityURL: string) =>
  fetch(`${abilityURL}`)
    .then((res) => {
      const expectedResponseCode = 200;
      if (res.status === expectedResponseCode) {
        return res.json();
      }
      throw new Error(
        `Got HTTP status code ${res.status}, when HTTP status code ${expectedResponseCode} was expected`
      );
    })
    .then((res) => ({
      description: res.flavor_text_entries[0].flavor_text,
      power: res.power,
      type: res.type.name,
      name: res.name,
    }));
