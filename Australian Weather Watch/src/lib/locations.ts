export interface Location {
  name: string;
  state: string;
  lat: number;
  lon: number;
}

export const MAJOR_CITIES: Location[] = [
  { name: 'Sydney', state: 'NSW', lat: -33.8688, lon: 151.2093 },
  { name: 'Melbourne', state: 'VIC', lat: -37.8136, lon: 144.9631 },
  { name: 'Brisbane', state: 'QLD', lat: -27.4698, lon: 153.0251 },
  { name: 'Perth', state: 'WA', lat: -31.9505, lon: 115.8605 },
  { name: 'Adelaide', state: 'SA', lat: -34.9285, lon: 138.6007 },
  { name: 'Darwin', state: 'NT', lat: -12.4634, lon: 130.8456 },
  { name: 'Hobart', state: 'TAS', lat: -42.8821, lon: 147.3272 },
  { name: 'Canberra', state: 'ACT', lat: -35.2809, lon: 149.1300 },
];

export async function geocodeLocation(query: string): Promise<Location | null> {
  const trimmed = query.trim();
  if (!trimmed) return null;

  const cityMatch = MAJOR_CITIES.find(
    (c) => c.name.toLowerCase() === trimmed.toLowerCase()
  );
  if (cityMatch) return cityMatch;

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=5&language=en&format=json`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      const auResult = data.results.find(
        (r: { country_code?: string }) => r.country_code === 'AU'
      );
      const result = auResult || data.results[0];
      return {
        name: result.name,
        state: result.admin1 || '',
        lat: result.latitude,
        lon: result.longitude,
      };
    }
  } catch {
    // fall through
  }

  if (/^\d{4}$/.test(trimmed)) {
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${trimmed}&count=5&language=en&format=json`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const auResult = data.results.find(
          (r: { country_code?: string }) => r.country_code === 'AU'
        );
        if (auResult) {
          return {
            name: auResult.name,
            state: auResult.admin1 || '',
            lat: auResult.latitude,
            lon: auResult.longitude,
          };
        }
      }
    } catch {
      // fall through
    }
  }

  return null;
}
