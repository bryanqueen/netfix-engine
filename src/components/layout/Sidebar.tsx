import React from 'react';
import { useMovieContext } from '../../context/MovieContext';
import { Genre } from '../../types';
import { BiHome, BiMovie } from 'react-icons/bi';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar: React.FC = () => {
  const { movies } = useMovieContext();
  const router = useRouter();

  const genres: Genre[] = [
    'Adventure', 'Anime', 'Thriller', 'Action', 
    'Drama', 'Crime', 'Horror', 'History', 'Comedy',
    'Documentary', 'Sci-Fi', 'Fantasy', 'Romance',
    'Mystery', 'Family', 'Western'
  ];

  // Calculate genre counts
  const genreCounts = genres.reduce((acc, genre) => {
    acc[genre] = movies.filter(movie => movie.genre === genre).length;
    return acc;
  }, {} as Record<Genre, number>);

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return router.pathname === '/dashboard';
    }
    return router.pathname.startsWith(path);
  };

  return (
    <div className="bg-netflix-black w-16 md:w-48 min-h-screen fixed left-0 top-0 pt-16 flex flex-col z-10">
      <div className="px-4 py-8">
        <nav>
          <ul className="space-y-6">
            <li>
              <Link 
                href="/dashboard" 
                className={`flex items-center ${
                  isActive('/dashboard') ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <BiHome className="text-xl" />
                <span className="ml-4 hidden md:inline">HOME</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/movies" 
                className={`flex items-center ${
                  isActive('/movies') ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <BiMovie className="text-xl" />
                <span className="ml-4 hidden md:inline">MOVIES</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="mt-8 px-4 hidden md:block">
        <h3 className="text-xs uppercase text-gray-500 font-medium mb-4">Genres</h3>
        <ul className="space-y-2">
          <li key="all">
            <div className="text-sm w-full text-left py-1 text-gray-400">
              <span>All Movies</span>
              <span className="float-right">{movies.length}</span>
            </div>
          </li>
          {genres.map((genre) => (
            <li key={genre}>
              <div className="text-sm w-full text-left py-1 text-gray-400">
                <span>{genre}</span>
                <span className="float-right">{genreCounts[genre]}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;