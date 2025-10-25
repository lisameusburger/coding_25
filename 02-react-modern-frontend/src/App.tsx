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
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { addSearch } = useRecentSearches();

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearchSubmit = async (city: string) => {
    console.log('🔍 Searching for city:', city);
    await fetchWeather(city);
    addSearch(city);
  };

  const handleToggleFavorite = () => {
    if (weatherData) {
      if (isFavorite(weatherData.name)) {
        removeFavorite(weatherData.name);
      } else {
        addFavorite(weatherData.name, weatherData.sys.country);
      }
    }
  };

  const handleFavoriteClick = (cityName: string) => {
    setSearchQuery(cityName);
    fetchWeather(cityName);
    addSearch(cityName);
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
                  <button
                    key={index}
                    className="favorite-item"
                    onClick={() => handleFavoriteClick(city.name)}
                  >
                    <span className="favorite-icon">💖</span>
                    <span className="favorite-name">
                      {city.name}, {city.country}
                    </span>
                  </button>
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
                <WeatherCard 
                  weatherData={weatherData}
                  isFavorite={weatherData ? isFavorite(weatherData.name) : false}
                  onToggleFavorite={handleToggleFavorite}
                />
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
