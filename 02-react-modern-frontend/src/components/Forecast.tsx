import type { ForecastData } from '../types';

interface ForecastProps {
  forecastData: ForecastData | null;
}

const Forecast = ({ forecastData }: ForecastProps) => {
  if (!forecastData) {
    return null;
  }

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

  // Get day name from timestamp
  const getDayName = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Process forecast data to get one entry per day (at noon)
  const getDailyForecasts = () => {
    const dailyData: Array<{
      date: string;
      day: string;
      temp_max: number;
      temp_min: number;
      weather: { main: string; description: string; icon: string };
    }> = [];

    // Group by date
    const groupedByDate: Record<string, typeof forecastData.list> = {};
    
    forecastData.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      groupedByDate[date].push(item);
    });

    // Get first 5 days
    const dates = Object.keys(groupedByDate).slice(0, 5);
    
    dates.forEach((date) => {
      const dayItems = groupedByDate[date];
      
      // Find the noon entry (12:00) or closest to it
      let noonEntry = dayItems.find(item => {
        const hour = new Date(item.dt * 1000).getHours();
        return hour === 12;
      });
      
      // If no noon entry, use the first entry of the day
      if (!noonEntry) {
        noonEntry = dayItems[0];
      }

      // Calculate max and min temps for the day
      const temps = dayItems.map(item => item.main.temp);
      const temp_max = Math.round(Math.max(...temps));
      const temp_min = Math.round(Math.min(...temps));

      dailyData.push({
        date,
        day: getDayName(noonEntry.dt),
        temp_max,
        temp_min,
        weather: noonEntry.weather[0]
      });
    });

    return dailyData;
  };

  const dailyForecasts = getDailyForecasts();

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-scroll-wrapper">
        <div className="forecast-cards">
          {dailyForecasts.map((day, index) => (
            <div key={index} className="forecast-card">
              <div className="forecast-day">{day.day}</div>
              <div className="forecast-emoji">
                {getWeatherEmoji(day.weather.main)}
              </div>
              <div className="forecast-icon-container">
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                  alt={day.weather.description}
                  className="forecast-icon"
                />
              </div>
              <div className="forecast-temps">
                <span className="forecast-temp-high">{day.temp_max}°</span>
                <span className="forecast-temp-divider">/</span>
                <span className="forecast-temp-low">{day.temp_min}°</span>
              </div>
              <div className="forecast-condition">
                {day.weather.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forecast;

