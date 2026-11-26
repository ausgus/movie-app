
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/favorites";
import { getMovieDetail } from "../services/api";
import MoviesGrid from "../components/MovieGrid";
import LoadingOverlay from "../components/LoadingOverlay";
import StateMessage from "../components/StateMessage";



const Favorites = () => {

  const { favorites } = useFavorites();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadFavorites() {
      setLoading(true);
      setError('');
      setMovies([]);


      //영화를 중간에 불러오지 못해도 나머지 찜목록은 표시

      const results = await Promise.allSettled(
        favorites.map((id) => getMovieDetail(id, { Signal: controller.Signal })),
      );

      if (controller.signal.aborted) return;


      setMovies(results.filter((result) => result.status === 'fulfilled').map((result) => result.value));
      if (results.some((result) => result.status === 'rejected')) {
        setError('일부 영화 정보를 불러오지 못하였습니다. 잠시 후 다시 확인해 주십시오');
      }
      setLoading(false);
    }

    loadFavorites();
    return () => controller.abort();
  }, [favorites]);



  return(
    <section className="page">
      {loading && <LoadingOverlay />}
      <div className="page-heading">
        <p className="page-heading__eybrow">다시 만나고 싶은 이야기</p>
        <h2>내가 찜한 영화</h2>
        <p className="page-heading__description">좋아하는 영화들을 한곳에서 모아보세요.</p>
      </div>

      {error && <p className="error-notice">{error}</p>}
      {!loading && favorites.length === 0 ? (
        <StateMessage title="아직 찜한 영화가 없습니다." description="영화 상세 화면에서 좋아요를 눌러보세요.">
          <Link className="btn btn--primary" to={"/"}>영화 둘러보기</Link>
        </StateMessage>
      ) : (
        <>
          <p className="result-count">찜한 영화 <strong>{favorites.length}편</strong></p>
          <MoviesGrid movies={movies} />
        </>
      )}
    </section>
  );
};

export default Favorites;