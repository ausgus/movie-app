import usePopularMovies from '../hooks/usePopularMovies';
import LoadingOverlay from '../components/LoadingOverlay';
import MoviesGrid from "../components/MovieGrid";
import StateMessage from '../components/StateMessage';
import { isDemoMode } from "../services/api";



const LandingPage = () => {

  const { movies, loading, error } = usePopularMovies();


  return (
    <section className="page page--landing">
      {loading && <LoadingOverlay />}
      <div className="page-heading">
        <p className="page-heading__eyebrow">나만의 작은 영화관</p>
        <h2>지금 인기 있는 영화를 골라 시청하세요!</h2>
        <p className="page-heading__description">영화 카드를 눌러 이야기를 만나 보세요.</p>
      </div>

      {isDemoMode && <p className='demo-notice'>예제 영화로 둘러보는 중입니다. 실시간 인기 순위와 다릅니다.</p>}

      {error ? (
        <StateMessage title='영화를 불러오지 못했습니다.' description={error} />
      ) : (
        <MoviesGrid movies={movies} />
      )}
      
      {!loading && !error && movies.length === 0 && <StateMessage title='아직 등록된 영화가 없습니다.' />}
      <p className="tmdb-credit">
        영화 이미지 및 데이터 출처 <a href="https://www.themoviedb.org/" target='_blank' rel='noreferrer'></a>
        <span>This produvt uses the TMDB API is not endorsed or certified by TMDB</span>
      </p>
    </section>
  )
}

export default LandingPage;