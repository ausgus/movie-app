
import { supabase } from './services/supabase.js';
import { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Toaster, toast } from 'sonner'
import { LandingPage, DetailPage, SearchPage, SignupPage, LoginPage, Favorites} from './pages/index.js'
import AppLayout from './layouts/AppLayout';
import StateMessage from './components/StateMessage.jsx';
import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import './App.css';



const ProtectedRoutes = ({ authenticate }) => {
  useEffect(() => {
    if (!authenticate) {
      toast.warning('로그인 후 이용해 주십시오.'), { id: 'login-required' };
    }
  }, [authenticate]);

  return authenticate ? <Outlet /> : <Navigate to={"/"} replace />
}


function App() {

  const [session, setSession] = useState(undefined);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const userId = session?.user?.id;
  const authenticate = Boolean(userId);

  if (session === undefined) {
    return <StateMessage title="로그인 상태를 확인 중 입니다." />
  }


  return (
    <>
      <Toaster position='bottom-center' richColors closeButton />
      <FavoritesProvider key={userId ?? 'guest'} userId={userId}>
        <Routes>
          <Route element={<AppLayout authenticate={authenticate} />}>
            <Route path='/' element={<LandingPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route element={<ProtectedRoutes authenticate={authenticate} />}>
              <Route path='/movie/:id' element={<DetailPage />} />
              <Route path='/favorites' element={<Favorites />} />
            </Route>
            <Route path='*'element={
              <StateMessage title="페이지를 찾을 수 없습니다." description="주소를 확인하거나 홈으로 돌아가 주십시오.">
                <Link className='btn btn--primary' to="/">홈으로</Link>
              </StateMessage>
            } />
        
          </Route>
        </Routes>
      </FavoritesProvider>
    </>
  );
}

export default App;
