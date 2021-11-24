import { ChangeEvent, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { usePokemon } from '../hooks/usePokemon';
import Pokeball from './LoadingBall';
import PokemonCard from './PokemonCard';
import classes from './pokemonCard.module.css';

interface Props {
  pokemonNames: string[] | [];
}
const Search = ({ pokemonNames }: Props) => {
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);
  const [matchingPokemon] = pokemonNames.filter((name) =>
    name.includes(debouncedValue)
  );
  const shouldFetch = Boolean(matchingPokemon);
  const { pokemon, isLoading, isValidating } = usePokemon(matchingPokemon, {
    shouldFetch,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div
      className={`flex flex-col m-auto items-center text-indigo-900 ${classes.container}`}
    >
      <div className="flex flex-col  flex-1 w-full border-indigo-100 border-2 rounded-md p-4 relative">
        <label className="mb-2" htmlFor="search">
          Search for pokemon
        </label>
        <input
          className="p-2 rounded-md text-gray-400"
          type="text"
          id="search"
          value={value}
          onChange={handleChange}
        />
        {(isLoading || isValidating) && (
          <div className="absolute right-4">loading...</div>
        )}
      </div>

      {pokemon && value ? (
        <div className="flex-1 mt-8">
          <PokemonCard data={pokemon} />
        </div>
      ) : (
        <div className="flex flex-col items-center mt-4 border-indigo-100 border-2 rounded-md p-4 w-full">
          <h2 className="text-xl mb-2">No hits</h2>
          <Pokeball animate={false} />
        </div>
      )}
    </div>
  );
};

export default Search;
