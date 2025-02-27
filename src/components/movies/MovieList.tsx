import React, { useState } from 'react';
import { useMovieContext } from '@/context/MovieContext';
import MovieActions from './MovieActions';
import MovieCard from './MovieCard';
import AddMovieModal from '../modals/AddMovieModal';
import EditMovieModal from '../modals/EditMovieModal';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';
import { Movie } from '@/types';

const MovieList: React.FC = () => {
  const { movies } = useMovieContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{ genre: string; year: number | null }>({ genre: '', year: null });
  const [showAddModal, setShowAddModal] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null);
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = !filters.genre || movie.genre === filters.genre;
    const matchesYear = !filters.year || movie.year === filters.year;
    return matchesSearch && matchesGenre && matchesYear;
  });

  return (
    <div className="">
      <MovieActions
        onAddMovie={() => setShowAddModal(true)}
        onSearch={setSearchQuery}
        onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onEdit={() => setMovieToEdit(movie)}
            onDelete={() => setMovieToDelete(movie)}
          />
        ))}
      </div>

      {showAddModal && (
        <AddMovieModal onClose={() => setShowAddModal(false)} />
      )}

      {movieToEdit && (
        <EditMovieModal
          movie={movieToEdit}
          onClose={() => setMovieToEdit(null)}
        />
      )}

      {movieToDelete && (
        <DeleteConfirmationModal
          movie={movieToDelete}
          onClose={() => setMovieToDelete(null)}
        />
      )}
    </div>
  );
};

export default MovieList;
