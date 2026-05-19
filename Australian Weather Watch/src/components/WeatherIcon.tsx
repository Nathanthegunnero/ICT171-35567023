import type { LucideIcon } from 'lucide-react';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudLightning,
  Snowflake,
} from 'lucide-react';
import { getWeatherCondition } from '../lib/weather-codes';

const iconMap: Record<string, LucideIcon> = {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudLightning,
  Snowflake,
};

interface Props {
  code: number;
  size?: number;
  className?: string;
}

export function WeatherIcon({ code, size = 48, className = '' }: Props) {
  const condition = getWeatherCondition(code);
  const IconComponent = iconMap[condition.icon] || Cloud;
  return <IconComponent size={size} className={className} />;
}
