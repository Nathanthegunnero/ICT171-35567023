export interface WeatherCondition {
  label: string;
  icon: string;
}

export const WMO_CODES: Record<number, WeatherCondition> = {
  0: { label: 'Clear sky', icon: 'Sun' },
  1: { label: 'Mainly clear', icon: 'Sun' },
  2: { label: 'Partly cloudy', icon: 'CloudSun' },
  3: { label: 'Overcast', icon: 'Cloud' },
  45: { label: 'Fog', icon: 'CloudFog' },
  48: { label: 'Depositing rime fog', icon: 'CloudFog' },
  51: { label: 'Light drizzle', icon: 'CloudDrizzle' },
  53: { label: 'Moderate drizzle', icon: 'CloudDrizzle' },
  55: { label: 'Dense drizzle', icon: 'CloudDrizzle' },
  56: { label: 'Freezing drizzle', icon: 'CloudDrizzle' },
  57: { label: 'Dense freezing drizzle', icon: 'CloudDrizzle' },
  61: { label: 'Slight rain', icon: 'CloudRain' },
  63: { label: 'Moderate rain', icon: 'CloudRain' },
  65: { label: 'Heavy rain', icon: 'CloudRainWind' },
  66: { label: 'Freezing rain', icon: 'CloudRain' },
  67: { label: 'Heavy freezing rain', icon: 'CloudRainWind' },
  71: { label: 'Slight snow', icon: 'Snowflake' },
  73: { label: 'Moderate snow', icon: 'Snowflake' },
  75: { label: 'Heavy snow', icon: 'Snowflake' },
  77: { label: 'Snow grains', icon: 'Snowflake' },
  80: { label: 'Slight showers', icon: 'CloudRain' },
  81: { label: 'Moderate showers', icon: 'CloudRain' },
  82: { label: 'Violent showers', icon: 'CloudRainWind' },
  85: { label: 'Slight snow showers', icon: 'Snowflake' },
  86: { label: 'Heavy snow showers', icon: 'Snowflake' },
  95: { label: 'Thunderstorm', icon: 'CloudLightning' },
  96: { label: 'Thunderstorm with hail', icon: 'CloudLightning' },
  99: { label: 'Thunderstorm with heavy hail', icon: 'CloudLightning' },
};

export function getWeatherCondition(code: number): WeatherCondition {
  return WMO_CODES[code] ?? { label: 'Unknown', icon: 'Cloud' };
}
