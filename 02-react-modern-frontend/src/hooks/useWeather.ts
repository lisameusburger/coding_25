import { useState } from 'react';
import type { WeatherData, ForecastData } from '../types';

interface UseWeatherReturn {
  weatherData: WeatherData | null;
  forecastData: ForecastData | null;
  loading: boolean;
  error: string;
  fetchWeather: (city: string) => Promise<void>;
  retry: () => void;
  clearError: () => void;
}

/**
 * Custom hook for fetching weather data from OpenWeatherMap API
 * Handles loading states, errors, and retry logic
 * 
 * @returns Object with weather data, loading state, error, and fetch functions
 */
const useWeather = (): UseWeatherReturn => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastSearchedCity, setLastSearchedCity] = useState('');

  const fetchWeather = async (city: string) => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    
    if (!API_KEY) {
      setError('🔑 API key is missing! Please add VITE_WEATHER_API_KEY to your .env file.');
      return;
    }

    // Additional validation
    if (!city || !city.trim()) {
      setError('Please enter a city name to search.');
      return;
    }

    setLoading(true);
    setError('');
    setLastSearchedCity(city);

    try {
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);

      if (!weatherResponse.ok) {
        if (weatherResponse.status === 404) {
          throw new Error(`🌍 City "${city}" not found. Please check the spelling and try again.`);
        } else if (weatherResponse.status === 401) {
          throw new Error('🔐 Invalid API key. Please check your .env file and restart the app.');
        } else if (weatherResponse.status === 429) {
          throw new Error('⏱️ Too many requests. Please wait a moment and try again.');
        } else if (weatherResponse.status >= 500) {
          throw new Error('🔧 Weather service is temporarily unavailable. Please try again later.');
        } else {
          throw new Error(`❌ Failed to fetch weather data (Error ${weatherResponse.status}). Please try again.`);
        }
      }

      const weatherData: WeatherData = await weatherResponse.json();

      // Fetch 6-day forecast with error handling
      let forecastData: ForecastData | null = null;
      try {
        const forecastController = new AbortController();
        const forecastTimeoutId = setTimeout(() => forecastController.abort(), 10000);

        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
          { signal: forecastController.signal }
        );

        clearTimeout(forecastTimeoutId);

        if (forecastResponse.ok) {
          forecastData = await forecastResponse.json();
          console.log('✅ Forecast data loaded successfully');
        } else {
          console.warn('⚠️ Forecast data unavailable, but current weather loaded');
        }
      } catch (forecastErr) {
        // Don't fail the whole request if forecast fails
        console.warn('⚠️ Could not load forecast data:', forecastErr);
      }

      setWeatherData(weatherData);
      setForecastData(forecastData);
      setError('');
      console.log('✅ Weather data loaded successfully:', weatherData.name, weatherData.main.temp + '°C');
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('⏱️ Request timed out. Please check your internet connection and try again.');
        } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          setError('📡 Network error. Please check your internet connection and try again.');
        } else {
          setError(err.message);
        }
        console.error('❌ Error fetching weather:', err.message);
      } else {
        setError('❌ An unexpected error occurred. Please try again.');
        console.error('❌ Unexpected error:', err);
      }
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const retry = () => {
    if (lastSearchedCity) {
      fetchWeather(lastSearchedCity);
    }
  };

  const clearError = () => {
    setError('');
  };

  return {
    weatherData,
    forecastData,
    loading,
    error,
    fetchWeather,
    retry,
    clearError
  };
};

export default useWeather;

