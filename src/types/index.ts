export interface Movie {
    id: string;
    title: string;
    year: number;
    genre: Genre;
    rating: number;
    director?: string;
    cast?: string[];
    description?: string;
    posterUrl: string;
    backdropUrl?: string;
    duration?: number; // in minutes
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type Genre = 
    | 'Adventure' 
    | 'Anime' 
    | 'Thriller' 
    | 'Action' 
    | 'Drama' 
    | 'Crime' 
    | 'Horror' 
    | 'History'
    | 'Comedy'
    | 'Documentary'
    | 'Sci-Fi'
    | 'Fantasy'
    | 'Romance'
    | 'Mystery'
    | 'Family'
    | 'Western';
  
  export interface FilterOptions {
    search: string;
    genre: Genre | '';
    yearMin: number;
    yearMax: number;
    ratingMin: number;
    ratingMax: number;
    sortBy: 'title' | 'year' | 'rating' | 'createdAt';
    sortOrder: 'asc' | 'desc';
  }
  
  export interface Stats {
    totalMovies: number;
    averageRating: number;
    genreDistribution: Record<Genre, number>;
    yearDistribution: Record<number, number>;
    recentAdditions: Movie[];
    totalDuration: number;
    mostPopularGenre: string;
  }