

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { toast } from "sonner";
import useMovieDetail from "../hooks/useMovieDetail";
import { useFavorites } from "../context/favorites";
import { getPosterUrl } from "../services/api";
import LoadingOverlay from "../components/LoadingOverlay";
import StateMessage from "../components/StateMessage";



function DetailPage() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, loading, error } = useMovieDetail(id);
  const { isFavorite, addFavorite, removeFavorite, favoritesReady } = useFavorites();
  const [favoritePending, setFavoritePending] = useState(false);

  const onBackClick = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate('/');
  };

  const onFavoriteClick = async () => {

    setFavoritePending(true);


    try {
      if (isFavorite(movie.id)) {
        await removeFavorite(movie.id);
        toast.success('찜 목록에서 삭제하였습니다.');
      } else {
        await addFavorite(movie.id);
        toast.success('찜 목록에 추가하였습니다.');
      }
    } catch {
      toast.error('찜 목록을 변경하지 못했습니다.');
    } finally {
      setFavoritePending(false);
    }
  };


  if (loading) return <LoadingOverlay />
  if (error || !movie) return (
    <section className="page">
      <StateMessage title="영화 정보를 확인할 수 없습니다." description={error}>
        <button className="btn btn--primary" type="button" onClick={onBackClick}>뒤로 가기</button>
      </StateMessage>
    </section>
  )


  return (
    <section className="page">
      <div className="page-heading page-heading--compact">
        <p className="page-heading__eyebrow">이 영화의 이야기</p>
        <h2>영화 상세 정보</h2>
      </div>

      <article className="movie-detail">
        <img
        className="movie-detail__poster"
        src={getPosterUrl(movie)}
        alt={`${movie.title} 포스터`}
        width={400} height={600}
        onError={(event) => {
          if (event.currentTarget.getAttribute('src') !== '/images/no-image.svg') {
            event.currentTarget.src = '/images/no-image.svg';
          }
        }}
        />

        <div className="movie-detail__body">
          <p className="movie-detail__original-title">{movie.original_title}</p>
          <h3>{movie.title}</h3>
          <div className="movie-detail__meta">
            <span className="rating rating--detail"><Star size={15} fill="currentColor" />평점 {Number(movie.vote_average || 0).toFixed(1)}</span>
            {movie.relese_data && <span>{movie.release_data.slice(0, 4)}년</span>}
            {movie.runtime > 0 && <span>{movie.runtime}분</span>}
          </div>

          <div className="genre-list">
            {movie.genres?.map((genre) => <span className="genre" key={genre.id}>{genre.name}</span>)}
          </div>

          <h4>줄거리</h4>
          <p className="movie-detail__overview">{movie.overview || '아직 등록된 줄거리가 없습니다.'}</p>
          <div className="movie-detail__actions">
            <button className="btn btn--secondary" type="button" onClick={onBackClick}>뒤로가기</button>
            <button
              className="btn btn--primary"
              type="button"
              onClick={onFavoriteClick}
              disabled={!favoritesReady || favoritePending}
            >
              <Heart size={19} fill={isFavorite(movie.id) ? 'currentColor' : 'none'} />
              {isFavorite(movie.id) ? '좋아요 취소' : '좋아요'}
            </button>
          </div>
        </div>
      </article>
    </section>
  )
}

export default DetailPage;