import { useEffect, useState } from 'react';
import { getPopularMovies } from '../services/api';

export default function usePopularMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function loadMovies() {
      try {
        const data = await getPopularMovies({ signal: controller.signal });
        if (!controller.signal.aborted) setMovies(data);
      } catch (error) {
        if (!controller.signal.aborted) setError(error.message)
      } finally {
        if(!controller.signal.aborted) setLoading(false);
      } 
    }

    loadMovies();
    return () => controller.abort();
  },[]);

  return { movies, loading, error };
}