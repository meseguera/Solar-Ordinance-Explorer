import React from 'react';

interface SearchBarProps {
  location: string;
  setLocation: (location: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ location, setLocation, onSearch, isLoading }) => {
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 mb-8">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., 'Travis County, Texas'"
        className="w-full px-4 py-3 text-lg bg-white border border-gray-300 rounded-md shadow-sm focus:ring-sky-blue focus:border-sky-blue dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400"
        disabled={isLoading}
      />
      <button
        onClick={onSearch}
        disabled={isLoading}
        className="w-full sm:w-auto px-6 py-3 text-lg font-semibold text-white bg-sky-blue rounded-md shadow-sm hover:bg-sky-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-blue disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          'Search'
        )}
      </button>
    </div>
  );
};