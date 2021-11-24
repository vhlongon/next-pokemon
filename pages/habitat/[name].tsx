import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { fetchHabitats } from '../habitats';
import { normalizeName } from '../../utils/normalizeName';
import { fetchHabitat, fetchPokemon } from '../../dataFetchers';
import { transformHabitatData } from '../../utils/transformData';

type PokemonImages = Record<string, string>;

interface TransformedHabitatData {
  pokemonImages: PokemonImages;
  pokemon_species: { name: string }[];
}

interface Params extends ParsedUrlQuery {
  name: string;
}

type HabitatStaticPropsType = GetStaticProps<
  Partial<{
    data: TransformedHabitatData | [];
    notFound: boolean;
  }>,
  Params
>;

interface Props {
  data?: TransformedHabitatData;
}

const Habitat: NextPage<Props> = ({ data }: Props) => {
  const router = useRouter();
  const { name } = router.query;

  if (data) {
    return (
      <div className="bg-gray-100 py-10">
        <Head>
          <title>{name}</title>
          <meta name="description" content={`pokemon habitat - ${name}`} />
        </Head>

        <h1 className="capitalize mb-10 text-center text-6xl font-RobotoCondensed">
          {name}
        </h1>

        <h2 className="mb-10 text-center text-2xl font-RobotoCondensed">
          Pokemons
        </h2>

        <ul className="grid grid-cols-2 gap-4 p-4 max-w-6xl m-auto sm:grid-cols-4 lg:grid-cols-6">
          {data.pokemon_species.map(({ name }) => (
            <li
              key={name}
              className={`justify-center rounded-md text-indigo-900 h-40 flex items-center flex-col uppercase font-bold bg-indigo-100 border-indigo-200 border-solid border-2`}
            >
              <Link href={`/pokemon/${name}`} passHref>
                <span className="flex items-center flex-col cursor-pointer p-4">
                  {name}
                  <Image
                    src={
                      data.pokemonImages[normalizeName(name)] || '/pokeball.svg'
                    }
                    alt={name}
                    width={96}
                    height={96}
                    placeholder="blur"
                    blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mMMY3hSz0AEYBxVSF+FAAX1EUVgupQIAAAAAElFTkSuQmCC"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return <div>no data</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const habitats = await fetchHabitats();
    const paths = habitats.results.map(({ name }) => ({ params: { name } }));

    return { paths, fallback: false };
  } catch (error) {
    return { paths: [], fallback: false };
  }
};

export const getStaticProps: HabitatStaticPropsType = async (context) => {
  const name = context.params?.name;

  if (!name) {
    return {
      props: {
        notFound: true,
      },
    };
  }
  try {
    const { pokemon_species } = await fetchHabitat(name);
    const pokemonDataPromises = pokemon_species.map(
      async ({ name }) => await fetchPokemon(name)
    );
    const pokemonsData = await Promise.all(pokemonDataPromises);
    const images = pokemonsData.reduce<PokemonImages>(
      (acc, val) => ({ ...acc, [val.name]: val.sprites.front_default }),
      {}
    );

    return {
      props: {
        data: transformHabitatData(pokemon_species, images),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Habitat;
