import React from 'react';
import Image from 'next/image';
import { BiEdit, BiTrash, BiStar } from 'react-icons/bi';
import { Movie } from '@/types';
import Link from 'next/link';

interface MovieCardProps {
  movie: Movie;
  onEdit: () => void;
  onDelete: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onEdit, onDelete }) => {
  return (
    <div className="bg-netflix-dark rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <Link href={`/movies/${movie.id}`}>
        <div className="relative h-[400px]">
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="text-xl font-bold">{movie.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span>{movie.year}</span>
              <span>•</span>
              <span>{movie.genre}</span>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-1">
          <BiStar className="text-yellow-500" />
          <span>{movie.rating.toFixed(1)}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-2 hover:bg-gray-700 rounded-full"
          >
            <BiEdit size={20} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-gray-700 rounded-full text-red-500"
          >
            <BiTrash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;