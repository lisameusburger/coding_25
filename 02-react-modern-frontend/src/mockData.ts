import type { WeatherData } from './types';

// Mock weather data for testing different conditions
export const mockWeatherData: Record<string, WeatherData> = {
  // Sunny weather
  paris: {
    name: 'Paris',
    sys: {
      country: 'FR',
      sunrise: 1698739200,
      sunset: 1698775200
    },
    main: {
      temp: 22,
      feels_like: 20,
      temp_min: 18,
      temp_max: 25,
      pressure: 1013,
      humidity: 65
    },
    weather: [{
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }],
    wind: {
      speed: 3.5,
      deg: 180
    },
    clouds: {
      all: 10
    },
    dt: Date.now() / 1000,
    timezone: 7200
  },

  // Rainy weather
  london: {
    name: 'London',
    sys: {
      country: 'GB',
      sunrise: 1698739200,
      sunset: 1698775200
    },
    main: {
      temp: 12,
      feels_like: 10,
      temp_min: 10,
      temp_max: 14,
      pressure: 1005,
      humidity: 85
    },
    weather: [{
      id: 500,
      main: 'Rain',
      description: 'light rain',
      icon: '10d'
    }],
    wind: {
      speed: 8.2,
      deg: 270
    },
    clouds: {
      all: 90
    },
    dt: Date.now() / 1000,
    timezone: 0
  },

  // Snowy weather
  moscow: {
    name: 'Moscow',
    sys: {
      country: 'RU',
      sunrise: 1698739200,
      sunset: 1698775200
    },
    main: {
      temp: -5,
      feels_like: -10,
      temp_min: -8,
      temp_max: -2,
      pressure: 1020,
      humidity: 75
    },
    weather: [{
      id: 600,
      main: 'Snow',
      description: 'light snow',
      icon: '13d'
    }],
    wind: {
      speed: 5.5,
      deg: 45
    },
    clouds: {
      all: 95
    },
    dt: Date.now() / 1000,
    timezone: 10800
  },

  // Cloudy weather
  tokyo: {
    name: 'Tokyo',
    sys: {
      country: 'JP',
      sunrise: 1698739200,
      sunset: 1698775200
    },
    main: {
      temp: 18,
      feels_like: 17,
      temp_min: 15,
      temp_max: 20,
      pressure: 1010,
      humidity: 70
    },
    weather: [{
      id: 803,
      main: 'Clouds',
      description: 'broken clouds',
      icon: '04d'
    }],
    wind: {
      speed: 4.1,
      deg: 90
    },
    clouds: {
      all: 75
    },
    dt: Date.now() / 1000,
    timezone: 32400
  },

  // Hot weather
  dubai: {
    name: 'Dubai',
    sys: {
      country: 'AE',
      sunrise: 1698739200,
      sunset: 1698775200
    },
    main: {
      temp: 38,
      feels_like: 42,
      temp_min: 35,
      temp_max: 40,
      pressure: 1008,
      humidity: 45
    },
    weather: [{
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }],
    wind: {
      speed: 2.5,
      deg: 315
    },
    clouds: {
      all: 5
    },
    dt: Date.now() / 1000,
    timezone: 14400
  },

  // Thunderstorm
  miami: {
    name: 'Miami',
    sys: {
      country: 'US',
      sunrise: 1698739200,
      sunset: 1698775200
    },
    main: {
      temp: 28,
      feels_like: 32,
      temp_min: 26,
      temp_max: 30,
      pressure: 1012,
      humidity: 88
    },
    weather: [{
      id: 211,
      main: 'Thunderstorm',
      description: 'thunderstorm',
      icon: '11d'
    }],
    wind: {
      speed: 12.5,
      deg: 135
    },
    clouds: {
      all: 85
    },
    dt: Date.now() / 1000,
    timezone: -18000
  },

  // Foggy weather
  'san francisco': {
    name: 'San Francisco',
    sys: {
      country: 'US',
      sunrise: 1698739200,
      sunset: 1698775200
    },
    main: {
      temp: 15,
      feels_like: 14,
      temp_min: 13,
      temp_max: 17,
      pressure: 1015,
      humidity: 80
    },
    weather: [{
      id: 741,
      main: 'Fog',
      description: 'fog',
      icon: '50d'
    }],
    wind: {
      speed: 3.8,
      deg: 225
    },
    clouds: {
      all: 40
    },
    dt: Date.now() / 1000,
    timezone: -28800
  },

  // Partly cloudy
  sydney: {
    name: 'Sydney',
    sys: {
      country: 'AU',
      sunrise: 1698739200,
      sunset: 1698775200
    },
    main: {
      temp: 24,
      feels_like: 23,
      temp_min: 21,
      temp_max: 27,
      pressure: 1018,
      humidity: 60
    },
    weather: [{
      id: 802,
      main: 'Clouds',
      description: 'scattered clouds',
      icon: '03d'
    }],
    wind: {
      speed: 6.7,
      deg: 160
    },
    clouds: {
      all: 40
    },
    dt: Date.now() / 1000,
    timezone: 39600
  },

  // Cold and clear
  reykjavik: {
    name: 'Reykjavik',
    sys: {
      country: 'IS',
      sunrise: 1698739200,
      sunset: 1698775200
    },
    main: {
      temp: 2,
      feels_like: -2,
      temp_min: 0,
      temp_max: 4,
      pressure: 1022,
      humidity: 72
    },
    weather: [{
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }],
    wind: {
      speed: 7.2,
      deg: 30
    },
    clouds: {
      all: 15
    },
    dt: Date.now() / 1000,
    timezone: 0
  },

  // Drizzle
  seattle: {
    name: 'Seattle',
    sys: {
      country: 'US',
      sunrise: 1698739200,
      sunset: 1698775200
    },
    main: {
      temp: 11,
      feels_like: 10,
      temp_min: 9,
      temp_max: 13,
      pressure: 1009,
      humidity: 82
    },
    weather: [{
      id: 300,
      main: 'Drizzle',
      description: 'light intensity drizzle',
      icon: '09d'
    }],
    wind: {
      speed: 4.5,
      deg: 200
    },
    clouds: {
      all: 80
    },
    dt: Date.now() / 1000,
    timezone: -28800
  }
};

// Helper function to get mock data by city name
export const getMockWeather = (cityName: string): WeatherData | null => {
  const normalizedCity = cityName.toLowerCase().trim();
  return mockWeatherData[normalizedCity] || null;
};

// Get a random mock weather data for any city name
export const getRandomMockWeather = (cityName: string): WeatherData => {
  // Get all mock weather data entries
  const allWeatherData = Object.values(mockWeatherData);
  
  // Pick a random one
  const randomWeather = allWeatherData[Math.floor(Math.random() * allWeatherData.length)];
  
  // Clone it and update the city name to match the search
  return {
    ...randomWeather,
    name: cityName.charAt(0).toUpperCase() + cityName.slice(1),
    sys: {
      ...randomWeather.sys,
      country: getRandomCountryCode()
    }
  };
};

// Helper to get random country code
const getRandomCountryCode = (): string => {
  const countries = ['US', 'GB', 'FR', 'DE', 'IT', 'ES', 'JP', 'AU', 'CA', 'BR', 'NL', 'SE', 'NO', 'FI', 'DK'];
  return countries[Math.floor(Math.random() * countries.length)];
};

// List of available mock cities for reference
export const availableMockCities = Object.keys(mockWeatherData).map(key => {
  const data = mockWeatherData[key];
  return `${data.name}, ${data.sys.country}`;
});

