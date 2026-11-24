import MovieCard  from "./MovieCard";

const MoviesGrid = ({ movies }) => (
  <div className="movies-grid">
    {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
  </div>
)

export default MoviesGrid;