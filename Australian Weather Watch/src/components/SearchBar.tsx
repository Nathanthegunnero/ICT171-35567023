import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface Props {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: Props) {
  const [query, setQuery] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city, suburb or postcode..."
          className="w-full px-6 py-4 pl-14 text-lg bg-navy-800/70 border border-navy-600/40 rounded-2xl text-white placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-eucalyptus-500/50 focus:border-eucalyptus-500/50 transition-all"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-300">
          {isLoading ? (
            <Loader2 size={24} className="animate-spin" />
          ) : (
            <Search size={24} />
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-2 bg-eucalyptus-600 hover:bg-eucalyptus-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
