// src/context/MovieContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Movie, FilterOptions, Stats, Genre } from '../types';
import { fetchMovies, addMovie, updateMovie, deleteMovie } from '@/utils/api';


interface MovieContextType {
  movies: Movie[];
  filteredMovies: Movie[];
  stats: Stats;
  loading: boolean;
  error: string | null;
  filterOptions: FilterOptions;
  selectedMovie: Movie | null;
  setFilterOptions: (options: Partial<FilterOptions>) => void;
  addNewMovie: (movie: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateExistingMovie: (id: string, movie: Partial<Movie>) => Promise<void>;
  removeMovie: (id: string) => Promise<void>;
  selectMovie: (movie: Movie | null) => void;
}

const defaultStats: Stats = {
  totalMovies: 0,
  averageRating: 0,
  genreDistribution: {} as Record<Genre, number>,
  yearDistribution: {},
  recentAdditions: [],
  totalDuration: 0,
  mostPopularGenre: '',
};

const defaultFilterOptions: FilterOptions = {
  search: '',
  genre: '',
  yearMin: 1900,
  yearMax: new Date().getFullYear(),
  ratingMin: 0,
  ratingMax: 10,
  sortBy: 'title',
  sortOrder: 'asc',
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [stats, setStats] = useState<Stats>(defaultStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(defaultFilterOptions);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Fetch movies on component mount
  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchMovies();
        setMovies(data);
        setFilteredMovies(data);
        calculateStats(data);
      } catch (error) {
        setError('Failed to fetch movies');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  // Apply filters whenever filter options or movies change
  useEffect(() => {
    applyFilters();
  }, [filterOptions, movies]);

  // Calculate statistics based on the current movie collection
  const calculateStats = (movieData: Movie[]) => {
    if (movieData.length === 0) {
      setStats(defaultStats);
      return;
    }

    // Calculate total movies
    const totalMovies = movieData.length;

    // Calculate average rating
    const totalRating = movieData.reduce((sum, movie) => sum + movie.rating, 0);
    const averageRating = totalRating / totalMovies;

    // Calculate genre distribution
    const genreDistribution = movieData.reduce((acc, movie) => {
      acc[movie.genre] = (acc[movie.genre] || 0) + 1;
      return acc;
    }, {} as Record<Genre, number>);

    // Calculate year distribution
    const yearDistribution = movieData.reduce((acc, movie) => {
      acc[movie.year] = (acc[movie.year] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    // Get recent additions (last 5)
    const recentAdditions = [...movieData]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    // Calculate total duration
    const totalDuration = movieData.reduce((sum, movie) => sum + (movie.duration || 0), 0);

    // Find most popular genre
    const mostPopularGenre = Object.entries(genreDistribution)
      .sort(([,a], [,b]) => b - a)[0][0];

    setStats({
      totalMovies,
      averageRating,
      genreDistribution,
      yearDistribution,
      recentAdditions,
      totalDuration,
      mostPopularGenre,
    });
  };

  // Apply filters based on current filter options
  const applyFilters = () => {
    let filtered = [...movies];

    // Apply search filter
    if (filterOptions.search) {
      const searchLower = filterOptions.search.toLowerCase();
      filtered = filtered.filter(movie => 
        movie.title.toLowerCase().includes(searchLower) ||
        movie.director?.toLowerCase().includes(searchLower) ||
        movie.cast?.some(actor => actor.toLowerCase().includes(searchLower))
      );
    }

    // Apply genre filter
    if (filterOptions.genre) {
      filtered = filtered.filter(movie => movie.genre === filterOptions.genre);
    }

    // Apply year range filter
    filtered = filtered.filter(
      movie => movie.year >= filterOptions.yearMin && movie.year <= filterOptions.yearMax
    );

    // Apply rating range filter
    filtered = filtered.filter(
      movie => movie.rating >= filterOptions.ratingMin && movie.rating <= filterOptions.ratingMax
    );

    // Apply sorting
    filtered.sort((a, b) => {
      let valueA, valueB;

      switch (filterOptions.sortBy) {
        case 'title':
          valueA = a.title.toLowerCase();
          valueB = b.title.toLowerCase();
          break;
        case 'year':
          valueA = a.year;
          valueB = b.year;
          break;
        case 'rating':
          valueA = a.rating;
          valueB = b.rating;
          break;
        case 'createdAt':
          valueA = new Date(a.createdAt).getTime();
          valueB = new Date(b.createdAt).getTime();
          break;
        default:
          valueA = a.title.toLowerCase();
          valueB = b.title.toLowerCase();
      }

      if (filterOptions.sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    setFilteredMovies(filtered);
  };

  // Update filter options
  const updateFilterOptions = (options: Partial<FilterOptions>) => {
    setFilterOptions(prev => ({ ...prev, ...options }));
  };

  // Add a new movie
  const addNewMovie = async (movie: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    try {
      const newMovie = await addMovie(movie);
      setMovies(prev => [...prev, newMovie]);
      calculateStats([...movies, newMovie]);
    } catch (error) {
      setError('Failed to add movie');
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing movie
  const updateExistingMovie = async (id: string, movieData: Partial<Movie>) => {
    setLoading(true);
    try {
      const updatedMovie = await updateMovie(id, movieData);
      setMovies(prev => prev.map(movie => movie.id === id ? updatedMovie : movie));
      if (selectedMovie && selectedMovie.id === id) {
        setSelectedMovie(updatedMovie);
      }
      calculateStats(movies.map(movie => movie.id === id ? updatedMovie : movie));
    } catch (error) {
      setError('Failed to update movie');
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Remove a movie
  const removeMovie = async (id: string) => {
    setLoading(true);
    try {
      await deleteMovie(id);
      const updatedMovies = movies.filter(movie => movie.id !== id);
      setMovies(updatedMovies);
      if (selectedMovie && selectedMovie.id === id) {
        setSelectedMovie(null);
      }
      calculateStats(updatedMovies);
    } catch (error) {
      setError('Failed to delete movie');
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Select a movie for detailed view
  const selectMovie = (movie: Movie | null) => {
    setSelectedMovie(movie);
  };

  const value = {
    movies,
    filteredMovies,
    stats,
    loading,
    error,
    filterOptions,
    selectedMovie,
    setFilterOptions: updateFilterOptions,
    addNewMovie,
    updateExistingMovie,
    removeMovie,
    selectMovie,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};

// Custom hook to use the MovieContext
export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};