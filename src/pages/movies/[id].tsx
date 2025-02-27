import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { useMovieContext } from '@/context/MovieContext';
import MovieDetail from '@/components/movies/MovieDetail';

export default function MoviePage() {
  const router = useRouter();
  const { id } = router.query;
  const { movies } = useMovieContext();
  
  const movie = movies.find(m => m.id === id);

  if (!movie) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <p className="text-xl">Movie not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <MovieDetail 
          movie={movie}
          onClose={() => router.push('/movies')}
          onEdit={() => {/* Handle edit */}}
          onDelete={() => {/* Handle delete */}}
        />
      </div>
    </Layout>
  );
} 