import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, ClockIcon, StarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import BusinessCard from '../components/BusinessCard';
import { useBusinesses } from '../hooks/useBusinesses';

const Homepage = () => {
  const [userPreferences, setUserPreferences] = useState({
    favoriteCategories: ['Café', 'Wellness'],
    attendedEvents: ['Coffee Tasting Workshop'],
    location: 'Da Nang'
  });

  // Use the real API hook instead of mock data
  const { 
    businesses, 
    loading, 
    error, 
    getRecommendedBusinesses, 
    getBusinessesWithDeals,
    getPremiumBusinesses 
  } = useBusinesses();

  // State for different business categories
  const [featuredDeals, setFeaturedDeals] = useState([]);
  const [popularBusinesses, setPopularBusinesses] = useState([]);
  const [premiumBusinesses, setPremiumBusinesses] = useState([]);

  // Debug logging
  console.log('🏠 Homepage render - businesses:', businesses);
  console.log('🏠 Homepage render - loading:', loading);
  console.log('🏠 Homepage render - error:', error);
  console.log('🏠 Homepage render - featuredDeals:', featuredDeals);
  console.log('🏠 Homepage render - popularBusinesses:', popularBusinesses);
  console.log('🏠 Homepage render - premiumBusinesses:', premiumBusinesses);

  // Load different business categories on component mount
  useEffect(() => {
    console.log('🔄 Homepage useEffect - loading business data');
    const loadBusinessData = async () => {
      try {
        // Load businesses with deals
        console.log('🎯 Loading businesses with deals...');
        const dealsResponse = await getBusinessesWithDeals();
        console.log('🎯 Deals response:', dealsResponse);
        if (dealsResponse?.data) {
          setFeaturedDeals(dealsResponse.data.slice(0, 3));
          console.log('🎯 Set featured deals:', dealsResponse.data.slice(0, 3));
        }

        // Load recommended businesses
        console.log('🌟 Loading recommended businesses...');
        const recommendedResponse = await getRecommendedBusinesses();
        console.log('🌟 Recommended response:', recommendedResponse);
        if (recommendedResponse?.data) {
          setPopularBusinesses(recommendedResponse.data.slice(0, 3));
          console.log('🌟 Set popular businesses:', recommendedResponse.data.slice(0, 3));
        }

        // Load premium businesses
        console.log('⭐ Loading premium businesses...');
        const premiumResponse = await getPremiumBusinesses();
        console.log('⭐ Premium response:', premiumResponse);
        if (premiumResponse?.data) {
          setPremiumBusinesses(premiumResponse.data.slice(0, 3));
          console.log('⭐ Set premium businesses:', premiumResponse.data.slice(0, 3));
        }
      } catch (err) {
        console.error('❌ Failed to load business data:', err);
      }
    };

    loadBusinessData();
  }, [getBusinessesWithDeals, getRecommendedBusinesses, getPremiumBusinesses]);

  // Mock data for upcoming events (we'll create an events API later)
  const upcomingEvents = [
    {
      id: 1,
      title: "Coffee Tasting Workshop",
      date: "Jan 15",
      time: "2:00 PM",
      businessName: "43 Factory Coffee Roaster",
      neighborhood: "Hai Chau",
      attendees: 15,
      maxAttendees: 20,
      isAttending: false
    },
    {
      id: 2,
      title: "Yoga by the Beach",
      date: "Jan 18",
      time: "6:00 AM",
      businessName: "Beach Yoga Studio",
      neighborhood: "Non Nuoc",
      attendees: 8,
      maxAttendees: 15,
      isAttending: true
    },
    {
      id: 3,
      title: "Local Market Food Tour",
      date: "Jan 20",
      time: "9:00 AM",
      businessName: "Local Market Tours",
      neighborhood: "Han Market",
      attendees: 12,
      maxAttendees: 18,
      isAttending: false
    }
  ];

  // Loading state
  if (loading && businesses.length === 0) {
    return (
      <div className="min-h-screen bg-background-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text-secondary">Loading businesses...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background-gray flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-text mb-2">Something went wrong</h2>
          <p className="text-text-secondary mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-gray">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-primary-light text-white py-20 px-4">
        <div className="hero-overlay absolute inset-0 bg-gradient-to-r from-gunmetal/80 to-gunmetal/60"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to <span className="text-metallic-gold">Benefit+</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Your exclusive membership platform for the best of Da Nang & Hoi An. 
            Discover premium businesses, exclusive deals, and unforgettable experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/directory" className="btn-premium text-lg px-8 py-4">
              Explore Directory
            </Link>
            <Link to="/deals" className="btn-secondary text-lg px-8 py-4">
              View Deals
            </Link>
          </div>
        </div>
      </section>

      {/* For You Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              For You
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Based on your preferences and location, here are some recommendations just for you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPinIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Location</h3>
              <p className="text-text-secondary">{userPreferences.location}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-metallic-gold to-metallic-goldLight rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Favorite Categories</h3>
              <p className="text-text-secondary">{userPreferences.favoriteCategories.join(', ')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gunmetal to-gunmetal-light rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Events Attended</h3>
              <p className="text-text-secondary">{userPreferences.attendedEvents.length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deals Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text">
              Featured Deals
            </h2>
            <Link to="/deals" className="text-primary hover:text-primary-dark font-semibold">
              View All →
            </Link>
          </div>
          
          {featuredDeals.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {featuredDeals.map((business) => (
                <BusinessCard 
                  key={business.id} 
                  business={business} 
                  isPremium={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary">No featured deals available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Popular Businesses Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text">
              Popular Businesses
            </h2>
            <Link to="/directory" className="text-primary hover:text-primary-dark font-semibold">
              View All →
            </Link>
          </div>
          
          {popularBusinesses.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {popularBusinesses.map((business) => (
                <BusinessCard 
                  key={business.id} 
                  business={business} 
                  isPremium={false}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary">No popular businesses available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Premium Businesses Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text">
              Premium Partners
            </h2>
            <Link to="/directory" className="text-primary hover:text-primary-dark font-semibold">
              View All →
            </Link>
          </div>
          
          {premiumBusinesses.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {premiumBusinesses.map((business) => (
                <BusinessCard 
                  key={business.id} 
                  business={business} 
                  isPremium={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary">No premium businesses available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text">
              Upcoming Events
            </h2>
            <Link to="/events" className="text-primary hover:text-primary-dark font-semibold">
              View All →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="card-premium overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="premium-tag px-3 py-1 text-xs font-semibold">
                      {event.attendees}/{event.maxAttendees} attending
                    </span>
                    <span className="text-text-secondary text-sm">
                      {event.date} • {event.time}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-text mb-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-text-secondary mb-4">
                    {event.businessName} • {event.neighborhood}
                  </p>
                  
                  <button 
                    className={`w-full py-2 px-4 rounded-default font-medium transition-colors ${
                      event.isAttending 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-primary text-white hover:bg-primary-dark'
                    }`}
                  >
                    {event.isAttending ? '✓ Attending' : "I'm Attending"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Unlock Premium Benefits?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Join thousands of members who are already enjoying exclusive access to the best businesses in Da Nang & Hoi An.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/profile" className="btn-premium text-lg px-8 py-4">
              Join Now
            </Link>
            <Link to="/about" className="btn-secondary text-lg px-8 py-4">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;

