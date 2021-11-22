interface Props {
  stats: { value: number; name: string; effort: number }[];
}
const PokemonStats = ({ stats }: Props) => {
  return (
    <div className="text-indigo-900">
      <hr className="mx-4" />
      <div className="text-center w-14 -mt-4 mb-1 m-auto bg-white">stats</div>
      <ul className="mb-8 w-full mt-4">
        {stats.map((stat) => (
          <li className="flex w-full" key={stat.name}>
            <span className="w-2/3 capitalize mr-4 font-bold text-right">
              {stat.name}:
            </span>
            <span className="mr-4 w-1/12">{stat.value}</span>
            <span className="flex-1">
              <span className="font-bold mr-4">Effort:</span>
              <span className="">{stat.effort}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonStats;
