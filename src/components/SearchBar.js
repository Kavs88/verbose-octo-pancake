import React, { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

const SearchBar = ({ onSearch, onFiltersClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            placeholder="Search businesses, restaurants, cafes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-20 py-4 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 shadow-soft"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Search
          </button>
        </div>
      </form>
      
      {/* Filters Button */}
      <button
        onClick={onFiltersClick}
        className="mt-4 flex items-center space-x-2 text-text-secondary hover:text-text transition-colors duration-200"
      >
        <FunnelIcon className="w-5 h-5" />
        <span className="font-medium">Filters</span>
      </button>
    </div>
  );
};

export default SearchBar;

