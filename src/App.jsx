import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner'
import AppLayout from './layouts/AppLayout';
import { LandingPage, DetailPage, SearchPage, Favorites} from './pages/index.js'
import './App.css';


function App() {

  const [authenticate, setAuthenticate] = useState(false);

  return (
    <>
      <Toaster position='bottom-center' richColors closeButton />
      <Routes>
        <Route element={<AppLayout authenticate={authenticate} setAuthenticate={setAuthenticate} />}>
          <Route path='/' element={<LandingPage />} />
          <Route path='/movie/:id' element={<DetailPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/favorites' element={<Favorites />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
