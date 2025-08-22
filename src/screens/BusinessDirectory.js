import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import BusinessCard from '../components/BusinessCard';

const BusinessDirectory = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [currentView, setCurrentView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock data - in real app this would come from Strapi API
  useEffect(() => {
    const mockBusinesses = [
      {
        id: 1,
        name: "The Coffee House",
        category: "Café",
        neighborhood: "An Thuong",
        rating: 4.5,
        reviewCount: 128,
        hasMemberDeal: true,
        dealHighlight: "20% off all drinks for members",
        coverPhoto: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        name: "Pho 24",
        category: "Restaurant",
        neighborhood: "My Khe",
        rating: 4.2,
        reviewCount: 89,
        hasMemberDeal: false,
        coverPhoto: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop"
      },
      {
        id: 3,
        name: "Beach Yoga Studio",
        category: "Wellness",
        neighborhood: "Non Nuoc",
        rating: 4.8,
        reviewCount: 67,
        hasMemberDeal: true,
        dealHighlight: "Free class for new members",
        coverPhoto: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
      },
      {
        id: 4,
        name: "Digital Nomad Hub",
        category: "Co-working",
        neighborhood: "Hai Chau",
        rating: 4.6,
        reviewCount: 45,
        hasMemberDeal: true,
        dealHighlight: "50% off first month",
        coverPhoto: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop"
      },
      {
        id: 5,
        name: "Local Market Tours",
        category: "Experience",
        neighborhood: "Han Market",
        rating: 4.7,
        reviewCount: 156,
        hasMemberDeal: true,
        dealHighlight: "Group discount for 3+ people",
        coverPhoto: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
      }
    ];

    setBusinesses(mockBusinesses);
    setFilteredBusinesses(mockBusinesses);
    setLoading(false);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredBusinesses(businesses);
    } else {
      const filtered = businesses.filter(business =>
        business.name.toLowerCase().includes(term.toLowerCase()) ||
        business.category.toLowerCase().includes(term.toLowerCase()) ||
        business.neighborhood.toLowerCase().includes(term.toLowerCase())
      );
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
              setFilteredBusinesses(businesses);
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

