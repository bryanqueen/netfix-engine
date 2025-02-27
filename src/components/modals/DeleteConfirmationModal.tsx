import React from 'react';
import { useMovieContext } from '../../context/MovieContext';
import { Movie } from '../../types';
import { motion } from 'framer-motion';
import { BiX } from 'react-icons/bi';

interface DeleteConfirmationModalProps {
  movie: Movie;
  onClose: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ movie, onClose }) => {
  const { removeMovie } = useMovieContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await removeMovie(movie.id);
      onClose();
    } catch (err) {
      setError('Failed to delete movie. Please try again.');
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
        className="bg-netflix-dark rounded-lg w-full max-w-md"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Delete Movie</h2>
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

          <p className="text-gray-300 mb-6">
            Are you sure you want to delete &quot{movie.title}&quot? This action cannot be undone.
          </p>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition flex items-center justify-center min-w-[80px]"
            >
              {isLoading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-r-transparent rounded-full" />
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteConfirmationModal; 