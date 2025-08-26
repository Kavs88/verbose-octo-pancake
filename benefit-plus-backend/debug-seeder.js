const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = 'fd546d95b038b8807b529587af88f7d97d0d7aebde98ec64600bd3702ba57ebb6d61078fcb86505824b5ff61e3f18ebfdb0ab7c5d14c6f4bd7014cc849f2b8eff7350e386029a020e1f3cfe6cde2995d7f19ea2cb49f7f1ebf1285b7978100af0b1b0ff9b104d954539732efcd18f575ac98457b1ec48c66b41ac967ad24dcf6';

// Test data from AI
const testData = {
  businesses: [
    {
      name: "Olivia's Prime Steakhouse",
      description: "An upscale dining experience specializing in high-quality imported steaks, fine wines, and classic cocktails. Perfect for a special occasion.",
      category: "restaurant",
      neighborhood: "Hai Chau, Da Nang",
      rating: 4.8,
      reviewCount: 750,
      isOpen: true,
      hasMemberDeal: true,
      dealHighlight: "Free glass of house wine with any steak order",
      isPremium: true,
      latitude: 16.0752,
      longitude: 108.2232,
      address: "505 Đ. Trần Hưng Đạo, An Hải Trung, Sơn Trà, Đà Nẵng",
      phone: "+84 236 3939 888",
      website: "https://oliviasprime.com",
      openingHours: { "monday": "5:00 PM - 10:00 PM", "tuesday": "5:00 PM - 10:00 PM", "wednesday": "5:00 PM - 10:00 PM", "thursday": "5:00 PM - 10:00 PM", "friday": "5:00 PM - 11:00 PM", "saturday": "5:00 PM - 11:00 PM", "sunday": "5:00 PM - 10:00 PM" },
      amenities: ["Fine Dining", "Full Bar", "Reservations Recommended", "Wheelchair Access"]
    }
  ],
  deals: [
    {
      title: "20% Off 90-Min Massage",
      description: "Unwind with a relaxing 90-minute traditional Vietnamese massage at a special member price.",
      dealType: "percentage",
      discountPercentage: 20,
      discountAmount: 0,
      originalPrice: 600000,
      finalPrice: 480000,
      startDate: "2024-01-01",
      endDate: "2025-12-31",
      isActive: true,
      isFlashDeal: false,
      terms: "Valid for 90-minute traditional massage only. Booking required.",
      restrictions: ["Cannot be combined with other offers"]
    }
  ],
  events: [
    {
      title: "Expat Networking Night",
      description: "Meet and connect with other expats and digital nomads living in Da Nang. A casual social event with great drinks and conversation.",
      date: "2024-11-28",
      time: "19:00:00",
      neighborhood: "Hai Chau, Da Nang",
      maxAttendees: 100,
      isActive: true,
      duration: "3 hours",
      address: "7 Bridges Brewing Co., 493 Đ. Trần Hưng Đạo, Đà Nẵng",
      eventType: "networking",
      price: 0,
      isFree: true
    }
  ]
};

async function debugSeeding() {
  try {
    console.log('🔍 Starting debug seeding...');
    
    // 1. Seed one business first
    const businessIds = await seedBusinesses();
    
    if (businessIds.length === 0) {
      console.log('❌ No businesses created, stopping debug');
      return;
    }
    
    // 2. Try to create one deal with detailed error info
    await debugDealCreation(businessIds[0]);
    
    // 3. Try to create one event with detailed error info
    await debugEventCreation(businessIds[0]);
    
  } catch (error) {
    console.error('❌ Error in debug seeding:', error);
  }
}

async function seedBusinesses() {
  console.log('🏢 Seeding businesses...');
  const businessIds = [];
  
  for (const business of testData.businesses) {
    try {
      const response = await fetch(`${API_BASE_URL}/businesses`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: business })
      });
      
      if (response.ok) {
        const result = await response.json();
        businessIds.push(result.data.id);
        console.log(`✅ Created business: ${business.name} (ID: ${result.data.id})`);
      } else {
        console.error(`❌ Failed to create business ${business.name}:`, response.status);
      }
    } catch (error) {
      console.error(`❌ Error creating business ${business.name}:`, error);
    }
  }
  
  return businessIds;
}

async function debugDealCreation(businessId) {
  console.log('🎯 Debugging deal creation...');
  
  const deal = testData.deals[0];
  const dealData = {
    ...deal,
    business: businessId
  };
  
  try {
    console.log('📤 Sending deal data:', JSON.stringify(dealData, null, 2));
    
    const response = await fetch(`${API_BASE_URL}/deals`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: dealData })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Deal created successfully:`, result);
    } else {
      const errorText = await response.text();
      console.error(`❌ Deal creation failed (${response.status}):`, errorText);
      
      // Try to get more details about the deal schema
      await checkDealSchema();
    }
  } catch (error) {
    console.error(`❌ Error creating deal:`, error);
  }
}

async function debugEventCreation(businessId) {
  console.log('📅 Debugging event creation...');
  
  const event = testData.events[0];
  const eventData = {
    ...event,
    organizer: businessId
  };
  
  try {
    console.log('📤 Sending event data:', JSON.stringify(eventData, null, 2));
    
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: eventData })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Event created successfully:`, result);
    } else {
      const errorText = await response.text();
      console.error(`❌ Event creation failed (${response.status}):`, errorText);
      
      // Try to get more details about the event schema
      await checkEventSchema();
    }
  } catch (error) {
    console.error(`❌ Error creating event:`, error);
  }
}

async function checkDealSchema() {
  console.log('🔍 Checking deal schema...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/deals`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('📋 Deal schema info:', JSON.stringify(result, null, 2));
    } else {
      console.error('❌ Could not fetch deal schema:', response.status);
    }
  } catch (error) {
    console.error('❌ Error checking deal schema:', error);
  }
}

async function checkEventSchema() {
  console.log('🔍 Checking event schema...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('📋 Event schema info:', JSON.stringify(result, null, 2));
    } else {
      console.error('❌ Could not fetch event schema:', response.status);
    }
  } catch (error) {
    console.error('❌ Error checking event schema:', error);
  }
}

// Run the debug seeder
debugSeeding();
