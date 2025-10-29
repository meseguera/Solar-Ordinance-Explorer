
import React from 'react';
import { SunIcon } from './icons/SunIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <SunIcon className="w-10 h-10 text-solar-yellow mr-4" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
          Solar Ordinance Explorer
        </h1>
      </div>
    </header>
  );
};
