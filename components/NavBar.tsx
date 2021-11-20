import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

const NavBar = () => {
  const router = useRouter();
  const isHabitatPath = router.pathname.includes('/habitat');
  const isPokemonPath = router.pathname.includes('/pokemon');
  const isStart = router.pathname === '/';

  if (isStart) {
    return null;
  }

  return (
    <nav className="flex flex-row-reverse justify-between py-2 px-4 items-center w-full bg-gray-100 border-b-2 border-indigo-100">
      {isHabitatPath && (
        <Link href="/" passHref>
          <span className="cursor-pointer inline-flex items-center justify-center bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Back to habitats
          </span>
        </Link>
      )}

      {isPokemonPath && (
        <button
          className="cursor-pointer inline-flex items-center justify-center bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.back()}
        >
          Go back
        </button>
      )}
    </nav>
  );
};

export default NavBar;
