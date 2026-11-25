import { demoMovies } from '../data/demoMovies';

const BASE_URL = 'https://api.themoviedb.org/3';
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN?.trim();

export const isDemoMode = !ACCESS_TOKEN;




async function request(path, { signal } = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    signal,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });


  if (!response.ok) {
    if (response.status === 404) throw new Error('해당 영화를 찾을 수 없습니다.');
    if (response.status === 401) throw new Error('영화 서비스 연결 설정을 확인하여 주십시요.');
    throw new Error('영화 정보를 불러오지 못했습니다. 잠시 후 다시 시도하여 주십시오.');
  }

  return response.json();
}





export async function getPopularMovies(options) {
  if (isDemoMode) return demoMovies;
  const data = await request('/movie/popular?language=ko-KR&page=1', options);
  return data.results;
}





export async function getMovieDetail(id, options) {
  if (!/^\d+$/.test(String(id))) throw new Error('해당 영화를 찾을 수 없습니다.');

  if(isDemoMode) {
    const movie = demoMovies.find((movie) => movie.id === Number(id));
    if (!movie) throw new Error('해당 영화를 찾을 수 없습니다.');
    return movie;
  }

  return request(`/movie/${id}?language=ko-KR`, options);
}





export async function getSearchedMovies(query, options) {
  const trimmed = query.trim();
  if(!trimmed) return [];

  if (isDemoMode) {
    const keyword = trimmed.toLocaleLowerCase();
    return demoMovies.filter((movie) => 
    `${movie.title} ${movie.original_title}`.toLocaleLowerCase().includes(keyword))
  }

  const data = await request(
    `/search/movie?language=ko-KR&include_adult=false&query=${encodeURIComponent(trimmed)}`,
    options,
  );
  return data.results;
}




export function getPosterUrl(movie) {
  if (isDemoMode && movie.demo_poster) return movie.demo_poster;
  if (!movie.poster_path) return '/images/no-image.svg';
  return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
}
