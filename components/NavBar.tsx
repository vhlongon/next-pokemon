import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

const NavBar = () => {
  const router = useRouter();
  const isHabitatsPath = router.pathname.includes('/habitats');
  const isPokemonPath = router.pathname.includes('/pokemon');
  const isStart = router.pathname === '/';

  return (
    <nav className="flex flex-row-reverse flex-end py-2 px-4 items-center w-full bg-gray-100 border-b-2 border-indigo-100">
      {!isHabitatsPath && (
        <Link href="/habitats" passHref>
          <span className="cursor-pointer inline-flex ml-4 items-center justify-center bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Habitats
          </span>
        </Link>
      )}
      {!isStart && (
        <Link href="/" passHref>
          <span className="cursor-pointer inline-flex ml-4 items-center justify-center bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Back to start
          </span>
        </Link>
      )}

      {isPokemonPath && (
        <button
          className="cursor-pointer inline-flex ml-4 items-center justify-center bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.back()}
        >
          Go back
        </button>
      )}
    </nav>
  );
};

export default NavBar;
