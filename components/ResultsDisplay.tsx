
import React from 'react';
import type { Ordinance } from '../types';
import { OrdinanceCard } from './OrdinanceCard';
import { LoadingSpinner } from './LoadingSpinner';

interface ResultsDisplayProps {
  ordinances: Ordinance[] | null;
  isLoading: boolean;
  error: string | null;
  infoMessage?: string | null;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ ordinances, isLoading, error, infoMessage }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 rounded-lg" role="alert">
        <h3 className="text-xl font-semibold text-red-800 dark:text-red-300">Request Failed</h3>
        <p className="mt-2 text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (infoMessage) {
    return (
      <div className="text-center p-8 bg-blue-100 dark:bg-blue-900/30 border border-blue-400 dark:border-blue-600 rounded-lg">
        <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300">Search Complete</h3>
        <p className="mt-2 text-blue-600 dark:text-blue-400">{infoMessage}</p>
      </div>
    );
  }

  if (!ordinances) {
     return (
        <div className="text-center p-8 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Ready to Explore</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Enter a location above to find solar farm regulations.</p>
        </div>
     );
  }

  return (
    <div className="space-y-6">
      {ordinances.map((ordinance, index) => (
        <OrdinanceCard key={index} ordinance={ordinance} />
      ))}
    </div>
  );
};