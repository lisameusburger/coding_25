import { useState } from 'react';
import type { WeatherData, FavoriteCity } from './types';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import { getRandomMockWeather } from './mockData';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);

  // Note: setWeatherData and setFavorites will be used when API integration is added

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearchSubmit = (city: string) => {
    console.log('🔍 Searching for city:', city);
    
    // Get random weather data for this search
    const randomWeather = getRandomMockWeather(city);
    
    setWeatherData(randomWeather);
    console.log('✨ Random weather loaded:', randomWeather.weather[0].main, randomWeather.main.temp + '°C');
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
            placeholder="Search any city - weather changes randomly! ✨"
          />

          {/* Weather Display Area */}
          <section className="weather-section">
            <WeatherCard weatherData={weatherData} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
