# 🌤️ Mock Data Testing Guide

Your Weather Dashboard now has **10 different mock weather scenarios** for testing! 💖

## 🎯 Available Test Cities

### ☀️ **Paris** - Clear & Sunny
- **Temperature:** 22°C (feels like 20°C)
- **Condition:** Clear sky
- **Humidity:** 65%
- **Wind:** 3.5 m/s
- **Perfect for:** Testing sunny weather display

### 🌧️ **London** - Rainy
- **Temperature:** 12°C (feels like 10°C)
- **Condition:** Light rain
- **Humidity:** 85%
- **Wind:** 8.2 m/s
- **Perfect for:** Testing rain icon and high humidity

### ❄️ **Moscow** - Snowy
- **Temperature:** -5°C (feels like -10°C)
- **Condition:** Light snow
- **Humidity:** 75%
- **Wind:** 5.5 m/s
- **Perfect for:** Testing snow alert banner and negative temps

### ☁️ **Tokyo** - Cloudy
- **Temperature:** 18°C (feels like 17°C)
- **Condition:** Broken clouds
- **Humidity:** 70%
- **Wind:** 4.1 m/s
- **Perfect for:** Testing cloudy weather display

### 🔥 **Dubai** - Hot & Clear
- **Temperature:** 38°C (feels like 42°C)
- **Condition:** Clear sky
- **Humidity:** 45%
- **Wind:** 2.5 m/s
- **Perfect for:** Testing high temperatures

### ⛈️ **Miami** - Thunderstorm
- **Temperature:** 28°C (feels like 32°C)
- **Condition:** Thunderstorm
- **Humidity:** 88%
- **Wind:** 12.5 m/s (strong!)
- **Perfect for:** Testing severe weather and high wind speeds

### 🌫️ **San Francisco** - Foggy
- **Temperature:** 15°C (feels like 14°C)
- **Condition:** Fog
- **Humidity:** 80%
- **Wind:** 3.8 m/s
- **Perfect for:** Testing fog conditions

### 🌤️ **Sydney** - Partly Cloudy
- **Temperature:** 24°C (feels like 23°C)
- **Condition:** Scattered clouds
- **Humidity:** 60%
- **Wind:** 6.7 m/s
- **Perfect for:** Testing partly cloudy weather

### 🥶 **Reykjavik** - Cold & Clear
- **Temperature:** 2°C (feels like -2°C)
- **Condition:** Clear sky
- **Humidity:** 72%
- **Wind:** 7.2 m/s
- **Perfect for:** Testing cold but clear conditions

### 🌦️ **Seattle** - Drizzle
- **Temperature:** 11°C (feels like 10°C)
- **Condition:** Light drizzle
- **Humidity:** 82%
- **Wind:** 4.5 m/s
- **Perfect for:** Testing drizzle/light rain

---

## 🧪 How to Test

### Method 1: Search by City Name
1. Type the city name in the search bar
2. Click search or press Enter
3. Watch the beautiful weather card appear!

**Examples:**
```
paris
London
MOSCOW (case insensitive!)
san francisco
```

### Method 2: Test Any City
- If you type a city not in the mock list, it will show generic clear weather
- Temperature: 20°C
- Condition: Clear sky

---

## 🎨 What to Look For While Testing

### ✅ Temperature Display
- Check if negative temps show correctly (Moscow)
- Check if very high temps display well (Dubai)
- Verify "feels like" temperature

### ✅ Weather Icons & Emojis
- Each condition should have matching emoji
- Weather icon should load from OpenWeatherMap

### ✅ Detail Cards
- All 4 cards should display with hover effects
- Humidity, wind, high/low, pressure

### ✅ Special Features
- **Snow Alert:** Only appears for Moscow (snow condition)
- Should have pulsing animation with ❄️ icon

### ✅ Responsive Design
- Resize browser to test mobile, tablet, desktop
- Temperature should scale appropriately

### ✅ Animations
- Fade in when card appears
- Floating weather emoji
- Detail cards lift on hover
- Snow banner pulses (if snowy)

---

## 🔧 For Developers

### Mock Data Location
```typescript
src/mockData.ts
```

### Key Functions
```typescript
// Get mock weather for a city
const weather = getMockWeather('paris');

// List all available cities
import { availableMockCities } from './mockData';
console.log(availableMockCities);
```

### Adding New Mock Cities
Edit `src/mockData.ts` and add a new entry:
```typescript
mycity: {
  name: 'My City',
  sys: { country: 'XX', sunrise: 0, sunset: 0 },
  main: { temp: 25, feels_like: 24, ... },
  weather: [{ id: 800, main: 'Clear', ... }],
  wind: { speed: 3.0, deg: 180 },
  clouds: { all: 10 },
  dt: Date.now() / 1000,
  timezone: 0
}
```

---

## 💖 Testing Checklist

- [ ] Test all 10 mock cities
- [ ] Check snow alert appears for Moscow
- [ ] Verify temperature display (positive and negative)
- [ ] Test humidity and wind speed display
- [ ] Check high/low temperatures
- [ ] Test responsive design (mobile/tablet/desktop)
- [ ] Verify all animations work
- [ ] Test weather emojis match conditions
- [ ] Check weather icons load correctly
- [ ] Test hover effects on detail cards

---

## 🌈 Barbie Theme Features to Notice

- 💖 Pink gradient backgrounds everywhere
- ✨ Sparkly shadows and glows
- 🎀 Smooth animations and transitions
- 💕 Beautiful hover effects
- 🌸 Emojis and visual delight
- 💜 Purple-to-pink gradient text

---

**Happy Testing! Your weather app is absolutely FABULOUS! 💖✨**

