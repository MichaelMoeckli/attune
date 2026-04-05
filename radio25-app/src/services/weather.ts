import type { WeatherData } from '@/lib/types';

const MOCK_WEATHER: WeatherData = {
  location: 'Zürich',
  temperature: 18,
  description: 'Leicht bewölkt',
  humidity: 65,
  windSpeed: 12,
  forecast: 'Heute Nachmittag leicht bewölkt bei 18 Grad. Am Abend klart es auf.',
};

export async function fetchWeather(location: string): Promise<WeatherData> {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  if (!apiKey || apiKey === 'your-openweathermap-api-key-here') {
    console.log('[weather] Using mock data');
    return { ...MOCK_WEATHER, location };
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&lang=de&appid=${apiKey}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`OpenWeatherMap API error: ${res.status}`);
    }

    const data = await res.json();

    return {
      location,
      temperature: Math.round(data.main.temp),
      description: data.weather[0]?.description || 'Keine Beschreibung',
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // m/s to km/h
      forecast: `Aktuell ${data.weather[0]?.description} bei ${Math.round(data.main.temp)} Grad. Luftfeuchtigkeit ${data.main.humidity} Prozent.`,
    };
  } catch (error) {
    console.warn('[weather] API fetch failed, falling back to mock:', error);
    return { ...MOCK_WEATHER, location };
  }
}
