import { useState } from 'react';
import Image from 'next/image';
import PokemonHabilities from './PokemonHabilities';
import PokemonStats from './PokemonStats';
import PokemonTypes from './PokemonTypes';
import Pokeball from './LoadingBall';
import classes from './pokemonCard.module.css';
import { PokemonType, TransformedPokemonData } from '../types';

const getGradients = (types: PokemonType[]) => {
  return types.length <= 1
    ? `from-${types[0]} to-gray-400`
    : `from-${types[0]} to-${types[1]}`;
};

interface Props {
  data: TransformedPokemonData;
}

const PokemonCard = ({ data }: Props) => {
  const [flipped, setFlipped] = useState(false);
  const gradients = getGradients(data.types);

  return (
    <div className={classes['flip-card']} onClick={() => setFlipped((s) => !s)}>
      <div
        className={`${classes['flip-card-inner']} ${
          flipped ? classes['flipped'] : ''
        }`}
      >
        <div className={classes['flip-card-front']}>
          <div
            className={`flex flex-col items-center justify-center rounded-lg border-4 border-indigo-300 relative bg-white`}
          >
            <div className="absolute z-0 w-full h-full border-8 rounded-sm border-gray-200 pointer-events-none"></div>
            <div
              className={`w-60 sm:w-72 min-w-full flex flex-col items-center px-8 pb-8 bg-gradient-to-bl ${gradients}`}
            >
              <h1 className="capitalize leading-none text-center text-2xl pb-1 pt-3 px-2 font-RobotoCondensed text-indigo-900 bg-gray-200 rounded-b font-bold">
                {data.name}
              </h1>
              <div className="mt-2">
                <Image
                  alt={data.name}
                  src={data.image}
                  width={150}
                  height={150}
                  placeholder="blur"
                  blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mMMY3hSz0AEYBxVSF+FAAX1EUVgupQIAAAAAElFTkSuQmCC"
                />
              </div>
            </div>
            <div className="sm:px-12">
              <PokemonTypes types={data.types} />
              <PokemonStats stats={data.stats} />
              <PokemonHabilities habilities={data.moves} />
            </div>
          </div>
        </div>
        <div className={classes['flip-card-back']}>
          <div className="w-full h-full flex justify-center items-center bg-gradient-to-tl from-indigo-300 to-indigo-100 rounded-lg border-indigo-300 border-4">
            <Pokeball animate={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
