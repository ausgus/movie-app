import { createContext, useContext } from 'react';

export const FavoritesContext = createContext(null);

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) throw new Error('FavoritesProvider 안에서 사용해 주세요.');
  return context;
}
