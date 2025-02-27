import React from 'react';
import { useMovieContext } from '../../context/MovieContext';
import { Genre } from '../../types';
import { BiX } from 'react-icons/bi';

interface MovieFiltersProps {
  onClose: () => void;
}

const MovieFilters: React.FC<MovieFiltersProps> = ({ onClose }) => {
  const { filterOptions, setFilterOptions } = useMovieContext();

  const genres: Genre[] = [
    'Adventure', 'Anime', 'Thriller', 'Action', 
    'Drama', 'Crime', 'Horror', 'History', 'Comedy',
    'Documentary', 'Sci-Fi', 'Fantasy', 'Romance',
    'Mystery', 'Family', 'Western'
  ];

  const sortOptions = [
    { value: 'title', label: 'Title' },
    { value: 'year', label: 'Year' },
    { value: 'rating', label: 'Rating' },
    { value: 'createdAt', label: 'Date Added' },
  ];

  const handleReset = () => {
    setFilterOptions({
      search: '',
      genre: '',
      yearMin: 1900,
      yearMax: new Date().getFullYear(),
      ratingMin: 0,
      ratingMax: 10,
      sortBy: 'title',
      sortOrder: 'asc',
    });
  };

  return (
    <div className="bg-netflix-dark p-6 rounded-lg mb-6 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        <BiX size={24} />
      </button>
      
      <h3 className="text-xl font-semibold mb-4">Filter Movies</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="text-sm font-medium mb-2">Genre</h4>
          <select
            value={filterOptions.genre}
            onChange={(e) => setFilterOptions({ genre: e.target.value as Genre | '' })}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Year Range</h4>
          <div className="flex space-x-2">
            <input
              type="number"
              value={filterOptions.yearMin}
              onChange={(e) => setFilterOptions({ yearMin: parseInt(e.target.value) || 1900 })}
              min="1900"
              max={filterOptions.yearMax}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2"
            />
            <span className="text-gray-400 flex items-center">to</span>
            <input
              type="number"
              value={filterOptions.yearMax}
              onChange={(e) => setFilterOptions({ yearMax: parseInt(e.target.value) || new Date().getFullYear() })}
              min={filterOptions.yearMin}
              max={new Date().getFullYear()}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2"
            />
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Rating</h4>
          <div className="flex space-x-2">
            <input
              type="number"
              value={filterOptions.ratingMin}
              onChange={(e) => setFilterOptions({ ratingMin: parseFloat(e.target.value) || 0 })}
              min="0"
              max="10"
              step="0.1"
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2"
            />
            <span className="text-gray-400 flex items-center">to</span>
            <input
              type="number"
              value={filterOptions.ratingMax}
              onChange={(e) => setFilterOptions({ ratingMax: parseFloat(e.target.value) || 10 })}
              min="0"
              max="10"
              step="0.1"
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2"
            />
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Sort By</h4>
          <div className="flex">
            <select
              value={filterOptions.sortBy}
              onChange={(e) => setFilterOptions({ sortBy: e.target.value as any })}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-l-md p-2"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setFilterOptions({ sortOrder: filterOptions.sortOrder === 'asc' ? 'desc' : 'asc' })}
              className="bg-gray-700 px-3 rounded-r-md"
            >
              {filterOptions.sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
        
        <div className="md:col-span-2 flex items-end">
          <button
            onClick={handleReset}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieFilters;