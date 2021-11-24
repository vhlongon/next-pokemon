import { HabitatResponse } from './types';
import { normalizeName } from './utils/normalizeName';
import { PokemonResponse } from './types';

export const handleFetch = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  return response.ok
    ? response.json()
    : Promise.reject({
        status: response.status,
        message: response.statusText,
      });
};

export const fetchHabitat = async (name: string): Promise<HabitatResponse> => {
  const response = await handleFetch<HabitatResponse>(
    `https://pokeapi.co/api/v2/pokemon-habitat/${name}`
  );
  return response;
};

export const fetchPokemon = async (name: string): Promise<PokemonResponse> => {
  const response = await handleFetch<PokemonResponse>(
    `https://pokeapi.co/api/v2/pokemon/${normalizeName(name)}`
  );
  return response;
};
