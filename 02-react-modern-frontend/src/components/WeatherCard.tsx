import type { WeatherData } from '../types';

interface WeatherCardProps {
  weatherData: WeatherData | null;
}

const WeatherCard = ({ weatherData }: WeatherCardProps) => {
  if (!weatherData) {
    return (
      <div className="welcome-message">
        <div className="welcome-icon">🌸☀️🌸</div>
        <h2>Welcome to Your Fabulous Weather Dashboard</h2>
        <p>✨ Search for a city to see the most gorgeous weather conditions ✨</p>
      </div>
    );
  }

  const { name, sys, main, weather, wind } = weatherData;
  const weatherInfo = weather[0];
  const temperature = Math.round(main.temp);
  const feelsLike = Math.round(main.feels_like);
  const weatherIcon = `https://openweathermap.org/img/wn/${weatherInfo.icon}@4x.png`;

  // Get weather emoji based on condition
  const getWeatherEmoji = (weatherMain: string) => {
    const emojiMap: Record<string, string> = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Drizzle: '🌦️',
      Thunderstorm: '⛈️',
      Snow: '❄️',
      Mist: '🌫️',
      Smoke: '💨',
      Haze: '🌫️',
      Dust: '💨',
      Fog: '🌫️',
      Sand: '💨',
      Ash: '🌋',
      Squall: '💨',
      Tornado: '🌪️'
    };
    return emojiMap[weatherMain] || '🌤️';
  };

  return (
    <div className="weather-card">
      {/* City Header */}
      <div className="weather-card-header">
        <h2 className="city-name">
          {name}, {sys.country}
        </h2>
        <div className="weather-emoji">{getWeatherEmoji(weatherInfo.main)}</div>
      </div>

      {/* Main Temperature Display */}
      <div className="temperature-main">
        <div className="temp-display">
          <span className="temp-value">{temperature}</span>
          <span className="temp-unit">°C</span>
        </div>
        <div className="weather-icon-container">
          <img 
            src={weatherIcon} 
            alt={weatherInfo.description}
            className="weather-icon-img"
          />
        </div>
      </div>

      {/* Weather Description */}
      <div className="weather-description">
        <p className="description-text">{weatherInfo.description}</p>
        <p className="feels-like">Feels like {feelsLike}°C</p>
      </div>

      {/* Weather Details Grid */}
      <div className="weather-details">
        <div className="detail-card">
          <div className="detail-icon">💧</div>
          <div className="detail-content">
            <p className="detail-label">Humidity</p>
            <p className="detail-value">{main.humidity}%</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">💨</div>
          <div className="detail-content">
            <p className="detail-label">Wind Speed</p>
            <p className="detail-value">{wind.speed} m/s</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">🌡️</div>
          <div className="detail-content">
            <p className="detail-label">High / Low</p>
            <p className="detail-value">
              {Math.round(main.temp_max)}° / {Math.round(main.temp_min)}°
            </p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">🎈</div>
          <div className="detail-content">
            <p className="detail-label">Pressure</p>
            <p className="detail-value">{main.pressure} hPa</p>
          </div>
        </div>

        <div className="detail-card snow-card">
          <div className="detail-icon">❄️</div>
          <div className="detail-content">
            <p className="detail-label">Snow</p>
            <p className="detail-value">
              {weatherInfo.main === 'Snow' ? 'Yes' : 'No snow'}
            </p>
          </div>
        </div>
      </div>

      {/* Snow Information (if available) */}
      {weatherData.weather[0].main === 'Snow' && (
        <div className="snow-info">
          <div className="snow-icon">❄️</div>
          <p className="snow-text">Snowy conditions detected!</p>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;

