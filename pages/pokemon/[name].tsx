import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { TransformedPokemonData } from '../../types';
import { fetchPokemon, fetchPokemons } from '../../dataFetchers';
import { transformPokemonData } from '../../utils/transformData';
import PokemonCard from '../../components/PokemonCard';

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

const Pokemon: NextPage<Props> = ({ data }: Props) => {
  if (data) {
    return (
      <>
        <Head>
          <title>{data.name}</title>
          <meta name="description" content={`pokemon - ${data.name}`} />
        </Head>
        <div className="flex justify-center items-center min-h-full p-4 bg-gray-100">
          <PokemonCard data={data} />
        </div>
      </>
    );
  }

  return <div>no data</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const pokemons = await fetchPokemons();
    const paths = pokemons.results.map(({ name }) => ({ params: { name } }));

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
    const response = await fetchPokemon(pokemonName);

    return {
      props: {
        data: transformPokemonData(response),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Pokemon;
