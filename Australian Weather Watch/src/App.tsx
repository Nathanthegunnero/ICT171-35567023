import { useState, useEffect, useCallback } from 'react';
import { CloudSun, RefreshCw } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { CityButtons } from './components/CityButtons';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { ForecastCards } from './components/ForecastCards';
import { AlertBanner } from './components/AlertBanner';
import { geocodeLocation } from './lib/locations';
import { fetchWeather } from './lib/weather-api';
import type { WeatherData } from './lib/weather-api';

const REFRESH_INTERVAL = 30 * 60 * 1000;

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCity, setActiveCity] = useState<string>('');

  const loadWeather = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const location = await geocodeLocation(query);
      if (!location) {
        setError('Location not found. Try a city name or Australian postcode.');
        setIsLoading(false);
        return;
      }

      const data = await fetchWeather(location);
      setWeather(data);
      setActiveCity(location.name);
    } catch {
      setError('Unable to fetch weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeather('Sydney');
  }, [loadWeather]);

  useEffect(() => {
    if (!activeCity) return;
    const interval = setInterval(() => {
      loadWeather(activeCity);
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [activeCity, loadWeather]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="pt-8 pb-4 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <CloudSun size={36} className="text-eucalyptus-400" />
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Aus Weather Watch
            </h1>
          </div>
          <p className="text-navy-300 text-sm">
            Real-time Australian weather forecasts and alerts
          </p>
        </div>
      </header>

      <main className="flex-1 px-4 pb-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="mt-4">
            <SearchBar onSearch={loadWeather} isLoading={isLoading} />
            <CityButtons onSelect={loadWeather} activeCity={activeCity} />
          </div>

          {error && (
            <div className="glass-card p-4 text-center text-red-300 border-red-800/40">
              {error}
            </div>
          )}

          {weather && (
            <>
              <AlertBanner current={weather.current} daily={weather.daily} />

              <CurrentWeatherCard
                weather={weather.current}
                location={weather.location}
                lastUpdated={weather.lastUpdated}
              />

              <ForecastCards forecast={weather.daily} />

              <div className="flex justify-center">
                <button
                  onClick={() => loadWeather(activeCity)}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-navy-300 hover:text-white transition-colors disabled:opacity-40"
                >
                  <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                  Refresh data
                </button>
              </div>
            </>
          )}

          {!weather && !error && isLoading && (
            <div className="glass-card p-12 text-center">
              <div className="animate-pulse text-navy-300">Loading weather data...</div>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-navy-800 py-6 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-2">
          <p className="text-sm text-navy-400">
            Live data from{' '}
            <a
              href="https://www.bom.gov.au"
              target="_blank"
              rel="noopener noreferrer"
              className="text-eucalyptus-400 hover:text-eucalyptus-300 underline underline-offset-2"
            >
              Bureau of Meteorology (BOM)
            </a>
            {' '}and Open-Meteo
          </p>
          <p className="text-xs text-navy-500">
            Made for Cloud Computing Assignment
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
