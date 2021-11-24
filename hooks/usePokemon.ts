import { transformPokemonData } from './../utils/transformData';
import { PokemonResponse, ErrorWithStatus } from './../types';
import useSWR from 'swr';
import { fetchPokemon } from '../dataFetchers';
import { FullConfiguration } from 'swr/dist/types';

export const usePokemon = (
  name: string,
  shouldFetch: boolean,
  options?: Partial<FullConfiguration>
) => {
  const { data, error } = useSWR<PokemonResponse, ErrorWithStatus>(
    shouldFetch ? name : null,
    fetchPokemon,
    options
  );

  return {
    pokemon: data && transformPokemonData(data),
    isLoading: !error && !data,
    error,
  };
};
