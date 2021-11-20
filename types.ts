export type HabitType =
  | 'cave'
  | 'forest'
  | 'grassland'
  | 'mountain'
  | 'rare'
  | 'rough-terrain'
  | 'sea'
  | 'urban'
  | 'waters-edge';

export type PokemonType =
  | 'normal'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dark'
  | 'dragon'
  | 'steel'
  | 'fairy';

export type LanguageCode = 'fr' | 'es' | 'en';

interface BaseItem {
  name: string;
  url: string;
}
export interface Habitat {
  name: HabitType;
  url: string;
}

export interface HabitatsResponse {
  count: number;
  results: Habitat[];
}

interface HabitatNameObject {
  language: BaseItem;
  name: LanguageCode;
}

export interface HabitatResponse {
  id: number;
  name: HabitType;
  names: HabitatNameObject[];
  pokemon_species: BaseItem[];
}

interface Move {
  move: BaseItem;
}

interface Stat {
  base_stat: number;
  effort: 0;
  stat: BaseItem;
}
export interface PokemonResponse {
  name: string;
  id: number;
  moves: Move[];
  stats: Stat[];
  types: { slot: number; type: { name: PokemonType; url: string } }[];
  sprites: {
    front_default: string;
    other?: {
      'official-artwork'?: { front_default: string };
    };
  };
}

export interface PokemonsResponse {
  count: number;
  results: PokemonResponse[];
}
