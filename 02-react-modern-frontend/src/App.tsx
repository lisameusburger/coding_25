import { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import { useWeather, useFavorites, useRecentSearches } from './hooks';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom hooks for clean separation of concerns
  const { weatherData, forecastData, loading, error, fetchWeather, retry } = useWeather();
  const { favorites } = useFavorites();
  const { addSearch } = useRecentSearches();

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearchSubmit = async (city: string) => {
    console.log('🔍 Searching for city:', city);
    await fetchWeather(city);
    addSearch(city);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1 className="header-title">💖 Weather Dashboard 💖</h1>
        <p className="header-subtitle">Your fabulous real-time weather companion</p>
      </header>

      {/* Main Content */}
      <div className="main-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-section">
            <h2 className="sidebar-title">Favorite Cities</h2>
            <div className="favorites-list">
              {favorites.length === 0 ? (
                <p className="empty-state">No favorites yet</p>
              ) : (
                favorites.map((city, index) => (
                  <div key={index} className="favorite-item">
                    {city.name}, {city.country}
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>

        {/* Main Weather Section */}
        <main className="main-content">
          {/* Search Bar */}
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
            placeholder="Search for a city (e.g., London, Tokyo, New York)..."
          />

          {/* Weather Display Area */}
          <section className="weather-section">
            {loading ? (
              <Loading />
            ) : error ? (
              <ErrorMessage message={error} onRetry={retry} />
            ) : (
              <>
                <WeatherCard weatherData={weatherData} />
                {weatherData && <Forecast forecastData={forecastData} />}
              </>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
