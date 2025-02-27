import React from 'react';
import { BiPlus, BiSearch } from 'react-icons/bi';
import { Genre } from '@/types';

interface MovieActionsProps {
  onAddMovie: () => void;
  onSearch: (query: string) => void;
  onFilterChange: (filters: { genre?: string; year?: number }) => void;
}

const MovieActions: React.FC<MovieActionsProps> = ({
  onAddMovie,
  onSearch,
  onFilterChange,
}) => {
  // Define genres array
  const genres: Genre[] = [
    'Adventure', 'Anime', 'Thriller', 'Action', 
    'Drama', 'Crime', 'Horror', 'History', 'Comedy',
    'Documentary', 'Sci-Fi', 'Fantasy', 'Romance',
    'Mystery', 'Family', 'Western'
  ];

  // Generate years array (from current year to 1900)
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, index) => currentYear - index
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 px-4 md:px-0">
      <div className="flex-1 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search movies..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-md"
          />
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <div className="flex gap-2">
          <select
            onChange={(e) => onFilterChange({ genre: e.target.value })}
            className="bg-gray-800 text-white px-4 py-2 rounded-md flex-1 md:flex-none"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => onFilterChange({ year: Number(e.target.value) })}
            className="bg-gray-800 text-white px-4 py-2 rounded-md flex-1 md:flex-none"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={onAddMovie}
        className="bg-netflix-red hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
      >
        <BiPlus size={20} />
        Add Movie
      </button>
    </div>
  );
};

export default MovieActions; 