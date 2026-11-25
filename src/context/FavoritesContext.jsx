

import { useEffect, useState } from "react";
import { toast } from 'sonner';
import { FavoritesContext } from './favorites';

const STORAGE_KEY = 'netflix-app-favorites';


function readFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    if (!Array.isArray(stored)) return [];

    return [...new Set(stored.filter((id) => Number.isInteger(id) && id > 0))]
  } catch {
    return [];
  }
}

  
export function FavoritesProvider({ children }) {
  //첫 실행 때만 저장된 찜목록을 읽음

  const [favorites, setFavorites] = useState(readFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      toast.warning('브라우저에 찜 목록을 저장할 수 없습니다.', { id: 'storage-error' });
    }
  }, [favorites]);


  const addFavorite = (id) => {
    setFavorites((prev) => prev.includes(id) ? prev : [...prev, id]);
  }


  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((movieId) => movieId !== id));
  }

  
  const isFavorite = (id) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
