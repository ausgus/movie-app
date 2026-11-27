import process from 'node:process';

export async function GET(request) {
  const path = new URL(request.url).searchParams.get('path') ?? '';
  const [pathname, query] = path.split('?');
  const isSearch = pathname === '/search/movie';
  const isPopular = pathname === '/movie/popular';

  if (!isSearch && !isPopular && !/^\/movie\/\d+$/.test(pathname)) {
    return Response.json({ error: '지원하지 않는 영화 요청입니다.' }, { status: 400 });
  }

  const token = process.env.TMDB_ACCESS_TOKEN?.trim();
  if (!token) {
    return Response.json({ error: '영화 서비스 설정이 필요합니다.' }, { status: 503 });
  }

  const url = new URL(`https://api.themoviedb.org/3${pathname}`);
  url.searchParams.set('language', 'ko-KR');

  if (isSearch) {
    const keyword = new URLSearchParams(query).get('query')?.trim();
    if (!keyword) {
      return Response.json({ error: '검색어를 입력해 주세요.' }, { status: 400 });
    }
    url.searchParams.set('include_adult', 'false');
    url.searchParams.set('query', keyword);
  }

  if (isPopular) url.searchParams.set('page', '1');

  try {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return Response.json(
        { error: '영화 정보를 불러오지 못했습니다.' },
        { status: response.status },
      );
    }

    return Response.json(await response.json());
  } catch {
    return Response.json({ error: '영화 서비스에 연결하지 못했습니다.' }, { status: 502 });
  }
}
