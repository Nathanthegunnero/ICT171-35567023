import { Droplets, Wind, Thermometer, CloudRain, ShieldAlert } from 'lucide-react';
import type { CurrentWeather } from '../lib/weather-api';
import { getWindDirectionLabel, getUVLevel } from '../lib/weather-api';
import { getWeatherCondition } from '../lib/weather-codes';
import { WeatherIcon } from './WeatherIcon';
import type { Location } from '../lib/locations';

interface Props {
  weather: CurrentWeather;
  location: Location;
  lastUpdated: Date;
}

export function CurrentWeatherCard({ weather, location, lastUpdated }: Props) {
  const condition = getWeatherCondition(weather.weatherCode);
  const uvLevel = getUVLevel(weather.uvIndex);
  const windDir = getWindDirectionLabel(weather.windDirection);

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-navy-200 text-sm mb-1">
            <span>
              {location.name}, {location.state}
            </span>
            <span className="text-navy-400">|</span>
            <span>Updated {lastUpdated.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>

          <div className="flex items-center gap-4 mt-3">
            <WeatherIcon code={weather.weatherCode} size={64} className="text-eucalyptus-400" />
            <div>
              <div className="text-6xl font-bold tracking-tight">
                {Math.round(weather.temperature)}
                <span className="text-3xl text-navy-300">&deg;C</span>
              </div>
              <div className="text-navy-200 mt-1">{condition.label}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 text-navy-300">
            <Thermometer size={16} />
            <span>Feels like {Math.round(weather.feelsLike)}&deg;C</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <StatItem
            icon={<Droplets size={20} className="text-blue-400" />}
            label="Humidity"
            value={`${weather.humidity}%`}
          />
          <StatItem
            icon={<Wind size={20} className="text-navy-200" />}
            label="Wind"
            value={`${Math.round(weather.windSpeed)} km/h ${windDir}`}
          />
          <StatItem
            icon={<ShieldAlert size={20} className={uvLevel.color} />}
            label="UV Index"
            value={`${weather.uvIndex.toFixed(1)} (${uvLevel.label})`}
          />
          <StatItem
            icon={<CloudRain size={20} className="text-blue-300" />}
            label="Rainfall"
            value={`${weather.rainfall} mm`}
          />
        </div>
      </div>
    </div>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <div>
        <div className="text-xs text-navy-400 uppercase tracking-wide">{label}</div>
        <div className="text-sm font-medium text-white mt-0.5">{value}</div>
      </div>
    </div>
  );
}
