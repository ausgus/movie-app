import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { id, title, overview, vote_average, demo_poster} = movie;

  return(
    <article className="movie-card">
      <Link className="movie-card__link" to={`/movie/${id}`}>
      <div className="movie-card__poster-wrap">
        <img src={demo_poster} alt={`${title} 포스터`} className="movie-card__poster" width="400" height="600"/>
      </div>

      <div className="movie-card__poster">
        <div className="movie-card__heading">
          <h3 className="text-ellipsis-1">{title}</h3>
          <span className="rating">{vote_average}</span>
        </div>

        <p className="movie-card__overview text-ellipsis-3">{overview}</p>
      </div>
      </Link>
    </article>
  )
}

export default MovieCard;