import React from 'react';
import { useMovieContext } from '@/context/MovieContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GenreDistribution: React.FC = () => {
  const { stats } = useMovieContext();
  
  const data = {
    labels: Object.keys(stats.genreDistribution),
    datasets: [
      {
        data: Object.values(stats.genreDistribution),
        backgroundColor: [
          '#E50914', // Netflix red
          '#831010',
          '#B81D24',
          '#C11119',
          '#D81F26',
          '#E50914',
          '#F40612',
          '#FF0A16',
        ],
        borderColor: 'rgba(17, 17, 17, 0.5)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#ffffff',
          font: {
            size: 12,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-netflix-dark p-6 rounded-lg border border-gray-800">
      <h3 className="text-xl font-semibold mb-4">Genre Distribution</h3>
      <div className="h-[300px]">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default GenreDistribution; 