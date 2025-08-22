import React from 'react';
import { ListBulletIcon, MapIcon } from '@heroicons/react/24/outline';

const ViewToggle = ({ currentView, onViewChange }) => {
  return (
    <div className="bg-white border border-border rounded-lg p-1 shadow-soft">
      <div className="flex">
        <button
          onClick={() => onViewChange('list')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
            currentView === 'list'
              ? 'bg-primary text-white shadow-soft'
              : 'text-text-secondary hover:text-text hover:bg-gray-50'
          }`}
        >
          <ListBulletIcon className="w-5 h-5" />
          <span className="hidden sm:block">List View</span>
        </button>
        
        <button
          onClick={() => onViewChange('map')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
            currentView === 'map'
              ? 'bg-primary text-white shadow-soft'
              : 'text-text-secondary hover:text-text hover:bg-gray-50'
          }`}
        >
          <MapIcon className="w-5 h-5" />
          <span className="hidden sm:block">Map View</span>
        </button>
      </div>
    </div>
  );
};

export default ViewToggle;

