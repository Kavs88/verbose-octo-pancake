import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import BusinessCard from '../components/BusinessCard';
import { useBusinesses } from '../hooks/useBusinesses';

const BusinessDirectory = () => {
  const { businesses, loading, error, searchBusinesses, fetchBusinesses } = useBusinesses();
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [currentView, setCurrentView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');

  // Update filtered businesses when businesses change
  useEffect(() => {
    setFilteredBusinesses(businesses);
  }, [businesses]);

  // Add GROUND TRUTH logging as requested
  useEffect(() => {
    if (businesses.length > 0) {
      console.log('GROUND TRUTH:', JSON.stringify(businesses, null, 2));
    }
  }, [businesses]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      fetchBusinesses();
    } else {
      // Filter locally for better performance - handle both flat and nested structures
      const filtered = businesses.filter(business => {
        const name = business.name || business.attributes?.name || '';
        const category = business.category || business.attributes?.category || '';
        const neighborhood = business.neighborhood || business.attributes?.neighborhood || '';
        
        return name.toLowerCase().includes(term.toLowerCase()) ||
               category.toLowerCase().includes(term.toLowerCase()) ||
               neighborhood.toLowerCase().includes(term.toLowerCase());
      });
      setFilteredBusinesses(filtered);
    }
  };

  const handleFiltersClick = () => {
    // TODO: Implement filters modal
    console.log('Filters clicked');
  };

  const handleToggleFavorite = (businessId, isFavorite) => {
    // TODO: Update Strapi API to toggle favorite
    console.log(`Business ${businessId} ${isFavorite ? 'favorited' : 'unfavorited'}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-text-secondary">Loading businesses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-poppins font-bold text-primary mb-4">
          Discover Amazing Places
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          Explore the best businesses, restaurants, and experiences in Da Nang & Hoi An with exclusive member benefits.
        </p>
      </div>

      {/* Search and Controls */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-2xl">
            <SearchBar onSearch={handleSearch} onFiltersClick={handleFiltersClick} />
          </div>
          <ViewToggle currentView={currentView} onViewChange={setCurrentView} />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-text-secondary">
          {filteredBusinesses.length} business{filteredBusinesses.length !== 1 ? 'es' : ''} found
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </div>

      {/* Business Listings */}
      {currentView === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map(business => (
            <BusinessCard
              key={business.id}
              business={business}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-100 rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="text-xl font-semibold text-text mb-2">Map View</h3>
          <p className="text-text-secondary">
            Interactive map view coming soon! Switch to list view to see all businesses.
          </p>
        </div>
      )}

      {/* No Results */}
      {filteredBusinesses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-text mb-2">No businesses found</h3>
          <p className="text-text-secondary mb-4">
            Try adjusting your search terms or filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              fetchBusinesses();
            }}
            className="btn-secondary"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default BusinessDirectory;

