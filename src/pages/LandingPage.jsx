import MoviesGrid from "../components/MovieGrid"
import { demoMovies } from '../data/demoMovies'

function LandingPage() {
  return (
    <section className="page">
      <div className="page-heading"><h2>지금 인기 있는 영화를 골라 시청하세요!</h2></div>
      <MoviesGrid movies={demoMovies} />
    </section>
  )
}

export default LandingPage