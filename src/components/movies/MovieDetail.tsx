import React from 'react';
import { Movie } from '../../types';
import { motion } from 'framer-motion';
import { BiX, BiEdit, BiTrash, BiStar, BiTime, BiCalendar, BiUser } from 'react-icons/bi';

interface MovieDetailProps {
  movie: Movie;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie, onClose}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-netflix-dark rounded-lg overflow-hidden w-full max-w-4xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75 transition"
        >
          <BiX size={24} />
        </button>
        
        <div className="relative h-80">
          <img 
            src={movie.backdropUrl || movie.posterUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <h2 className="text-4xl font-bold mb-2">{movie.title}</h2>
            <div className="flex flex-wrap items-center text-sm text-gray-300 space-x-4">
              <div className="flex items-center">
                <BiStar className="text-yellow-400 mr-1" />
                <span>{movie.rating.toFixed(1)}/10</span>
              </div>
              <div className="flex items-center">
                <BiCalendar className="mr-1" />
                <span>{movie.year}</span>
              </div>
              {movie.duration && (
                <div className="flex items-center">
                  <BiTime className="mr-1" />
                  <span>{movie.duration} min</span>
                </div>
              )}
              <span className="px-2 py-1 bg-netflix-red text-xs font-medium rounded">
                {movie.genre}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 hidden">
              <img 
                src={movie.posterUrl} 
                alt={movie.title} 
                className="w-full rounded-md shadow-md"
              />
            </div>
            
            <div className="md:w-2/3">
              <p className="text-gray-300 mb-6">
                {movie.description || 'No description available.'}
              </p>
              
              {movie.director && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-400">Director</h4>
                  <p className="text-white">{movie.director}</p>
                </div>
              )}
              
              {movie.cast && movie.cast.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-400">Cast</h4>
                  <p className="text-white">{movie.cast.join(', ')}</p>
                </div>
              )}
              
              {/* <div className="flex flex-wrap gap-3 mt-8">
                <button
                  onClick={onEdit}
                  className="bg-netflix-red hover:bg-red-700 text-white py-2 px-4 rounded-md transition flex items-center"
                >
                  <BiEdit className="mr-2" />
                  Edit Movie
                </button>
                <button
                  onClick={onDelete}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition flex items-center"
                >
                  <BiTrash className="mr-2" />
                  Delete Movie
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MovieDetail;