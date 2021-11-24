import { transformPokemonData } from './../utils/transformData';
import { PokemonResponse, ErrorWithStatus } from './../types';
import useSWR from 'swr';
import { fetchPokemon } from '../dataFetchers';
import { FullConfiguration } from 'swr/dist/types';

interface Options extends FullConfiguration {
  shouldFetch: boolean;
}
export const usePokemon = (name: string, options?: Partial<Options>) => {
  const { shouldFetch = true, ...swrOptions } = options || {};
  const { data, error } = useSWR<PokemonResponse, ErrorWithStatus>(
    shouldFetch ? name : null,
    fetchPokemon,
    swrOptions
  );

  return {
    pokemon: data && transformPokemonData(data),
    isLoading: !error && !data,
    error,
  };
};
