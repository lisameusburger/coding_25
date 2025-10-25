import { useState } from 'react';
import type { WeatherData, FavoriteCity } from './types';
import SearchBar from './components/SearchBar';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);

  // Note: setWeatherData and setFavorites will be used when API integration is added

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearchSubmit = (city: string) => {
    // Weather search will be implemented later
    console.log('Searching for city:', city);
    // Future: fetch weather data for the city
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
            placeholder="Search for a city... (e.g., London, Tokyo, New York)"
          />

          {/* Weather Display Area */}
          <section className="weather-section">
            {!weatherData ? (
              <div className="welcome-message">
                <div className="welcome-icon">🌸☀️🌸</div>
                <h2>Welcome to Your Fabulous Weather Dashboard</h2>
                <p>✨ Search for a city to see the most gorgeous weather conditions ✨</p>
              </div>
            ) : (
              <div className="weather-display">
                {/* Weather data will be displayed here */}
                <p>Weather data for {weatherData.name} will appear here</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
