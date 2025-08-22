import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  HeartIcon, 
  StarIcon, 
  MapPinIcon, 
  ClockIcon, 
  PhoneIcon, 
  GlobeAltIcon,
  CalendarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const BusinessDetail = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [activeTab, setActiveTab] = useState('about');
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app this would come from Strapi API
  useEffect(() => {
    const mockBusiness = {
      id: parseInt(id),
      name: "The Coffee House",
      category: "Café",
      neighborhood: "An Thuong",
      rating: 4.5,
      reviewCount: 128,
      hasMemberDeal: true,
      dealHighlight: "20% off all drinks for members",
      description: "A cozy café in the heart of An Thuong, serving specialty coffee and delicious pastries. Perfect for digital nomads and coffee enthusiasts.",
      coverPhoto: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
      photos: [
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1442512595721-dee248aac9fa?w=800&h=600&fit=crop"
      ],
      openingHours: {
        monday: "7:00 AM - 10:00 PM",
        tuesday: "7:00 AM - 10:00 PM",
        wednesday: "7:00 AM - 10:00 PM",
        thursday: "7:00 AM - 10:00 PM",
        friday: "7:00 AM - 11:00 PM",
        saturday: "7:00 AM - 11:00 PM",
        sunday: "8:00 AM - 9:00 PM"
      },
      phone: "+84 236 123 456",
      website: "https://coffeehouse.com",
      address: "123 An Thuong Street, Da Nang, Vietnam",
      amenities: ["WiFi", "Power Outlets", "Air Conditioning", "Outdoor Seating", "Pet Friendly"],
      deals: [
        {
          id: 1,
          title: "20% off all drinks",
          description: "Valid for all members on any drink order",
          validUntil: "2024-12-31"
        },
        {
          id: 2,
          title: "Free pastry with coffee",
          description: "Buy any coffee, get a pastry for free",
          validUntil: "2024-12-31"
        }
      ],
      events: [
        {
          id: 1,
          title: "Coffee Tasting Workshop",
          date: "2024-01-15",
          time: "2:00 PM",
          description: "Learn about different coffee beans and brewing methods"
        }
      ],
      reviews: [
        {
          id: 1,
          user: "Sarah M.",
          rating: 5,
          comment: "Amazing coffee and great atmosphere for working!",
          date: "2024-01-10"
        },
        {
          id: 2,
          user: "Mike R.",
          rating: 4,
          comment: "Love the outdoor seating area. Coffee is consistently good.",
          date: "2024-01-08"
        }
      ]
    };

    setBusiness(mockBusiness);
    setLoading(false);
  }, [id]);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Update Strapi API
  };

  const handleRedeemDeal = () => {
    // TODO: Implement deal redemption
    console.log('Deal redeemed!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-text-secondary">Loading business details...</p>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-semibold text-text mb-2">Business not found</h3>
          <p className="text-text-secondary">The business you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'About', icon: 'ℹ️' },
    { id: 'deals', label: 'Deals', icon: '🎯' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text mb-3">About</h3>
              <p className="text-text-secondary leading-relaxed">{business.description}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-text mb-3">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {business.amenities.map((amenity, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-text-secondary text-sm rounded-full">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'deals':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text mb-3">Member Deals</h3>
            {business.deals.map((deal) => (
              <div key={deal.id} className="card p-4">
                <h4 className="font-semibold text-text mb-2">{deal.title}</h4>
                <p className="text-text-secondary text-sm mb-2">{deal.description}</p>
                <p className="text-xs text-text-light">Valid until: {deal.validUntil}</p>
              </div>
            ))}
          </div>
        );
      
      case 'events':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text mb-3">Upcoming Events</h3>
            {business.events.map((event) => (
              <div key={event.id} className="card p-4">
                <h4 className="font-semibold text-text mb-2">{event.title}</h4>
                <div className="flex items-center space-x-4 text-sm text-text-secondary mb-2">
                  <span className="flex items-center space-x-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{event.date}</span>
                  </span>
                  <span>{event.time}</span>
                </div>
                <p className="text-text-secondary">{event.description}</p>
              </div>
            ))}
          </div>
        );
      
      case 'reviews':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text mb-3">Reviews</h3>
            {business.reviews.map((review) => (
              <div key={review.id} className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-text">{review.user}</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-text-secondary text-sm mb-2">{review.comment}</p>
                <p className="text-xs text-text-light">{review.date}</p>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Photo Gallery */}
          <div className="space-y-4">
            <div className="relative h-80 bg-gray-200 rounded-xl overflow-hidden">
              <img
                src={business.coverPhoto}
                alt={business.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={handleToggleFavorite}
                className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-soft hover:bg-white transition-all duration-200"
              >
                {isFavorite ? (
                  <HeartSolidIcon className="w-6 h-6 text-accent" />
                ) : (
                  <HeartIcon className="w-6 h-6 text-text-secondary" />
                )}
              </button>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-4">
              {business.photos.slice(1, 4).map((photo, index) => (
                <div key={index} className="h-24 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={photo}
                    alt={`${business.name} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Business Info */}
          <div className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-poppins font-bold text-text mb-2">
                  {business.name}
                </h1>
                <div className="flex items-center space-x-4 text-text-secondary">
                  <span>{business.category}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{business.neighborhood}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold text-text">{business.rating}</span>
                <span className="text-text-secondary">({business.reviewCount})</span>
              </div>
            </div>

            {/* Tabbed Navigation */}
            <div className="border-b border-border mb-6">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-accent text-accent'
                        : 'border-transparent text-text-secondary hover:text-text hover:border-border'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* Sticky Summary Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Member Deal CTA */}
            {business.hasMemberDeal && (
              <div className="card p-6 bg-gradient-to-br from-accent to-accent-dark text-white">
                <h3 className="text-xl font-semibold mb-2">Member Deal</h3>
                <p className="text-accent-light mb-4">{business.dealHighlight}</p>
                <button
                  onClick={handleRedeemDeal}
                  className="w-full bg-white text-accent font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Redeem Deal
                </button>
              </div>
            )}

            {/* Business Info Card */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-text mb-4">Business Info</h3>
              
              {/* Opening Hours */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 text-text-secondary mb-2">
                  <ClockIcon className="w-5 h-5" />
                  <span className="font-medium">Opening Hours</span>
                </div>
                <div className="space-y-1 text-sm">
                  {Object.entries(business.openingHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="capitalize">{day}</span>
                      <span>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="w-5 h-5 text-text-secondary" />
                  <span className="text-sm">{business.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <GlobeAltIcon className="w-5 h-5 text-text-secondary" />
                  <a href={business.website} className="text-sm text-accent hover:underline">
                    Visit Website
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPinIcon className="w-5 h-5 text-text-secondary mt-0.5" />
                  <span className="text-sm">{business.address}</span>
                </div>
              </div>
            </div>

            {/* Map Preview */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-text mb-4">Location</h3>
              <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-text-secondary">
                  <MapPinIcon className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Map view coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;

