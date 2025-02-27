import React from 'react';
import Layout from '@/components/layout/Layout';
import { BiMovie, BiStar, BiTime, BiTrendingUp } from 'react-icons/bi';
import { useMovieContext } from '@/context/MovieContext';
import StatsCard from '@/components/dashboard/StatsCard';
import GenreDistribution from '@/components/dashboard/GenreDistribution';
import RatingChart from '@/components/dashboard/RatingChart';
import RecentAdditions from '@/components/dashboard/RecentAdditions';

export default function Dashboard() {
  const { stats } = useMovieContext();

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Movies"
            value={stats.totalMovies}
            icon={<BiMovie />}
          />
          <StatsCard
            title="Average Rating"
            value={stats.averageRating.toFixed(1)}
            icon={<BiStar />}
          />
          <StatsCard
            title="Total Watch Time"
            value={`${stats.totalDuration} mins`}
            icon={<BiTime />}
          />
          <StatsCard
            title="Most Popular Genre"
            value={stats.mostPopularGenre}
            icon={<BiTrendingUp />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GenreDistribution />
          <RatingChart />
        </div>

        <RecentAdditions />
      </div>
    </Layout>
  );
} 