import {
  PokemonResponse,
  TransformedPokemonData,
  HabitatResponse,
  PokemonImages,
  TransformedHabitatData,
} from './../types';

export const transformPokemonData = ({
  sprites,
  moves,
  id,
  name,
  stats,
  types,
}: PokemonResponse): TransformedPokemonData => {
  return {
    image:
      sprites.other?.['official-artwork']?.front_default ||
      sprites.front_default,
    moves: moves.slice(0, 5).map(({ move }) => move.name),
    id,
    name,
    stats: stats.map(({ base_stat, effort, stat }) => ({
      value: base_stat,
      effort,
      name: stat.name,
    })),
    types: types.map(({ type }) => type.name),
  };
};

export const transformHabitatData = (
  species: HabitatResponse['pokemon_species'],
  pokemonImages: PokemonImages
): TransformedHabitatData => {
  return {
    pokemon_species: species.map(({ name }) => ({ name })),
    pokemonImages,
  };
};
