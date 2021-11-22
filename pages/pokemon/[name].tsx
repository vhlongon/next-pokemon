import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { PokemonResponse, PokemonsResponse, PokemonType } from '../../types';
import { normalizeName } from '../../utils/normalizeName';
import { PokemonHabilities } from './PokemonHabilities';
import PokemonStats from './PokemonStats';
import PokemonTypes from './PokemonTypes';
import classes from './pokemonCard.module.css';
import Pokeball from '../../components/LoadingBall';

interface TransformedPokemonData {
  id: number;
  image: string;
  moves: string[];
  name: string;
  types: PokemonType[];
  stats: { value: number; name: string; effort: number }[];
}

type HabitatStaticPropsType = GetStaticProps<
  Partial<{
    data: TransformedPokemonData | [];
    notFound: boolean;
  }>,
  Params
>;

interface Params extends ParsedUrlQuery {
  name: string;
}

interface Props {
  data?: TransformedPokemonData;
}

const getGradients = (types: PokemonType[]) => {
  return types.length <= 1
    ? `from-${types[0]} to-gray-400`
    : `from-${types[0]} to-${types[1]}`;
};

const Pokemon: NextPage<Props> = ({ data }: Props) => {
  if (data) {
    const gradients = getGradients(data.types);

    return (
      <>
        <Head>
          <title>{data.name}</title>
          <meta name="description" content={`pokemon - ${data.name}`} />
        </Head>
        <div className="flex justify-center items-center min-h-full">
          <div className={classes['flip-card']}>
            <div className={classes['flip-card-inner']}>
              <div className={classes['flip-card-front']}>
                <div
                  className={`flex flex-col items-center justify-center rounded-lg border-4 border-indigo-300 relative`}
                >
                  <div className="absolute z-0 w-full h-full border-8 rounded-sm border-gray-200 pointer-events-none"></div>
                  <div
                    className={`w-72 min-w-full flex flex-col items-center px-8 pb-8 bg-gradient-to-bl ${gradients}`}
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
                  <div className="px-12">
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
        </div>
      </>
    );
  }

  return <div>no data</div>;
};

export const fetchPokemon = async (name: string): Promise<PokemonResponse> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${normalizeName(name)}`
  );
  return await response.json();
};

export const fetchPokemons = async (): Promise<PokemonsResponse> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=200`);
  return await response.json();
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const habitats = await fetchPokemons();
    const paths = habitats.results.map(({ name }) => ({ params: { name } }));

    return { paths, fallback: true };
  } catch (error) {
    return { paths: [], fallback: true };
  }
};

export const getStaticProps: HabitatStaticPropsType = async (context) => {
  const pokemonName = context.params?.name;

  if (!pokemonName) {
    return {
      props: {
        notFound: true,
      },
    };
  }
  try {
    const res = await fetchPokemon(pokemonName);

    const { sprites, moves, id, name, stats, types } = res;
    const data = {
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

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Pokemon;
