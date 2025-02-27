// src/utils/api.ts
import { Movie, Genre } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Sample movie data for initial setup
const sampleMovies: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'Inception',
    year: 2010,
    genre: 'Thriller',
    rating: 8.8,
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    posterUrl: 'https://image.tmdb.org/t/p/original/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg',
    backdropUrl: 'https://images3.alphacoders.com/610/610318.jpg',
    duration: 148,
  },
  {
    title: 'Spirited Away',
    year: 2001,
    genre: 'Anime',
    rating: 8.6,
    director: 'Hayao Miyazaki',
    cast: ['Rumi Hiiragi', 'Miyu Irino', 'Mari Natsuki'],
    description: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.',
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLjkFIaR2x3BF__b6d2_vsfpeXOO_HeFwVLg&s',
    backdropUrl: 'https://c4.wallpaperflare.com/wallpaper/426/891/606/movie-spirited-away-chihiro-spirited-away-haku-spirited-away-hd-wallpaper-thumb.jpg',
    duration: 125,
  },
  {
    title: 'The Dark Knight',
    year: 2008,
    genre: 'Action',
    rating: 9.0,
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/original/6fA9nie4ROlkyZAUlgKNjGNCbHG.jpg',
    duration: 152,
  },
  {
    title: 'Interstellar',
    year: 2014,
    genre: 'Adventure',
    rating: 8.6,
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_.jpg',
    backdropUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjPgG2AJvjT3JVajSVtmuyeww6n6ojSvaK8g&s',
    duration: 169,
  },
  {
    title: 'Gravity',
    year: 2013,
    genre: 'Action',
    rating: 7.7,
    director: 'Alfonso Cuarón',
    cast: ['Sandra Bullock', 'George Clooney'],
    description: 'Two astronauts work together to survive after an accident leaves them stranded in space.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNjE5MzYwMzYxMF5BMl5BanBnXkFtZTcwOTk4MTk0OQ@@._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://images7.alphacoders.com/487/487130.jpg',
    duration: 91,
  },
  {
    title: 'Peaky Blinders',
    year: 2013,
    genre: 'Drama',
    rating: 8.8,
    director: 'Steven Knight',
    cast: ['Cillian Murphy', 'Paul Anderson', 'Helen McCrory'],
    description: 'A gangster family epic set in Birmingham, England, in 1919, centered on a gang who sew razor blades in the peaks of their caps.',
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrNxSTfTGfajumHu0c2d8dA3kpU-uZG5pgqw&s',
    backdropUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPO29dBaHXh75WxoZ7WQp3JMh4fOd9TjydZw&s',
    duration: 60,
  },
  {
    title: 'The Godfather',
    year: 1972,
    genre: 'Crime',
    rating: 9.2,
    director: 'Francis Ford Coppola',
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    posterUrl: 'https://m.media-amazon.com/images/I/51Eq4-xce0L._AC_SL1000_.jpg',
    backdropUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbaz6a7JoqEcaYCXnNa1S1Xa0CvttfUoJbJg&s',
    duration: 175,
  },
  {
    title: 'The Shining',
    year: 1980,
    genre: 'Horror',
    rating: 8.4,
    director: 'Stanley Kubrick',
    cast: ['Jack Nicholson', 'Shelley Duvall', 'Danny Lloyd'],
    description: 'A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNmM5ZThhY2ItOGRjOS00NzZiLWEwYTItNDgyMjFkOTgxMmRiXkEyXkFqcGc@._V1_.jpg',
    backdropUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfo93wNiRdf-8Jg-1V_SRpQ4AZ26ce-9VSmQ&s',
    duration: 146,
  },
  {
    title: 'Braveheart',
    year: 1995,
    genre: 'History',
    rating: 8.3,
    director: 'Mel Gibson',
    cast: ['Mel Gibson', 'Sophie Marceau', 'Patrick McGoohan'],
    description: 'When his secret bride is executed for assaulting an English soldier who tried to rape her, William Wallace begins a revolt against King Edward I of England.',
    posterUrl: 'https://i5.walmartimages.com/asr/897987b8-01f3-4872-9c78-3771d01354db.35517d9359c3f1a780ee6cab82f401a0.jpeg',
    backdropUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcHYeWIPsT_2ElBVJivZBBiTtZZVIX_oZ1rQ&s',
    duration: 178,
  },
];

// Initialize local storage with sample data if empty
const initializeLocalStorage = () => {
  const storedMovies = localStorage.getItem('movies');
  if (!storedMovies) {
    const initialMovies = sampleMovies.map(movie => ({
      ...movie,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    localStorage.setItem('movies', JSON.stringify(initialMovies));
  }
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch all movies
export const fetchMovies = async (): Promise<Movie[]> => {
  initializeLocalStorage();
  await delay(500); // Simulate network delay
  const storedMovies = localStorage.getItem('movies');
  return storedMovies ? JSON.parse(storedMovies) : [];
};

// Add a new movie
export const addMovie = async (movie: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>): Promise<Movie> => {
  const storedMovies = localStorage.getItem('movies');
  const movies: Movie[] = storedMovies ? JSON.parse(storedMovies) : [];
  
  const newMovie: Movie = {
    ...movie,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  movies.push(newMovie);
  localStorage.setItem('movies', JSON.stringify(movies));
  
  await delay(300); // Simulate network delay
  return newMovie;
};

// Update an existing movie
export const updateMovie = async (id: string, movieData: Partial<Movie>): Promise<Movie> => {
  const storedMovies = localStorage.getItem('movies');
  const movies: Movie[] = storedMovies ? JSON.parse(storedMovies) : [];
  
  const movieIndex = movies.findIndex(movie => movie.id === id);
  if (movieIndex === -1) {
    throw new Error('Movie not found');
  }
  
  const updatedMovie: Movie = {
    ...movies[movieIndex],
    ...movieData,
    updatedAt: new Date(),
  };
  
  movies[movieIndex] = updatedMovie;
  localStorage.setItem('movies', JSON.stringify(movies));
  
  await delay(300); // Simulate network delay
  return updatedMovie;
};

// Delete a movie
export const deleteMovie = async (id: string): Promise<void> => {
  const storedMovies = localStorage.getItem('movies');
  const movies: Movie[] = storedMovies ? JSON.parse(storedMovies) : [];
  
  const updatedMovies = movies.filter(movie => movie.id !== id);
  localStorage.setItem('movies', JSON.stringify(updatedMovies));
  
  await delay(300); // Simulate network delay
};