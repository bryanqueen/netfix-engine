import React from 'react';
import { useMovieContext } from '@/context/MovieContext';
import { motion } from 'framer-motion';
import { BiStar } from 'react-icons/bi';

const RecentAdditions: React.FC = () => {
  const { stats } = useMovieContext();

  return (
    <div className="bg-netflix-dark p-6 rounded-lg border border-gray-800">
      <h3 className="text-xl font-semibold mb-4">Recent Additions</h3>
      <div className="space-y-4">
        {stats.recentAdditions.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-4"
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-16 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="font-medium">{movie.title}</h4>
              <p className="text-sm text-gray-400">{movie.year}</p>
              <div className="flex items-center mt-1">
                <BiStar className="text-yellow-500 mr-1" />
                <span className="text-sm">{movie.rating.toFixed(1)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentAdditions; 