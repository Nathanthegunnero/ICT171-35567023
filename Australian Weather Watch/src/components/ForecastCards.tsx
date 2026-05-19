import { Droplets } from 'lucide-react';
import type { DailyForecast } from '../lib/weather-api';
import { getWeatherCondition } from '../lib/weather-codes';
import { WeatherIcon } from './WeatherIcon';

interface Props {
  forecast: DailyForecast[];
}

export function ForecastCards({ forecast }: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-4">7-Day Forecast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {forecast.map((day, i) => (
          <DayCard key={day.date} day={day} isToday={i === 0} />
        ))}
      </div>
    </div>
  );
}

function DayCard({ day, isToday }: { day: DailyForecast; isToday: boolean }) {
  const condition = getWeatherCondition(day.weatherCode);
  const date = new Date(day.date);
  const dayLabel = isToday
    ? 'Today'
    : date.toLocaleDateString('en-AU', { weekday: 'short' });

  return (
    <div className="glass-card p-4 flex flex-col items-center text-center hover:bg-navy-700/40 transition-colors">
      <div className="text-sm font-medium text-navy-200 mb-2">{dayLabel}</div>
      <WeatherIcon code={day.weatherCode} size={32} className="text-eucalyptus-400 mb-2" />
      <div className="text-xs text-navy-400 mb-2">{condition.label}</div>
      <div className="flex items-center gap-1 text-sm">
        <span className="font-semibold text-white">{Math.round(day.tempMax)}&deg;</span>
        <span className="text-navy-400">/</span>
        <span className="text-navy-300">{Math.round(day.tempMin)}&deg;</span>
      </div>
      <div className="flex items-center gap-1 mt-2 text-xs text-blue-300">
        <Droplets size={12} />
        <span>{day.precipProbability}%</span>
      </div>
    </div>
  );
}
