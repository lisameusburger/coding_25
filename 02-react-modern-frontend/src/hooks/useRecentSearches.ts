import { useCallback } from 'react';
import type { RecentSearch } from '../types';
import useLocalStorage from './useLocalStorage';

interface UseRecentSearchesReturn {
  recentSearches: RecentSearch[];
  addSearch: (city: string) => void;
  clearSearches: () => void;
}

/**
 * Custom hook for managing recent search history
 * Automatically persists to localStorage
 * Keeps only the 5 most recent searches
 * 
 * @returns Object with recent searches array and management functions
 */
const useRecentSearches = (): UseRecentSearchesReturn => {
  const [recentSearches, setRecentSearches] = useLocalStorage<RecentSearch[]>('weather-recent-searches', []);

  const addSearch = useCallback((city: string) => {
    setRecentSearches((prev) => {
      // Remove if already exists (to move to top)
      const filtered = prev.filter((search) => search.city.toLowerCase() !== city.toLowerCase());
      
      // Add to the beginning
      const newSearch: RecentSearch = {
        city,
        searchedAt: Date.now()
      };
      
      // Keep only last 5 searches
      const updated = [newSearch, ...filtered].slice(0, 5);
      
      console.log('🔍 Added to recent searches:', city);
      return updated;
    });
  }, [setRecentSearches]);

  const clearSearches = useCallback(() => {
    setRecentSearches([]);
    console.log('🗑️ Cleared search history');
  }, [setRecentSearches]);

  return {
    recentSearches,
    addSearch,
    clearSearches
  };
};

export default useRecentSearches;

