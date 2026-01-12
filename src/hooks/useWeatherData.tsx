// Custom hook to fetch weather data
import { useState, useEffect } from 'react';

export const useWeatherData = (latitude: number = 52.52, longitude: number = 13.41) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        // Use mock data as fallback
        const mockData = {
          current: {
            temperature_2m: 26,
            relative_humidity_2m: 46,
            apparent_temperature: 18,
            precipitation: 0,
            weather_code: 0,
            wind_speed_10m: 14
          },
          hourly: {
            time: Array.from({length: 24}, (_, i) => {
              const date = new Date();
              date.setHours(i);
              return date.toISOString();
            }),
            temperature_2m: [26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 18, 20, 22, 24, 26, 27, 28, 27, 26, 24, 22, 20, 19, 18],
            weather_code: [0, 1, 1, 2, 2, 3, 3, 51, 61, 61, 3, 2, 1, 0, 0, 1, 2, 2, 3, 61, 61, 3, 2, 1]
          },
          daily: {
            time: Array.from({length: 7}, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() + i);
              return date.toISOString().split('T')[0];
            }),
            temperature_2m_max: [26, 27, 24, 25, 21, 25, 24],
            temperature_2m_min: [18, 19, 14, 13, 15, 16, 15],
            weather_code: [61, 61, 0, 1, 61, 61, 3]
          }
        };
        setWeatherData(mockData);
        setError('Using demo data - API temporarily unavailable');
        setLoading(false);
      }
    };

    fetchWeather();
  }, [latitude, longitude]); // Re-fetch when coordinates change

  return { weatherData, loading, error };
};