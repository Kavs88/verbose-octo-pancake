import React, { useState, useEffect } from 'react';
import { HeartIcon, MapPinIcon, StarIcon, ClockIcon, FireIcon, TagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    discountRange: [],
    neighborhood: []
  });
  const [loading, setLoading] = useState(true);

  // Mock data - in real app this would come from Strapi API
  useEffect(() => {
    const mockDeals = [
      {
        id: 1,
        businessName: "The Coffee House",
        businessCategory: "Café",
        neighborhood: "An Thuong",
        coverPhoto: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
        dealTitle: "20% OFF",
        dealDescription: "All beverages and pastries",
        rating: 4.8,
        reviewCount: 127,
        isFavorite: false,
        isFeatured: true,
        isFlashDeal: false,
        validUntil: "2024-02-15",
        discountPercentage: 20,
        originalPrice: "50,000 VND",
        discountedPrice: "40,000 VND"
      },
      {
        id: 2,
        businessName: "Beach Yoga Studio",
        businessCategory: "Wellness",
        neighborhood: "Non Nuoc",
        coverPhoto: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
        dealTitle: "FREE SESSION",
        dealDescription: "First yoga class for new members",
        rating: 4.9,
        reviewCount: 89,
        isFavorite: true,
        isFeatured: false,
        isFlashDeal: false,
        validUntil: "2024-01-31",
        discountPercentage: 100,
        originalPrice: "200,000 VND",
        discountedPrice: "FREE"
      },
      {
        id: 3,
        businessName: "Artisan Bakery",
        businessCategory: "Bakery",
        neighborhood: "Hai Chau",
        coverPhoto: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
        dealTitle: "BUY 2 GET 1",
        dealDescription: "Free pastry with any 2 purchases",
        rating: 4.7,
        reviewCount: 156,
        isFavorite: false,
        isFeatured: false,
        isFlashDeal: false,
        validUntil: "2024-02-10",
        discountPercentage: 33,
        originalPrice: "90,000 VND",
        discountedPrice: "60,000 VND"
      },
      {
        id: 4,
        businessName: "Local Market Tours",
        businessCategory: "Experience",
        neighborhood: "Han Market",
        coverPhoto: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        dealTitle: "50% OFF",
        dealDescription: "Guided market tour experience",
        rating: 4.9,
        reviewCount: 178,
        isFavorite: true,
        isFeatured: false,
        isFlashDeal: false,
        validUntil: "2024-02-20",
        discountPercentage: 50,
        originalPrice: "400,000 VND",
        discountedPrice: "200,000 VND"
      },
      {
        id: 5,
        businessName: "Digital Nomad Hub",
        businessCategory: "Co-working",
        neighborhood: "Hai Chau",
        coverPhoto: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
        dealTitle: "FLASH DEAL!",
        dealDescription: "First month 70% off - Limited time!",
        rating: 4.6,
        reviewCount: 203,
        isFavorite: false,
        isFeatured: false,
        isFlashDeal: true,
        validUntil: "2024-01-25T23:59:59",
        discountPercentage: 70,
        originalPrice: "1,500,000 VND",
        discountedPrice: "450,000 VND",
        flashDealEnds: "2024-01-25T23:59:59"
      },
      {
        id: 6,
        businessName: "Beachfront Restaurant",
        businessCategory: "Restaurant",
        neighborhood: "My Khe",
        coverPhoto: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
        dealTitle: "FLASH DEAL!",
        dealDescription: "Lunch special 40% off - Today only!",
        rating: 4.5,
        reviewCount: 234,
        isFavorite: false,
        isFeatured: false,
        isFlashDeal: true,
        validUntil: "2024-01-20T23:59:59",
        discountPercentage: 40,
        originalPrice: "300,000 VND",
        discountedPrice: "180,000 VND",
        flashDealEnds: "2024-01-20T23:59:59"
      }
    ];

    setDeals(mockDeals);
    setFilteredDeals(mockDeals);
    setLoading(false);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = deals;

    // Category filter
    if (activeFilters.category.length > 0) {
      filtered = filtered.filter(deal =>
        activeFilters.category.includes(deal.businessCategory)
      );
    }

    // Discount range filter
    if (activeFilters.discountRange.length > 0) {
      filtered = filtered.filter(deal =>
        activeFilters.discountRange.some(range => {
          const [min, max] = range.split('-').map(Number);
          return deal.discountPercentage >= min && deal.discountPercentage <= max;
        })
      );
    }

    // Neighborhood filter
    if (activeFilters.neighborhood.length > 0) {
      filtered = filtered.filter(deal =>
        activeFilters.neighborhood.includes(deal.neighborhood)
      );
    }

    setFilteredDeals(filtered);
  }, [deals, activeFilters]);

  const handleToggleFavorite = (dealId) => {
    setDeals(prev => prev.map(deal =>
      deal.id === dealId
        ? { ...deal, isFavorite: !deal.isFavorite }
        : deal
    ));
    // TODO: Update Strapi API
  };

  const handleCategoryFilter = (category) => {
    setActiveFilters(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category]
    }));
  };

  const handleDiscountFilter = (range) => {
    setActiveFilters(prev => ({
      ...prev,
      discountRange: prev.discountRange.includes(range)
        ? prev.discountRange.filter(r => r !== range)
        : [...prev.discountRange, range]
    }));
  };

  const handleNeighborhoodFilter = (neighborhood) => {
    setActiveFilters(prev => ({
      ...prev,
      neighborhood: prev.neighborhood.includes(neighborhood)
        ? prev.neighborhood.filter(n => n !== neighborhood)
        : [...prev.neighborhood, neighborhood]
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      category: [],
      discountRange: [],
      neighborhood: []
    });
  };

  const categories = ["Café", "Restaurant", "Wellness", "Co-working", "Experience", "Bakery", "Shopping"];
  const discountRanges = ["0-25", "26-50", "51-75", "76-100"];
  const neighborhoods = ["An Thuong", "My Khe", "Non Nuoc", "Hai Chau", "Han Market"];

  // Countdown timer component for flash deals
  const CountdownTimer = ({ endTime }) => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const end = new Date(endTime).getTime();
        const difference = end - now;

        if (difference > 0) {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeLeft({ hours, minutes, seconds });
        } else {
          setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        }
      }, 1000);

      return () => clearInterval(timer);
    }, [endTime]);

    return (
      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
        Ends in {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text-secondary">Loading deals...</p>
        </div>
      </div>
    );
  }

  const featuredDeal = deals.find(deal => deal.isFeatured);
  const flashDeals = deals.filter(deal => deal.isFlashDeal);

  return (
    <div className="min-h-screen bg-background-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text mb-4">Member Deals</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Exclusive offers and discounts available only to Benefit+ members
          </p>
        </div>

        {/* Flash Deals Carousel */}
        {flashDeals.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold text-text">🔥 Flash Deals</h2>
                <span className="premium-tag">Limited Time!</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashDeals.map((deal) => (
                <div key={deal.id} className="flash-deal rounded-default overflow-hidden">
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <img src={deal.coverPhoto} alt={deal.businessName} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    <button
                      onClick={() => handleToggleFavorite(deal.id)}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-default shadow-sm hover:bg-white transition-all duration-200"
                    >
                      {deal.isFavorite ? (
                        <HeartSolidIcon className="w-5 h-5 text-primary" />
                      ) : (
                        <HeartIcon className="w-5 h-5 text-text-secondary" />
                      )}
                    </button>
                    <div className="absolute top-3 left-3">
                      <CountdownTimer endTime={deal.flashDealEnds} />
                    </div>
                    <div className="absolute bottom-3 left-3 bg-metallic-gold text-white px-3 py-1 rounded-full text-xs font-bold">
                      {deal.discountPercentage}% OFF
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold text-metallic-gold mb-2">{deal.dealTitle}</div>
                      <p className="text-text-secondary">{deal.dealDescription}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg text-text mb-2">{deal.businessName}</h3>
                      <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
                        <span>{deal.businessCategory}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <MapPinIcon className="w-4 h-4" />
                          <span>{deal.neighborhood}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 mb-3">
                        <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{deal.rating}</span>
                        <span className="text-text-secondary">({deal.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary line-through">{deal.originalPrice}</span>
                        <span className="text-primary font-bold text-lg">{deal.discountedPrice}</span>
                      </div>
                    </div>
                    <button className="w-full btn-premium">Redeem Flash Deal</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Deal of the Week */}
        {featuredDeal && (
          <div className="card-premium p-8 mb-12 bg-gradient-to-r from-primary to-primary-dark text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-sm text-blue-100 mb-2 block">🌟 Deal of the Week</span>
                <h2 className="text-3xl font-bold mb-2">{featuredDeal.businessName}</h2>
                <p className="text-blue-100">{featuredDeal.businessCategory} • {featuredDeal.neighborhood}</p>
              </div>
              <div className="text-right">
                <div className="text-6xl font-bold text-yellow-300">{featuredDeal.dealTitle}</div>
                <p className="text-blue-100 text-lg">{featuredDeal.dealDescription}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-5 h-5 text-yellow-300 fill-current" />
                  <span className="font-semibold">{featuredDeal.rating}</span>
                  <span className="text-blue-100">({featuredDeal.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon className="w-4 h-4" />
                  <span className="text-sm">Valid until {featuredDeal.validUntil}</span>
                </div>
              </div>
              <button className="btn-secondary bg-white text-primary-dark hover:bg-gray-50">Redeem Deal</button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text">Filter Deals</h3>
            <button
              onClick={clearAllFilters}
              className="text-sm text-primary hover:text-primary-dark transition-colors duration-200"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

            {/* Discount Range Filter */}
            <div>
              <h4 className="font-medium text-text mb-3">Discount Range</h4>
              <div className="space-y-2">
                {discountRanges.map((range) => (
                  <label key={range} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={activeFilters.discountRange.includes(range)}
                      onChange={() => handleDiscountFilter(range)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-text-secondary">{range}%</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Neighborhood Filter */}
            <div>
              <h4 className="font-medium text-text mb-3">Neighborhood</h4>
              <div className="space-y-2">
                {neighborhoods.map((neighborhood) => (
                  <label key={neighborhood} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={activeFilters.neighborhood.includes(neighborhood)}
                      onChange={() => handleNeighborhoodFilter(neighborhood)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-text-secondary">{neighborhood}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-text-secondary">
            {filteredDeals.length} deal{filteredDeals.length !== 1 ? 's' : ''} found
            {Object.values(activeFilters).some(filter => 
              Array.isArray(filter) ? filter.length > 0 : filter
            ) && ' with applied filters'}
          </p>
        </div>

        {/* All Deals Grid */}
        {filteredDeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.map((deal) => (
              <div key={deal.id} className="card overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img src={deal.coverPhoto} alt={deal.businessName} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  <button
                    onClick={() => handleToggleFavorite(deal.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-default shadow-sm hover:bg-white transition-all duration-200"
                  >
                    {deal.isFavorite ? (
                      <HeartSolidIcon className="w-5 h-5 text-primary" />
                    ) : (
                      <HeartIcon className="w-5 h-5 text-text-secondary" />
                    )}
                  </button>
                  {deal.isFeatured && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-semibold rounded-default">
                      Featured
                    </div>
                  )}
                  {deal.isFlashDeal && (
                    <div className="absolute bottom-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                      <FireIcon className="w-3 h-3 inline mr-1" />
                      Flash Deal
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-primary mb-2">{deal.dealTitle}</div>
                    <p className="text-text-secondary">{deal.dealDescription}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg text-text mb-2">{deal.businessName}</h3>
                    <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
                      <span>{deal.businessCategory}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{deal.neighborhood}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 mb-3">
                      <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{deal.rating}</span>
                      <span className="text-text-secondary">({deal.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-text-secondary line-through">{deal.originalPrice}</span>
                      <span className="text-primary font-bold text-lg">{deal.discountedPrice}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-text-secondary">
                      <ClockIcon className="w-4 h-4" />
                      <span>Valid until {deal.validUntil}</span>
                    </div>
                  </div>
                  <button className="w-full btn-primary">Redeem Deal</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold text-text mb-2">No deals found</h3>
            <p className="text-text-secondary mb-4">
              Try adjusting your filters to see more deals.
            </p>
            <button
              onClick={clearAllFilters}
              className="btn-secondary"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deals;

