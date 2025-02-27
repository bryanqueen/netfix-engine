import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieCard from '../movies/MovieCard';
import { Movie, Genre } from '@/types';

const mockMovie: Movie = {
  id: '1',
  title: 'Test Movie',
  year: 2023,
  genre: 'Action' as Genre,
  rating: 8.5,
  posterUrl: '/test-poster.jpg',
  description: 'Test description',
  director: 'Test Director',
  cast: ['Actor 1', 'Actor 2'],
  duration: 120,
  backdropUrl: '/test-backdrop.jpg',
  createdAt: new Date(),
  updatedAt: new Date()
};

describe('MovieCard', () => {
  it('renders movie information correctly', () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();

    render(
      <MovieCard 
        movie={mockMovie} 
        onEdit={onEdit} 
        onDelete={onDelete} 
      />
    );

    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.year.toString())).toBeInTheDocument();
    expect(screen.getByText(mockMovie.genre)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.rating.toFixed(1))).toBeInTheDocument();
  });

}); 