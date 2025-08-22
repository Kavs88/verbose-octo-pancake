import React, { useState, useEffect } from 'react';
import { CalendarIcon, MapPinIcon, ClockIcon, UserIcon, ListBulletIcon, PlusIcon, ShareIcon } from '@heroicons/react/24/outline';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    neighborhood: []
  });
  const [loading, setLoading] = useState(true);
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);
  const [selectedEventForCalendar, setSelectedEventForCalendar] = useState(null);

  // Mock data - in real app this would come from Strapi API
  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        title: "Coffee Tasting Workshop",
        date: "2024-01-15",
        time: "2:00 PM",
        duration: "2 hours",
        businessName: "The Coffee House",
        businessCategory: "Café",
        neighborhood: "An Thuong",
        description: "Learn about different coffee beans and brewing methods from our expert baristas. Perfect for coffee enthusiasts and beginners alike.",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
        maxAttendees: 20,
        currentAttendees: 15,
        isAttending: false,
        price: "Free for members",
        attendees: [
          { id: 1, name: "Sarah M.", avatar: "SM", isFriend: true },
          { id: 2, name: "Mike R.", avatar: "MR", isFriend: false },
          { id: 3, name: "Emma L.", avatar: "EL", isFriend: true }
        ]
      },
      {
        id: 2,
        title: "Sunset Beach Yoga",
        date: "2024-01-20",
        time: "5:30 PM",
        duration: "1 hour",
        businessName: "Beach Yoga Studio",
        businessCategory: "Wellness",
        neighborhood: "Non Nuoc",
        description: "Relaxing yoga session on the beach during golden hour. All levels welcome, mats provided.",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
        maxAttendees: 30,
        currentAttendees: 22,
        isAttending: true,
        price: "Free for members",
        attendees: [
          { id: 4, name: "David K.", avatar: "DK", isFriend: false },
          { id: 5, name: "Lisa P.", avatar: "LP", isFriend: true },
          { id: 6, name: "Tom B.", avatar: "TB", isFriend: false }
        ]
      },
      {
        id: 3,
        title: "Vietnamese Cooking Class",
        date: "2024-01-25",
        time: "10:00 AM",
        duration: "3 hours",
        businessName: "Local Market Tours",
        businessCategory: "Experience",
        neighborhood: "Han Market",
        description: "Learn to cook traditional Vietnamese dishes. Visit the local market, then cook and enjoy your creations.",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        maxAttendees: 12,
        currentAttendees: 8,
        isAttending: false,
        price: "50% off for members",
        attendees: [
          { id: 7, name: "Maria S.", avatar: "MS", isFriend: true },
          { id: 8, name: "Alex T.", avatar: "AT", isFriend: false }
        ]
      },
      {
        id: 4,
        title: "Digital Nomad Meetup",
        date: "2024-01-18",
        time: "7:00 PM",
        duration: "2 hours",
        businessName: "Digital Nomad Hub",
        businessCategory: "Co-working",
        neighborhood: "Hai Chau",
        description: "Network with fellow digital nomads, share experiences, and discover collaboration opportunities.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
        maxAttendees: 50,
        currentAttendees: 35,
        isAttending: false,
        price: "Free for members",
        attendees: [
          { id: 9, name: "Jenny W.", avatar: "JW", isFriend: false },
          { id: 10, name: "Chris L.", avatar: "CL", isFriend: true },
          { id: 11, name: "Anna K.", avatar: "AK", isFriend: false }
        ]
      },
      {
        id: 5,
        title: "Artisan Bread Making",
        date: "2024-01-22",
        time: "9:00 AM",
        duration: "4 hours",
        businessName: "Artisan Bakery",
        businessCategory: "Bakery",
        neighborhood: "Hai Chau",
        description: "Master the art of bread making with our expert bakers. Take home your creations and the skills to make more.",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
        maxAttendees: 15,
        currentAttendees: 12,
        isAttending: false,
        price: "30% off for members",
        attendees: [
          { id: 12, name: "Emma L.", avatar: "EL", isFriend: true },
          { id: 13, name: "Mike R.", avatar: "MR", isFriend: false }
        ]
      }
    ];

    setEvents(mockEvents);
    setFilteredEvents(mockEvents);
    setLoading(false);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = events;

    // Category filter
    if (activeFilters.category.length > 0) {
      filtered = filtered.filter(event =>
        activeFilters.category.includes(event.businessCategory)
      );
    }

    // Neighborhood filter
    if (activeFilters.neighborhood.length > 0) {
      filtered = filtered.filter(event =>
        activeFilters.neighborhood.includes(event.neighborhood)
      );
    }

    setFilteredEvents(filtered);
  }, [events, activeFilters]);

  const handleToggleAttendance = (eventId) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, isAttending: !event.isAttending }
        : event
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
      neighborhood: []
    });
  };

  const handleAddToCalendar = (event) => {
    setSelectedEventForCalendar(event);
    setShowCalendarOptions(true);
  };

  const generateCalendarFile = (event, format) => {
    const startDate = new Date(`${event.date}T${event.time}`);
    const endDate = new Date(startDate.getTime() + (parseInt(event.duration) * 60 * 60 * 1000));
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Benefit+//Event//EN',
      'BEGIN:VEVENT',
      `UID:${event.id}@benefitplus.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}\\n\\nBusiness: ${event.businessName}\\nLocation: ${event.neighborhood}\\nPrice: ${event.price}`,
      `LOCATION:${event.businessName}, ${event.neighborhood}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    if (format === 'ics') {
      const blob = new Blob([icsContent], { type: 'text/calendar' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${event.title.replace(/\s+/g, '_')}.ics`;
      link.click();
      window.URL.revokeObjectURL(url);
    } else if (format === 'google') {
      const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(`${event.businessName}, ${event.neighborhood}`)}`;
      window.open(googleUrl, '_blank');
    }
    
    setShowCalendarOptions(false);
    setSelectedEventForCalendar(null);
  };

  const categories = ["Café", "Restaurant", "Wellness", "Co-working", "Experience", "Bakery"];
  const neighborhoods = ["An Thuong", "My Khe", "Non Nuoc", "Hai Chau", "Han Market"];

  // Calendar helpers
  const getCurrentMonth = () => {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth()
    };
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const hasEventOnDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredEvents.some(event => event.date === dateStr);
  };

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredEvents.filter(event => event.date === dateStr);
  };

  const renderCalendar = () => {
    const { year, month } = getCurrentMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 bg-gray-50"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const hasEvent = hasEventOnDate(date);
      const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
      
      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-20 p-2 border border-border cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
            isSelected ? 'bg-primary text-white' : 'bg-white'
          }`}
        >
          <div className="text-sm font-medium mb-1">{day}</div>
          {hasEvent && (
            <div className={`w-2 h-2 rounded-full mx-auto ${
              isSelected ? 'bg-white' : 'bg-primary'
            }`}></div>
          )}
        </div>
      );
    }

    return (
      <div className="card p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-text">{monthNames[month]} {year}</h3>
        </div>
        
        <div className="grid grid-cols-7 gap-px bg-border mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-text-secondary">
              {day}
            </div>
          ))}
          {days}
        </div>

        {/* Selected Date Events */}
        {selectedDate && (
          <div className="mt-6">
            <h4 className="font-semibold text-text mb-4">
              Events on {selectedDate.toLocaleDateString()}
            </h4>
            <div className="space-y-3">
              {getEventsForDate(selectedDate).map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onToggleAttendance={handleToggleAttendance}
                  onAddToCalendar={handleAddToCalendar}
                  compact={true}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const EventCard = ({ event, onToggleAttendance, onAddToCalendar, compact = false }) => (
    <div className={`card overflow-hidden hover:shadow-md transition-shadow duration-200 ${compact ? 'p-4' : 'p-6'}`}>
      <div className="flex space-x-4">
        <div className={`bg-gray-200 overflow-hidden rounded-default ${compact ? 'w-20 h-20' : 'w-32 h-32'}`}>
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h3 className={`font-semibold text-text mb-2 ${compact ? 'text-lg' : 'text-xl'}`}>
            {event.title}
          </h3>
          
          <div className="space-y-2 text-sm text-text-secondary">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <CalendarIcon className="w-4 h-4" />
                <span>{event.date}</span>
              </span>
              <span className="flex items-center space-x-1">
                <ClockIcon className="w-4 h-4" />
                <span>{event.time} ({event.duration})</span>
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <UserIcon className="w-4 h-4" />
                <span>{event.businessName}</span>
              </span>
              <span className="flex items-center space-x-1">
                <MapPinIcon className="w-4 h-4" />
                <span>{event.neighborhood}</span>
              </span>
            </div>
            
            {!compact && (
              <p className="text-text-secondary">{event.description}</p>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-primary font-medium">{event.price}</span>
              <span className="text-sm text-text-secondary">
                {event.currentAttendees}/{event.maxAttendees} attending
              </span>
            </div>
          </div>
          
          {/* Social Proof - Attending Avatars */}
          {!compact && event.attendees && event.attendees.length > 0 && (
            <div className="mt-3 mb-3">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {event.attendees.slice(0, 3).map((attendee) => (
                    <div
                      key={attendee.id}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white ${
                        attendee.isFriend ? 'bg-metallic-gold' : 'bg-primary'
                      }`}
                      title={attendee.name}
                    >
                      {attendee.avatar}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-text-secondary">
                  + {event.currentAttendees - 3} others are attending
                </span>
              </div>
            </div>
          )}
          
          <div className="flex space-x-2">
            <button
              onClick={() => onToggleAttendance(event.id)}
              className={`px-4 py-2 rounded-default font-medium transition-colors duration-200 ${
                event.isAttending
                  ? 'bg-primary text-white'
                  : 'bg-white text-primary border border-primary hover:bg-primary hover:text-white'
              }`}
            >
              {event.isAttending ? 'Attending ✅' : 'I\'m Attending'}
            </button>
            
            {!compact && (
              <button
                onClick={() => onAddToCalendar(event)}
                className="px-4 py-2 bg-white text-text-secondary border border-border rounded-default font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Calendar</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text-secondary">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text mb-4">
            Events & Activities
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Discover exciting events, workshops, and activities happening in Da Nang & Hoi An
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
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
                <ListBulletIcon className="w-5 h-5" />
                <span>List View</span>
              </button>
              
              <button
                onClick={() => setViewMode('calendar')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-default font-medium transition-all duration-200 ${
                  viewMode === 'calendar'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-secondary hover:text-text hover:bg-gray-50'
                }`}
              >
                <CalendarIcon className="w-5 h-5" />
                <span>Calendar View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text">Filter Events</h3>
            <button
              onClick={clearAllFilters}
              className="text-sm text-primary hover:text-primary-dark transition-colors duration-200"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
            {Object.values(activeFilters).some(filter => filter.length > 0) && ' with applied filters'}
          </p>
        </div>

        {/* Content */}
        {viewMode === 'calendar' ? (
          renderCalendar()
        ) : (
          <div className="space-y-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onToggleAttendance={handleToggleAttendance}
                  onAddToCalendar={handleAddToCalendar}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-lg font-semibold text-text mb-2">No events found</h3>
                <p className="text-text-secondary mb-4">
                  Try adjusting your filters to see more events.
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
        )}
      </div>

      {/* Calendar Options Modal */}
      {showCalendarOptions && selectedEventForCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-default p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-text mb-4">
              Add to Calendar
            </h3>
            <p className="text-text-secondary mb-6">
              {selectedEventForCalendar.title}
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => generateCalendarFile(selectedEventForCalendar, 'google')}
                className="w-full text-left p-3 border border-border rounded-default hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <span>Google Calendar</span>
              </button>
              
              <button
                onClick={() => generateCalendarFile(selectedEventForCalendar, 'ics')}
                className="w-full text-left p-3 border border-border rounded-default hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <span>Apple Calendar / Outlook (.ics)</span>
              </button>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShowCalendarOptions(false);
                  setSelectedEventForCalendar(null);
                }}
                className="px-4 py-2 text-text-secondary hover:text-text transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
