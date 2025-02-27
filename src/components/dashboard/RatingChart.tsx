import React from 'react';
import { useMovieContext } from '@/context/MovieContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RatingChart: React.FC = () => {
  const { movies } = useMovieContext();

  // Group movies by year and calculate average rating
  const ratingsByYear = movies.reduce((acc, movie) => {
    if (!acc[movie.year]) {
      acc[movie.year] = { total: movie.rating, count: 1 };
    } else {
      acc[movie.year].total += movie.rating;
      acc[movie.year].count += 1;
    }
    return acc;
  }, {} as Record<number, { total: number; count: number }>);

  const years = Object.keys(ratingsByYear).sort();
  const averageRatings = years.map(
    year => ratingsByYear[Number(year)].total / ratingsByYear[Number(year)].count
  );

  const data = {
    labels: years,
    datasets: [
      {
        label: 'Average Rating',
        data: averageRatings,
        borderColor: '#E50914',
        backgroundColor: 'rgba(229, 9, 20, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 10,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#ffffff',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#ffffff',
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-netflix-dark p-6 rounded-lg border border-gray-800">
      <h3 className="text-xl font-semibold mb-4">Rating Trends</h3>
      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default RatingChart; 