import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';

const Search = () => {
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 300);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    console.log('pling');
  }, [debouncedValue]);

  return (
    <div className="flex flex-col mx-72 border-indigo-100 border-2 rounded-md p-4 text-indigo-900">
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
    </div>
  );
};

export default Search;
