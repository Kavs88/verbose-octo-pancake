import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, ClockIcon, StarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import BusinessCard from '../components/BusinessCard';

const Homepage = () => {
  const [userPreferences, setUserPreferences] = useState({
    favoriteCategories: ['Café', 'Wellness'],
    attendedEvents: ['Coffee Tasting Workshop'],
    location: 'Da Nang'
  });

  // Mock data for featured deals, popular businesses, and upcoming events
  const featuredDeals = [
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
      isFavorite: false
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
      isFavorite: true
    },
    {
      id: 3,
      name: "Artisan Bakery",
      category: "Bakery",
      neighborhood: "Hai Chau",
      coverPhoto: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 156,
      hasMemberDeal: true,
      dealHighlight: "Buy 2, Get 1 Free",
      isFavorite: false
    }
  ];

  const popularBusinesses = [
    {
      id: 4,
      name: "Digital Nomad Hub",
      category: "Co-working",
      neighborhood: "Hai Chau",
      coverPhoto: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 203,
      hasMemberDeal: false,
      dealHighlight: null,
      isFavorite: false
    },
    {
      id: 5,
      name: "Local Market Tours",
      category: "Experience",
      neighborhood: "Han Market",
      coverPhoto: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 178,
      hasMemberDeal: true,
      dealHighlight: "50% off for members",
      isFavorite: true
    },
    {
      id: 6,
      name: "Beachfront Restaurant",
      category: "Restaurant",
      neighborhood: "My Khe",
      coverPhoto: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
      rating: 4.5,
      reviewCount: 234,
      hasMemberDeal: true,
      dealHighlight: "Free dessert with main course",
      isFavorite: false
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Coffee Tasting Workshop",
      date: "Jan 15",
      time: "2:00 PM",
      businessName: "The Coffee House",
      neighborhood: "An Thuong",
      attendees: 15,
      maxAttendees: 20,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Sunset Beach Yoga",
      date: "Jan 20",
      time: "5:30 PM",
      businessName: "Beach Yoga Studio",
      neighborhood: "Non Nuoc",
      attendees: 22,
      maxAttendees: 30,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Vietnamese Cooking Class",
      date: "Jan 25",
      time: "10:00 AM",
      businessName: "Local Market Tours",
      neighborhood: "Han Market",
      attendees: 8,
      maxAttendees: 12,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
    }
  ];

  // Mock recommended content based on user preferences
  const recommendedForYou = [
    {
      id: 7,
      name: "Zen Tea House",
      category: "Café",
      neighborhood: "An Thuong",
      coverPhoto: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 92,
      hasMemberDeal: true,
      dealHighlight: "Free tea tasting",
      isFavorite: false,
      reason: "Similar to your favorite cafés"
    },
    {
      id: 8,
      name: "Mindfulness Retreat",
      category: "Wellness",
      neighborhood: "Non Nuoc",
      coverPhoto: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 67,
      hasMemberDeal: true,
      dealHighlight: "30% off weekend packages",
      isFavorite: false,
      reason: "Based on your wellness interests"
    },
    {
      id: 9,
      name: "Latte Art Workshop",
      category: "Experience",
      neighborhood: "An Thuong",
      coverPhoto: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 45,
      hasMemberDeal: true,
      dealHighlight: "Free for members",
      isFavorite: false,
      reason: "Perfect for coffee lovers"
    }
  ];

  const handleToggleFavorite = (businessId) => {
    // TODO: Update Strapi API
    console.log('Toggle favorite:', businessId);
  };

  const CarouselSection = ({ title, viewAllLink, children, className = "", isPremium = false }) => (
    <section className={`mb-12 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h2 className={`text-2xl font-bold ${isPremium ? 'text-metallic-gold' : 'text-text'}`}>
            {title}
          </h2>
          {isPremium && (
            <span className="premium-tag">Premium</span>
          )}
        </div>
        <Link to={viewAllLink} className="text-primary hover:text-primary-dark font-medium transition-colors duration-200 flex items-center space-x-1">
          <span>View All</span>
          <span className="text-lg">→</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </section>
  );

  const EventCard = ({ event }) => (
    <div className="card overflow-hidden hover:shadow-md transition-all duration-200 group">
      <div className="relative h-32 bg-gray-200 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-default text-xs font-medium text-text">
          {event.attendees}/{event.maxAttendees}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-text mb-2 group-hover:text-primary transition-colors duration-200">
          {event.title}
        </h3>
        <div className="space-y-1 text-sm text-text-secondary">
          <div className="flex items-center space-x-1">
            <ClockIcon className="w-4 h-4" />
            <span>{event.date} • {event.time}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPinIcon className="w-4 h-4" />
            <span>{event.businessName} • {event.neighborhood}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const DealsMapComponent = () => (
    <div className="card p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text">Deals Near You</h3>
        <Link to="/directory?view=map" className="text-primary hover:text-primary-dark text-sm font-medium">
          View Full Map →
        </Link>
      </div>
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-default overflow-hidden">
        {/* Mock map with deal pins */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPinIcon className="w-12 h-12 text-primary mx-auto mb-2" />
            <p className="text-text-secondary text-sm">Interactive Map</p>
            <p className="text-text-secondary text-xs">Click to explore deals in {userPreferences.location}</p>
          </div>
        </div>
        
        {/* Mock deal pins */}
        <div className="absolute top-8 left-8 w-3 h-3 bg-metallic-gold rounded-full animate-pulse-slow"></div>
        <div className="absolute top-16 right-12 w-3 h-3 bg-metallic-gold rounded-full animate-pulse-slow" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-12 left-1/2 w-3 h-3 bg-metallic-gold rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-8 right-8 w-3 h-3 bg-metallic-gold rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
        
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-text">
          {featuredDeals.length} active deals
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background-gray">
      {/* Hero Section with Premium Overlay */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-gunmetal to-transparent opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Amazing Places</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Your exclusive gateway to the best businesses, deals, and events in Da Nang & Hoi An
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/directory" className="btn-secondary bg-white text-primary-dark hover:bg-gray-50">
              Browse Directory
            </Link>
            <Link to="/deals" className="btn-premium">
              View Member Deals
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Deals Map Component */}
        <DealsMapComponent />

        {/* Recommended For You Section */}
        <CarouselSection 
          title="🎯 Recommended For You" 
          viewAllLink="/directory" 
          isPremium={true}
          className="mb-16"
        >
          {recommendedForYou.map(business => (
            <div key={business.id} className="relative">
              <BusinessCard 
                business={business} 
                onToggleFavorite={handleToggleFavorite} 
              />
              <div className="absolute -top-2 -right-2 bg-metallic-gold text-white text-xs px-2 py-1 rounded-full font-medium">
                {business.reason}
              </div>
            </div>
          ))}
        </CarouselSection>

        {/* Featured Member Deals Carousel */}
        <CarouselSection title="✨ Featured Member Deals" viewAllLink="/deals">
          {featuredDeals.map(business => (
            <BusinessCard 
              key={business.id} 
              business={business} 
              onToggleFavorite={handleToggleFavorite} 
            />
          ))}
        </CarouselSection>

        {/* Popular Businesses Carousel */}
        <CarouselSection title="🔥 Popular Businesses" viewAllLink="/directory">
          {popularBusinesses.map(business => (
            <BusinessCard 
              key={business.id} 
              business={business} 
              onToggleFavorite={handleToggleFavorite} 
            />
          ))}
        </CarouselSection>

        {/* Upcoming Events Carousel */}
        <CarouselSection title="📅 Upcoming Events" viewAllLink="/events">
          {upcomingEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </CarouselSection>

        {/* CTA Section */}
        <section className="text-center py-16">
          <div className="card-premium p-12 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-text mb-4">Ready to Explore?</h2>
            <p className="text-text-secondary text-lg mb-8">
              Join thousands of members discovering the best of Da Nang & Hoi An
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">Get Started</button>
              <button className="btn-secondary">Learn More</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Homepage;

