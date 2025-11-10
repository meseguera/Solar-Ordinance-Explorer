
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { ResultsDisplay } from './components/ResultsDisplay';
import { fetchSolarOrdinances } from './services/geminiService';
import type { Ordinance } from './types';

const App: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [ordinances, setOrdinances] = useState<Ordinance[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!location.trim()) {
      setError('Please enter a location to search.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setInfoMessage(null);
    setOrdinances(null);

    try {
      const results = await fetchSolarOrdinances(location);
      if (results && results.length > 0) {
        setOrdinances(results);
      } else {
        setInfoMessage('No specific ordinances found for this location. This could mean the area uses general zoning laws, or specific solar regulations may not be readily available online. Try a broader search (e.g., county or state).');
      }
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-400">
            Enter a city, county, or state to discover local regulations for solar farm development.
          </p>
          <SearchBar
            location={location}
            setLocation={setLocation}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
          <ResultsDisplay
            ordinances={ordinances}
            isLoading={isLoading}
            error={error}
            infoMessage={infoMessage}
          />
        </div>
      </main>
      <footer className="text-center py-4 text-sm text-gray-500">
        <p>Powered by Google's Gemini API. Information may be summarized and should be verified with official sources.</p>
      </footer>
    </div>
  );
};

export default App;