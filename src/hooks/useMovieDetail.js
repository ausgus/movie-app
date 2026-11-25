

import { useEffect, useState } from "react";
import { getMovieDetail } from "../services/api";

export default function useMovieDetail(id) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const controller = new AbortController();


    async function loadMovie() {
      setLoading(true);
      setError('');
      setMovie(null);


      try {
        const data = await getMovieDetail(id, { signal: controller.signal });
        if (!controller.signal.aborted) setMovie(data);
      } catch (error) {
        if (!controller.signal.aborted) setError(error.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
      
    loadMovie();
    return () => controller.abort();
  }, [id]);

  return { movie, loading, error };
}
