import { AlertTriangle } from 'lucide-react';
import type { CurrentWeather, DailyForecast } from '../lib/weather-api';

interface Props {
  current: CurrentWeather;
  daily: DailyForecast[];
}

interface Alert {
  type: 'warning' | 'danger';
  message: string;
}

function generateAlerts(current: CurrentWeather, daily: DailyForecast[]): Alert[] {
  const alerts: Alert[] = [];

  if (current.uvIndex >= 11) {
    alerts.push({ type: 'danger', message: 'Extreme UV levels - avoid sun exposure' });
  } else if (current.uvIndex >= 8) {
    alerts.push({ type: 'warning', message: 'Very high UV - sun protection essential' });
  }

  if (current.temperature >= 40) {
    alerts.push({ type: 'danger', message: 'Extreme heat warning - stay hydrated and cool' });
  } else if (current.temperature >= 36) {
    alerts.push({ type: 'warning', message: 'Severe heat - take precautions outdoors' });
  }

  if (current.windSpeed >= 80) {
    alerts.push({ type: 'danger', message: 'Destructive wind warning in effect' });
  } else if (current.windSpeed >= 60) {
    alerts.push({ type: 'warning', message: 'Strong wind warning - secure loose objects' });
  }

  const todayForecast = daily[0];
  if (todayForecast && todayForecast.precipProbability >= 80) {
    alerts.push({ type: 'warning', message: 'High chance of rain today - carry an umbrella' });
  }

  if (current.weatherCode >= 95) {
    alerts.push({ type: 'danger', message: 'Thunderstorm warning - seek shelter' });
  }

  return alerts;
}

export function AlertBanner({ current, daily }: Props) {
  const alerts = generateAlerts(current, daily);
  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2">
      {alerts.map((alert, i) => (
        <div
          key={i}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
            alert.type === 'danger'
              ? 'bg-red-900/40 border border-red-700/50 text-red-200'
              : 'bg-orange-900/40 border border-orange-700/50 text-orange-200'
          }`}
        >
          <AlertTriangle
            size={20}
            className={alert.type === 'danger' ? 'text-red-400' : 'text-orange-400'}
          />
          <span className="text-sm font-medium">{alert.message}</span>
        </div>
      ))}
    </div>
  );
}
