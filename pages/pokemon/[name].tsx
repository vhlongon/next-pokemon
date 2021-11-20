import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';
import { PokemonResponse, PokemonsResponse, PokemonType } from '../../types';
import { normalizeName } from '../../utils/normalizeName';

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
      <div className="flex justify-center items-center min-h-full">
        <div
          className={`flex flex-col items-center justify-center p-8 rounded-lg border-8 bg-gradient-to-bl ${gradients}`}
        >
          <h1 className="capitalize mb-10 w-72 text-center text-6xl font-RobotoCondensed text-indigo-900">
            {data.name}
          </h1>
          <div>
            <Image
              alt={data.name}
              src={data.image}
              width={200}
              height={200}
              placeholder="blur"
              blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mMMY3hSz0AEYBxVSF+FAAX1EUVgupQIAAAAAElFTkSuQmCC"
            />
          </div>
        </div>
      </div>
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
