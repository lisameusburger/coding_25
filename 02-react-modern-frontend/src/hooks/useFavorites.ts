import { useCallback } from 'react';
import type { FavoriteCity } from '../types';
import useLocalStorage from './useLocalStorage';

interface UseFavoritesReturn {
  favorites: FavoriteCity[];
  addFavorite: (name: string, country: string) => void;
  removeFavorite: (name: string) => void;
  isFavorite: (name: string) => boolean;
  clearFavorites: () => void;
}

/**
 * Custom hook for managing favorite cities
 * Automatically persists to localStorage
 * 
 * @returns Object with favorites array and management functions
 */
const useFavorites = (): UseFavoritesReturn => {
  const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>('weather-favorites', []);

  const addFavorite = useCallback((name: string, country: string) => {
    setFavorites((prev) => {
      // Check if already exists
      if (prev.some((fav) => fav.name.toLowerCase() === name.toLowerCase())) {
        console.log('💖 City already in favorites:', name);
        return prev;
      }
      
      const newFavorite: FavoriteCity = {
        name,
        country,
        addedAt: Date.now()
      };
      
      console.log('💖 Added to favorites:', name);
      return [...prev, newFavorite];
    });
  }, [setFavorites]);

  const removeFavorite = useCallback((name: string) => {
    setFavorites((prev) => {
      const filtered = prev.filter((fav) => fav.name.toLowerCase() !== name.toLowerCase());
      console.log('💔 Removed from favorites:', name);
      return filtered;
    });
  }, [setFavorites]);

  const isFavorite = useCallback((name: string) => {
    return favorites.some((fav) => fav.name.toLowerCase() === name.toLowerCase());
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    console.log('🗑️ Cleared all favorites');
  }, [setFavorites]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites
  };
};

export default useFavorites;

