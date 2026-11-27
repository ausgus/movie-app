
import { supabase } from '../services/supabase';
import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Film, Heart, House, LogIn, LogOut, Search, UserRound } from 'lucide-react';
import { toast } from 'sonner';

const AppLayout = ({ authenticate }) => {
  
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  const onButtonClick = async () => {
    if (!authenticate) {
      navigate('/login');
      return
    }

    const { error } = await supabase.auth.signOut({ scope: 'local'});

    if (error) {
      toast.error('로그아웃 실패');
      return;
    }

    navigate('/', { replace: true });
    toast.success('로그아웃 되었습니다.');
  };

  return(
    <div className="app-layout">
      <div className="cinema-backdrop" />

      <header className="app-header">
        <div className="app-header__inner">
          <h1 className="brand">
            <Link to="/"><Film size={30} /></Link>
          </h1>
          <nav className="main-nav">
            <NavLink className="nav-link" to="/" end>
              <House size={22} /><span>홈</span>
            </NavLink>
            
            <NavLink className="nav-link" to="/search">
              <Search size={22} /><span>검색</span>
            </NavLink>

            <NavLink className="nav-link" to="/favorites">
              <Heart size={22} /><span>찜 목록</span>
            </NavLink>
          </nav>
          
        </div>
      </header>


      <main className="app-main">
        <Outlet />
      </main>


      <footer className="app-footer">
        <div className="app-footer__inner">
          <div className="auth-status">
            <span className={`avatar${authenticate ? 'avatar--online' : ''}`}>
              <UserRound size={23} />
            </span>

            <div>
              <p className="auth-status__title">{authenticate ? '온라인' : '오프라인'}</p>
              <p className="auth-status__description">{authenticate ? '마음에 드는 영화를 찜해 보세요.' : '로그인하고 더 많은 기능을 누려보세요.'}</p>
            </div>
          </div>


          <div className="footer-actions">
            <span className="data-source">예제 영화</span>
            <button className="btn btn--login" type="button" onClick={onButtonClick}>
              {authenticate ? <LogOut size={19} /> : <LogIn size={19} />}
              {authenticate ? '로그아웃' : '로그인'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}


export default AppLayout;
