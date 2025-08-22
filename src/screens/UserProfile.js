import React, { useState, useEffect } from 'react';
import { 
  HeartIcon, 
  CalendarIcon, 
  UserIcon, 
  CogIcon,
  ArrowRightOnRectangleIcon,
  TrashIcon,
  KeyIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import BusinessCard from '../components/BusinessCard';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('favorites');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app this would come from Strapi API
  useEffect(() => {
    const mockUser = {
      id: 1,
      name: "Sarah",
      email: "sarah@example.com",
      membershipTier: "Premium",
      membershipRenewal: "Dec 20, 2024",
      avatar: null,
      favoriteBusinesses: [
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
          id: 3,
          name: "Beach Yoga Studio",
          category: "Wellness",
          neighborhood: "Non Nuoc",
          rating: 4.8,
          reviewCount: 67,
          hasMemberDeal: true,
          dealHighlight: "Free class for new members",
          coverPhoto: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
        }
      ],
      attendingEvents: [
        {
          id: 1,
          title: "Coffee Tasting Workshop",
          date: "2024-01-15",
          time: "2:00 PM",
          businessName: "The Coffee House",
          description: "Learn about different coffee beans and brewing methods"
        },
        {
          id: 2,
          title: "Sunset Beach Yoga",
          date: "2024-01-20",
          time: "5:30 PM",
          businessName: "Beach Yoga Studio",
          description: "Relaxing yoga session on the beach"
        }
      ],
      pastEvents: [
        {
          id: 3,
          title: "Vietnamese Cooking Class",
          date: "2024-01-05",
          time: "10:00 AM",
          businessName: "Local Market Tours",
          description: "Learn to cook traditional Vietnamese dishes"
        }
      ]
    };

    setUser(mockUser);
    setLoading(false);
  }, []);

  const handleToggleFavorite = (businessId, isFavorite) => {
    // TODO: Update Strapi API to toggle favorite
    console.log(`Business ${businessId} ${isFavorite ? 'favorited' : 'unfavorited'}`);
  };

  const handleLogout = () => {
    // TODO: Implement logout
    console.log('Logout clicked');
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Account deletion confirmed');
    }
  };

  const tabs = [
    { id: 'favorites', label: 'My Favorites', icon: '❤️' },
    { id: 'events', label: 'My Events', icon: '📅' },
    { id: 'account', label: 'My Account', icon: '👤' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'favorites':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-text">Favorite Businesses</h3>
              <span className="text-text-secondary">
                {user.favoriteBusinesses.length} business{user.favoriteBusinesses.length !== 1 ? 'es' : ''}
              </span>
            </div>
            
            {user.favoriteBusinesses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.favoriteBusinesses.map(business => (
                  <BusinessCard
                    key={business.id}
                    business={business}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <HeartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text mb-2">No favorites yet</h3>
                <p className="text-text-secondary">
                  Start exploring businesses and save your favorites by clicking the heart icon.
                </p>
              </div>
            )}
          </div>
        );
      
      case 'events':
        return (
          <div className="space-y-8">
            {/* Upcoming Events */}
            <div>
              <h3 className="text-xl font-semibold text-text mb-4">Upcoming Events</h3>
              {user.attendingEvents.length > 0 ? (
                <div className="space-y-4">
                  {user.attendingEvents.map((event) => (
                    <div key={event.id} className="card p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-text text-lg mb-2">{event.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
                            <span className="flex items-center space-x-1">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{event.date}</span>
                            </span>
                            <span>{event.time}</span>
                            <span className="flex items-center space-x-1">
                              <UserIcon className="w-4 h-4" />
                              <span>{event.businessName}</span>
                            </span>
                          </div>
                          <p className="text-text-secondary">{event.description}</p>
                        </div>
                        <button className="btn-secondary text-sm px-4 py-2">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-text mb-2">No upcoming events</h4>
                  <p className="text-text-secondary">
                    Start exploring events and mark yourself as attending.
                  </p>
                </div>
              )}
            </div>

            {/* Past Events */}
            <div>
              <h3 className="text-xl font-semibold text-text mb-4">Past Events</h3>
              {user.pastEvents.length > 0 ? (
                <div className="space-y-4">
                  {user.pastEvents.map((event) => (
                    <div key={event.id} className="card p-6 bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-text text-lg mb-2">{event.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
                            <span className="flex items-center space-x-1">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{event.date}</span>
                            </span>
                            <span>{event.time}</span>
                            <span className="flex items-center space-x-1">
                              <UserIcon className="w-4 h-4" />
                              <span>{event.businessName}</span>
                            </span>
                          </div>
                          <p className="text-text-secondary">{event.description}</p>
                        </div>
                        <span className="text-xs text-text-light bg-gray-200 px-2 py-1 rounded-full">
                          Completed
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-text mb-2">No past events</h4>
                  <p className="text-text-secondary">
                    Events you've attended will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'account':
        return (
          <div className="space-y-6">
            {/* Membership Status */}
            <div className="card p-6 bg-gradient-to-r from-primary to-primary-dark text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Membership Status</h3>
                  <p className="text-primary-light">Premium Member</p>
                  <p className="text-sm text-primary-light">Renews on Dec 20, 2024</p>
                </div>
                <div className="text-3xl">👑</div>
              </div>
            </div>

            {/* Account Details Form */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-text mb-4">Account Details</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Name</label>
                  <input
                    type="text"
                    value={user.name}
                    className="input-field"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    className="input-field"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="pt-4">
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>

            {/* Account Actions */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-text mb-4">Account Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 text-left border border-border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <KeyIcon className="w-5 h-5 text-text-secondary" />
                    <span className="font-medium text-text">Change Password</span>
                  </div>
                  <ArrowRightOnRectangleIcon className="w-5 h-5 text-text-secondary" />
                </button>
                
                <button className="w-full flex items-center justify-between p-4 text-left border border-border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <CogIcon className="w-5 h-5 text-text-secondary" />
                    <span className="font-medium text-text">Privacy Settings</span>
                  </div>
                  <ArrowRightOnRectangleIcon className="w-5 h-5 text-text-secondary" />
                </button>
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between p-4 text-left border border-border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <ArrowRightOnRectangleIcon className="w-5 h-5 text-text-secondary" />
                    <span className="font-medium text-text">Log Out</span>
                  </div>
                  <ArrowRightOnRectangleIcon className="w-5 h-5 text-text-secondary" />
                </button>
                
                <button 
                  onClick={handleDeleteAccount}
                  className="w-full flex items-center justify-between p-4 text-left border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <TrashIcon className="w-5 h-5 text-red-500" />
                    <span className="font-medium text-red-600">Delete Account</span>
                  </div>
                  <ArrowRightOnRectangleIcon className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-text-secondary">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h1 className="text-3xl font-poppins font-bold text-text">
              Hello, {user.name}
            </h1>
            <p className="text-text-secondary">Manage your account and preferences</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border">
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
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default UserProfile;

