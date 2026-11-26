

import { supabase } from "../services/supabase";
import { useEffect, useState } from "react";
import { toast } from 'sonner';
import { FavoritesContext } from './favorites';


export function FavoritesProvider({ children, userId }) {
  
  const [favorites, setFavorites] = useState([]);
  const [favoritesReady, setFavoritesReady] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const controller = new AbortController();

    async function loadFavorites() {
      
      const { data, error } = await supabase
        .from('favorites')
        .select('movie_id')
        .eq('user_id', userId)
        .abortSignal(controller.signal);

      if (controller.signal.aborted) return;

      if (error) {
        toast.error('찜 목록을 불러오지 못했습니다.');
        console.error(error);
        return;
      }

      const ids = data.map((row) => row.movie_id);
      setFavorites(ids);
      setFavoritesReady(true);
      console.log('DB에서 읽은 찜 목록', ids);
    }

    loadFavorites();
    return () => controller.abort();
  }, [userId]);


  const addFavorite = async (id) => {
    const { error } = await supabase.from('favorites').upsert(
      { user_id: userId, movie_id: id },
      { onConflict: 'user_id,movie_id', ignoreDuplicates: true },
    );

    if (error) throw error;

    setFavorites((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };


  const removeFavorite = async (id) => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('movie_id', id);

    if (error) throw error;

    setFavorites((prev) => prev.filter((movieId) => movieId !== id));
  };

  
  const isFavorite = (id) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, favoritesReady, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
