
import React from 'react';
import type { Ordinance } from '../types';

interface OrdinanceCardProps {
  ordinance: Ordinance;
}

const ExternalLinkIcon: React.FC<{className: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
);


export const OrdinanceCard: React.FC<OrdinanceCardProps> = ({ ordinance }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
      <div className="p-6">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-xl font-bold text-sky-blue dark:text-sky-blue-400">{ordinance.title}</h3>
                <p className="text-md font-semibold text-gray-600 dark:text-gray-400 mb-4">{ordinance.jurisdiction}</p>
            </div>
            {ordinance.source_url && (
                <a
                    href={ordinance.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 ml-4 px-3 py-1 text-sm bg-slate-100 dark:bg-gray-700 text-sky-blue dark:text-sky-blue-300 rounded-full hover:bg-slate-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                    Source <ExternalLinkIcon className="w-4 h-4" />
                </a>
            )}
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4">{ordinance.summary}</p>

        <div>
          <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">Key Points:</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            {ordinance.key_points.map((point, index) => (
              <li key={index} className="pl-2">{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
