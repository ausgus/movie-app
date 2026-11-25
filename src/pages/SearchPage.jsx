

import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { toast } from "sonner";
import useSearchedMovies from "../hooks/useSearchedMovies";
import LoadingOverlay from "../components/LoadingOverlay";
import MoviesGrid from "../components/MovieGrid";
import StateMessage from "../components/StateMessage";


const SearchPage = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query')?.trim() || '';
  const serchRef = useRef(null);
  const { movies, loading, error } = useSearchedMovies(query);


  const onSubmit = (event) => {
    event.preventDefault();
    const trimmed = serchRef.current.value.trim();

    if (!trimmed) {
      toast.warning('검색어를 입력해 주십시오.');
      serchRef.current.focus();
      return;
    }

    //주소에도 검색어를 저장하여 뒤로가기를 하여도 검색결과가 남음
    setSearchParams({ query: trimmed });
  };

  return (
    <section className="page">
      {loading && <LoadingOverlay />}
      <div className="page-heading">
        <p className="pageheading__eyebrow">어떤 이야기를 찾고 있나요?</p>
        <h2>영화 검색</h2>
      </div>

      <form className="serch-form" onSubmit={onSubmit}>
        <div className="serch-input-wrap">
          <Search size={21} />
          <input type="search" id="movie-search" placeholder="영화 제목을 입력해주십시오." ref={serchRef} key={query} defaultValue={query} autoComplete="off" />
        </div>
        <button className="btn btn--primary" type="submit">검색</button>
      </form>
      {error ? (
        <StateMessage title="검색하지 못했습니다." description={error} />
        ) : !query ? (
          <StateMessage title="보고 싶은 영화를 찾아보세요." description="한글 제목이나 영문제목으로 검색할 수 있습니다." />
        ) : !loading && movies.length === 0 ? (
          <StateMessage title={`"${query}" 검색 결과가 없습니다.`} description="다른 영화 제목으로 검색하십시오." />
        ) : (
          <>
            <p className="result-count">"{query}" 검색 결과 <strong>{movies.length}편</strong></p>
            <MoviesGrid movies={movies} />
          </>
        )
      }
    </section>
  )
}

export default SearchPage;