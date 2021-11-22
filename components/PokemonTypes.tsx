/* eslint-disable @next/next/no-img-element */
import { PokemonType } from '../types';
import classes from './pokemonType.module.css';

interface Props {
  types: PokemonType[];
}
const PokemonTypes = ({ types }: Props) => {
  return (
    <div className={`flex w-full justify-center ${classes.container}`}>
      {types.map((type) => {
        const typeClass = `type-${type}`;
        return (
          <div className="flex flex-col items-center justify-center" key={type}>
            <div className={`${classes.icon} ${classes[typeClass]}`}>
              <img
                className={`${classes.iconImg}`}
                src={`/icons/${type}.svg`}
                alt={type}
              />
            </div>
            <span className="text-xs mt-1 text-indigo-900">{type}</span>
          </div>
        );
      })}
    </div>
  );
};

export default PokemonTypes;
