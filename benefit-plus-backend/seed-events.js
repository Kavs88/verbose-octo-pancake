const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = 'fd546d95b038b8807b529587af88f7d97d0d7aebde98ec64600bd3702ba57ebb6d61078fcb86505824b5ff61e3f18ebfdb0ab7c5d14c6f4bd7014cc849f2b8eff7350e386029a020e1f3cfe6cde2995d7f19ea2cb49f7f1ebf1285b7978100af0b1b0ff9b104d954539732efcd18f575ac98457b1ec48c66b41ac967ad24dcf6';

// Sample events data that matches frontend requirements
const events = [
  {
    title: "Coffee Tasting Workshop",
    description: "Join us for an exclusive coffee tasting experience featuring our finest single-origin beans. Learn about brewing techniques and coffee origins.",
    date: "2025-01-15",
    time: "14:00:00",
    duration: "2 hours",
    neighborhood: "Hai Chau",
    address: "43 Factory Coffee Roaster, Da Nang",
    maxAttendees: 20,
    isActive: true,
    business: 2, // This will link to 43 Factory Coffee Roaster
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
    attendees: [],
    isAttending: false
  },
  {
    title: "Yoga by the Beach",
    description: "Start your day with a refreshing yoga session by the beautiful Non Nuoc beach. All levels welcome, mats provided.",
    date: "2025-01-18",
    time: "06:00:00",
    duration: "1 hour",
    neighborhood: "Non Nuoc",
    address: "Non Nuoc Beach, Da Nang",
    maxAttendees: 15,
    isActive: true,
    business: 5, // This will link to Beach Yoga Studio
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    attendees: [],
    isAttending: false
  },
  {
    title: "Local Market Food Tour",
    description: "Explore the vibrant Han Market with our expert guide. Taste local specialties and learn about Vietnamese cuisine.",
    date: "2025-01-20",
    time: "09:00:00",
    duration: "3 hours",
    neighborhood: "Han Market",
    address: "Han Market, Da Nang",
    maxAttendees: 18,
    isActive: true,
    business: 6, // This will link to Local Market Tours
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
    attendees: [],
    isAttending: false
  },
  {
    title: "Steakhouse Wine Pairing",
    description: "An exclusive wine pairing dinner featuring premium cuts and carefully selected wines. Perfect for special occasions.",
    date: "2025-01-25",
    time: "19:00:00",
    duration: "3 hours",
    neighborhood: "Hai Chau",
    address: "Olivia's Prime Steakhouse, Da Nang",
    maxAttendees: 25,
    isActive: true,
    business: 1, // This will link to Olivia's Prime Steakhouse
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
    attendees: [],
    isAttending: false
  },
  {
    title: "Cocktail Masterclass",
    description: "Learn to craft artisanal cocktails from our expert mixologists. Includes hands-on experience and tasting.",
    date: "2025-01-28",
    time: "18:00:00",
    duration: "2.5 hours",
    neighborhood: "Hai Chau",
    address: "The Craftsman Cocktail Bar, Da Nang",
    maxAttendees: 12,
    isActive: true,
    business: 3, // This will link to The Craftsman Cocktail Bar
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&h=600&fit=crop",
    attendees: [],
    isAttending: false
  }
];

async function seedEvents() {
  try {
    console.log('🚀 Starting events seeder...');
    console.log('🧪 Testing API connection...');
    
    try {
      const testResponse = await fetch(`${API_BASE_URL}/events`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      console.log('✅ Events API is accessible');
    } catch (error) {
      console.error('❌ Events API not accessible:', error.message);
      console.log('💡 Please ensure Strapi is running and events content type exists');
      return;
    }

    let successCount = 0;
    for (const event of events) {
      try {
        console.log(`📝 Creating event: ${event.title}`);
        
        const eventData = {
          data: event
        };

        const response = await fetch(`${API_BASE_URL}/events`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`
          },
          body: JSON.stringify(eventData)
        });

        if (response.ok) {
          successCount++;
          console.log(`✅ Created event: ${event.title}`);
        } else {
          const error = await response.json();
          console.error(`❌ Failed to create event: ${event.title} -`, error);
        }
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`❌ Error creating event ${event.title}:`, error.message);
      }
    }
    
    console.log(`🎉 Events seeding completed! Successfully created ${successCount}/${events.length} events`);
  } catch (error) {
    console.error('❌ Events seeder failed:', error);
  }
}

seedEvents();
