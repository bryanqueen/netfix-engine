import React, { useState } from 'react';
import { useMovieContext } from '../../context/MovieContext';
import { Genre, Movie } from '../../types';
import { motion } from 'framer-motion';
import { BiX } from 'react-icons/bi';

interface EditMovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const EditMovieModal: React.FC<EditMovieModalProps> = ({ movie, onClose }) => {
  const { updateExistingMovie } = useMovieContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    ...movie,
    cast: Array.isArray(movie.cast) ? movie.cast.join(', ') : '',
  });

  const genres: Genre[] = [
    'Adventure', 'Anime', 'Thriller', 'Action', 
    'Drama', 'Crime', 'Horror', 'History', 'Comedy',
    'Documentary', 'Sci-Fi', 'Fantasy', 'Romance',
    'Mystery', 'Family', 'Western'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'year' || name === 'rating' || name === 'duration') {
      setFormData({
        ...formData,
        [name]: parseFloat(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title) {
      setError('Title is required');
      return;
    }
    
    if (!formData.genre) {
      setError('Genre is required');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedMovie = {
        ...formData,
        cast: typeof formData.cast === 'string' ? formData.cast.split(',').map(item => item.trim()) : formData.cast,
        genre: formData.genre as Genre,
      };
      
      await updateExistingMovie(movie.id, updatedMovie);
      onClose();
    } catch (err) {
      setError('Failed to update movie. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-netflix-dark rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Edit Movie</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <BiX size={24} />
            </button>
          </div>
          
          {error && (
            <div className="bg-red-900 text-white p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Genre*
                </label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2"
                  required
                >
                  <option value="">Select Genre</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Rating (0-10)
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  step="0.1"
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Director
                </label>
                <input
                  type="text"
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Cast (comma separated)
                </label>
                <input
                  type="text"
                  name="cast"
                  value={formData.cast}
                  onChange={handleChange}
                  placeholder="Actor 1, Actor 2, Actor 3"
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="1"
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Poster URL
                </label>
                <input
                  type="text"
                  name="posterUrl"
                  value={formData.posterUrl}
                  onChange={handleChange}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Backdrop URL
                </label>
                <input
                  type="text"
                  name="backdropUrl"
                  value={formData.backdropUrl}
                  onChange={handleChange}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-netflix-red hover:bg-red-700 text-white py-2 px-4 rounded-md transition flex items-center justify-center min-w-[80px]"
              >
                {isLoading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white border-r-transparent rounded-full" />
                ) : (
                  'Add Movie'
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default EditMovieModal; 