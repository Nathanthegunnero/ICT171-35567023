import type { Location } from './locations';

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  weatherCode: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  uvIndex: number;
  rainfall: number;
}

export interface DailyForecast {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipProbability: number;
  windSpeedMax: number;
  uvIndexMax: number;
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
  location: Location;
  lastUpdated: Date;
}

export async function fetchWeather(location: Location): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: location.lat.toString(),
    longitude: location.lon.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m',
      'uv_index',
      'precipitation',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_probability_max',
      'wind_speed_10m_max',
      'uv_index_max',
    ].join(','),
    timezone: 'Australia/Sydney',
    forecast_days: '7',
  });

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!res.ok) throw new Error('Failed to fetch weather data');
  const data = await res.json();

  const current: CurrentWeather = {
    temperature: data.current.temperature_2m,
    feelsLike: data.current.apparent_temperature,
    weatherCode: data.current.weather_code,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    windDirection: data.current.wind_direction_10m,
    uvIndex: data.current.uv_index,
    rainfall: data.current.precipitation,
  };

  const daily: DailyForecast[] = data.daily.time.map((date: string, i: number) => ({
    date,
    weatherCode: data.daily.weather_code[i],
    tempMax: data.daily.temperature_2m_max[i],
    tempMin: data.daily.temperature_2m_min[i],
    precipProbability: data.daily.precipitation_probability_max[i],
    windSpeedMax: data.daily.wind_speed_10m_max[i],
    uvIndexMax: data.daily.uv_index_max[i],
  }));

  return {
    current,
    daily,
    location,
    lastUpdated: new Date(),
  };
}

export function getWindDirectionLabel(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

export function getUVLevel(uv: number): { label: string; color: string } {
  if (uv <= 2) return { label: 'Low', color: 'text-eucalyptus-400' };
  if (uv <= 5) return { label: 'Moderate', color: 'text-yellow-400' };
  if (uv <= 7) return { label: 'High', color: 'text-orange-400' };
  if (uv <= 10) return { label: 'Very High', color: 'text-red-400' };
  return { label: 'Extreme', color: 'text-red-600' };
}
