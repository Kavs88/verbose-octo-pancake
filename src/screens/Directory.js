import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, MapPinIcon, StarIcon, EyeIcon, MapIcon } from '@heroicons/react/24/outline';
import BusinessCard from '../components/BusinessCard';

const Directory = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    hasMemberDeal: false,
    amenities: [],
    openNow: false
  });
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [hoveredBusiness, setHoveredBusiness] = useState(null);

  // Mock data - in real app this would come from Strapi API
  useEffect(() => {
    const mockBusinesses = [
      {
        id: 1,
        name: "The Coffee House",
        category: "Café",
        neighborhood: "An Thuong",
        coverPhoto: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
        rating: 4.8,
        reviewCount: 127,
        hasMemberDeal: true,
        dealHighlight: "20% off all beverages",
        isFavorite: false,
        isOpen: true,
        amenities: ["WiFi", "Outdoor Seating", "Vegan Options"],
        reviews: [
          { id: 1, rating: 5, comment: "Amazing coffee and atmosphere!", author: "Sarah M.", date: "2024-01-10" },
          { id: 2, rating: 4, comment: "Great place to work remotely", author: "Mike R.", date: "2024-01-08" },
          { id: 3, rating: 5, comment: "Best latte in Da Nang!", author: "Emma L.", date: "2024-01-05" }
        ]
      },
      {
        id: 2,
        name: "Beach Yoga Studio",
        category: "Wellness",
        neighborhood: "Non Nuoc",
        coverPhoto: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
        rating: 4.9,
        reviewCount: 89,
        hasMemberDeal: true,
        dealHighlight: "Free first session",
        isFavorite: true,
        isOpen: true,
        amenities: ["Mats Provided", "Beachfront", "All Levels Welcome"],
        reviews: [
          { id: 4, rating: 5, comment: "Incredible sunset yoga experience", author: "David K.", date: "2024-01-12" },
          { id: 5, rating: 5, comment: "Professional instructors, beautiful location", author: "Lisa P.", date: "2024-01-09" }
        ]
      },
      {
        id: 3,
        name: "Digital Nomad Hub",
        category: "Co-working",
        neighborhood: "Hai Chau",
        coverPhoto: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
        rating: 4.6,
        reviewCount: 203,
        hasMemberDeal: false,
        dealHighlight: null,
        isFavorite: false,
        isOpen: true,
        amenities: ["High-Speed WiFi", "Meeting Rooms", "Coffee Bar", "24/7 Access"],
        reviews: [
          { id: 6, rating: 4, comment: "Great workspace with good amenities", author: "Alex T.", date: "2024-01-11" },
          { id: 7, rating: 5, comment: "Perfect for remote work", author: "Jenny W.", date: "2024-01-07" }
        ]
      },
      {
        id: 4,
        name: "Local Market Tours",
        category: "Experience",
        neighborhood: "Han Market",
        coverPhoto: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        rating: 4.9,
        reviewCount: 178,
        hasMemberDeal: true,
        dealHighlight: "50% off for members",
        isFavorite: true,
        isOpen: true,
        amenities: ["Guided Tours", "Local Guide", "Market Access"],
        reviews: [
          { id: 8, rating: 5, comment: "Authentic local experience", author: "Tom B.", date: "2024-01-13" },
          { id: 9, rating: 5, comment: "Learned so much about Vietnamese culture", author: "Maria S.", date: "2024-01-06" }
        ]
      },
      {
        id: 5,
        name: "Artisan Bakery",
        category: "Bakery",
        neighborhood: "Hai Chau",
        coverPhoto: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
        rating: 4.7,
        reviewCount: 156,
        hasMemberDeal: true,
        dealHighlight: "Buy 2, Get 1 Free",
        isFavorite: false,
        isOpen: false,
        amenities: ["Fresh Bread", "Pastries", "Coffee"],
        reviews: [
          { id: 10, rating: 4, comment: "Delicious pastries", author: "Chris L.", date: "2024-01-10" },
          { id: 11, rating: 5, comment: "Best croissants in the city!", author: "Anna K.", date: "2024-01-04" }
        ]
      }
    ];

    setBusinesses(mockBusinesses);
    setFilteredBusinesses(mockBusinesses);
    setLoading(false);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = businesses;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (activeFilters.category.length > 0) {
      filtered = filtered.filter(business =>
        activeFilters.category.includes(business.category)
      );
    }

    // Member deal filter
    if (activeFilters.hasMemberDeal) {
      filtered = filtered.filter(business => business.hasMemberDeal);
    }

    // Amenities filter
    if (activeFilters.amenities.length > 0) {
      filtered = filtered.filter(business =>
        activeFilters.amenities.some(amenity =>
          business.amenities.includes(amenity)
        )
      );
    }

    // Open now filter
    if (activeFilters.openNow) {
      filtered = filtered.filter(business => business.isOpen);
    }

    setFilteredBusinesses(filtered);
  }, [businesses, searchTerm, activeFilters]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryFilter = (category) => {
    setActiveFilters(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category]
    }));
  };

  const handleAmenityFilter = (amenity) => {
    setActiveFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleToggleFavorite = (businessId, isFavorite) => {
    setBusinesses(prev => prev.map(business =>
      business.id === businessId
        ? { ...business, isFavorite: !business.isFavorite }
        : business
    ));
    // TODO: Update Strapi API
  };

  const clearAllFilters = () => {
    setActiveFilters({
      category: [],
      hasMemberDeal: false,
      amenities: [],
      openNow: false
    });
    setSearchTerm('');
  };

  const categories = ["Café", "Restaurant", "Wellness", "Co-working", "Experience", "Bakery", "Shopping", "Entertainment"];
  const amenities = ["WiFi", "Outdoor Seating", "Parking", "Vegan Options", "24/7 Access", "Meeting Rooms", "Beachfront", "Guided Tours"];

  if (loading) {
    return (
      <div className="min-h-screen bg-background-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text-secondary">Loading businesses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text mb-4">Business Directory</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Discover the best businesses in Da Nang & Hoi An, from cozy cafés to exciting experiences
          </p>
        </div>

        {/* Search and View Toggle */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search businesses..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-border rounded-default focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 shadow-sm"
                />
              </div>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center space-x-4">
              <div className="bg-white border border-border rounded-default p-1 shadow-sm">
                <div className="flex">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-default font-medium transition-all duration-200 ${
                      viewMode === 'list'
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-text-secondary hover:text-text hover:bg-gray-50'
                    }`}
                  >
                    <EyeIcon className="w-5 h-5" />
                    <span>List View</span>
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-default font-medium transition-all duration-200 ${
                      viewMode === 'map'
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-text-secondary hover:text-text hover:bg-gray-50'
                    }`}
                  >
                    <MapIcon className="w-5 h-5" />
                    <span>Map View</span>
                  </button>
                </div>
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-text-secondary hover:text-text transition-colors duration-200"
              >
                <FunnelIcon className="w-5 h-5" />
                <span className="font-medium">Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="card p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text">Filters</h3>
              <button
                onClick={clearAllFilters}
                className="text-sm text-primary hover:text-primary-dark transition-colors duration-200"
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div>
                <h4 className="font-medium text-text mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={activeFilters.category.includes(category)}
                        onChange={() => handleCategoryFilter(category)}
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-text-secondary">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Member Deal Filter */}
              <div>
                <h4 className="font-medium text-text mb-3">Member Benefits</h4>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={activeFilters.hasMemberDeal}
                    onChange={(e) => setActiveFilters(prev => ({ ...prev, hasMemberDeal: e.target.checked }))}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-secondary">Has Member Deal</span>
                </label>
              </div>

              {/* Amenities Filter */}
              <div>
                <h4 className="font-medium text-text mb-3">Amenities</h4>
                <div className="space-y-2">
                  {amenities.map((amenity) => (
                    <label key={amenity} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={activeFilters.amenities.includes(amenity)}
                        onChange={() => handleAmenityFilter(amenity)}
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-text-secondary">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Open Now Filter */}
              <div>
                <h4 className="font-medium text-text mb-3">Availability</h4>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={activeFilters.openNow}
                    onChange={(e) => setActiveFilters(prev => ({ ...prev, openNow: e.target.checked }))}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-secondary">Open Now</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-text-secondary">
            {filteredBusinesses.length} business{filteredBusinesses.length !== 1 ? 'es' : ''} found
            {searchTerm && ` for "${searchTerm}"`}
            {Object.values(activeFilters).some(filter => 
              Array.isArray(filter) ? filter.length > 0 : filter
            ) && ' with applied filters'}
          </p>
        </div>

        {/* Content */}
        {viewMode === 'map' ? (
          <div className="card p-6">
            <div className="text-center py-12">
              <MapIcon className="w-16 h-16 text-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text mb-2">Map View Coming Soon</h3>
              <p className="text-text-secondary mb-4">
                Interactive map with business locations and real-time filtering
              </p>
              <button
                onClick={() => setViewMode('list')}
                className="btn-primary"
              >
                Switch to List View
              </button>
            </div>
          </div>
        ) : (
          <>
            {filteredBusinesses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBusinesses.map(business => (
                  <div
                    key={business.id}
                    onMouseEnter={() => setHoveredBusiness(business.id)}
                    onMouseLeave={() => setHoveredBusiness(null)}
                    className={`transition-all duration-200 ${
                      hoveredBusiness === business.id ? 'transform scale-105' : ''
                    }`}
                  >
                    <BusinessCard
                      business={business}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-text mb-2">No businesses found</h3>
                <p className="text-text-secondary mb-4">
                  Try adjusting your search terms or filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="btn-secondary"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Directory;

