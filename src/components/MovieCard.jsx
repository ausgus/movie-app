import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/favorites';
import { getPosterUrl } from '../services/api';

const MovieCard = ({ movie }) => {
  const { id, title, overview, vote_average } = movie;
  const { isFavorite } = useFavorites();

  return(
    <article className="movie-card">
      <Link className="movie-card__link" to={`/movie/${id}`}>
        <div className="movie-card__poster-wrap">
          <img
            src={getPosterUrl(movie)}
            alt={`${title} 포스터`}
            className="movie-card__poster"
            width="400" height="600"
            onError={(event) => {
              if (event.currentTarget.getAttribute('src') !== '/images/no-image.svg') {
                event.currentTarget.src = '/images/no-image.svg';
              }
            }}
          />

          {isFavorite(id) && <span className='movie-card__favorite'><Heart size={16} fill='currentColor' /></span>}
        </div>

        <div className="movie-card__body">
          <div className="movie-card__heading">
            <h3 className="text-ellipsis-1">{title}</h3>
            <span className="rating">
              <Star size={12} fill='currentColor' />
              {Number(vote_average || 0).toFixed(1)}
            </span>
          </div>

          <p className="movie-card__overview text-ellipsis-3">{overview || '아직 등록된 줄거리가 없습니다.'}</p>
        </div>
        </Link>
    </article>
  )
}

export default MovieCard;
