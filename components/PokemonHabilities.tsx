interface Props {
  habilities: string[];
}
const PokemonHabilities = ({ habilities }: Props) => {
  return (
    <div className="w-full text-indigo-900">
      <hr className="mx-4" />
      <div className="text-center w-20 -mt-4 mb-1 m-auto bg-white">
        Habilities
      </div>
      <ul className="grid grid-cols-2 gap-x-6 mb-8 mt-4 text-left">
        {habilities.map((hability) => (
          <li className="" key={hability}>
            {hability}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonHabilities;
