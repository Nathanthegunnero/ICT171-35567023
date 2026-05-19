import { MapPin } from 'lucide-react';
import { MAJOR_CITIES } from '../lib/locations';

interface Props {
  onSelect: (cityName: string) => void;
  activeCity?: string;
}

export function CityButtons({ onSelect, activeCity }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {MAJOR_CITIES.map((city) => (
        <button
          key={city.name}
          onClick={() => onSelect(city.name)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
            activeCity === city.name
              ? 'bg-eucalyptus-600 text-white'
              : 'bg-navy-800/50 text-navy-200 hover:bg-navy-700/60 hover:text-white border border-navy-600/30'
          }`}
        >
          <MapPin size={14} />
          {city.name}
        </button>
      ))}
    </div>
  );
}
