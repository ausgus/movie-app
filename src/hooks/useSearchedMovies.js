
import { useEffect, useState } from "react";
import { getSearchedMovies } from "../services/api";

export default function useSearchedMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadedQuery, setLoadedQuery] = useState(null);


  useEffect(() => {
    const controller = new AbortController();

    async function searchMovies() {
      setLoading(Boolean(query));
      setError('');
      setMovies([]);


      try {
        const data = await getSearchedMovies(query, { signal: controller.signal });
        if (!controller.signal.aborted) setMovies(data);
      } catch (error) {
        if (!controller.signal.aborted) setError(error)
      } finally {
      if (!controller.signal.aborted) {
        setLoadedQuery(query);
        setLoading(false);
        }
      }
    }

    searchMovies();
    return () => controller.abort();
  }, [query]);


  //새 검색어의 요청이 끝나기 전에 '검색 결과 없음' 이 뜨지 않게 하기

  return {
    movies: loadedQuery === query ? movies : [],
    loading: Boolean(query) && (loading || loadedQuery !== query),
    error: loadedQuery === query ? error : '',
  };
}