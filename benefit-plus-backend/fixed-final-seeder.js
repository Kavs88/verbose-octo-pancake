const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = 'fd546d95b038b8807b529587af88f7d97d0d7aebde98ec64600bd3702ba57ebb6d61078fcb86505824b5ff61e3f18ebfdb0ab7c5d14c6f4bd7014cc849f2b8eff7350e386029a020e1f3cfe6cde2995d7f19ea2cb49f7f1ebf1285b7978100af0b1b0ff9b104d954539732efcd18f575ac98457b1ec48c66b41ac967ad24dcf6';

// Use EXISTING business IDs that we already created successfully
const EXISTING_BUSINESS_IDS = [68, 70];

// Test data from AI - Using the CORRECT content type endpoints
const testData = {
  deals: [
    {
      title: "20% Off 90-Min Massage",
      description: "Unwind with a relaxing 90-minute traditional Vietnamese massage at a special member price.",
      dealType: "percentage",
      discountPercentage: 20,
      discountAmount: 0,
      originalPrice: 600000,
      finalPrice: 480000,
      startDate: "2024-01-01T00:00:00.000Z",
      endDate: "2025-12-31T23:59:59.000Z",
      isActive: true,
      isFlashDeal: false,
      terms: "Valid for 90-minute traditional massage only. Booking required.",
      restrictions: ["Cannot be combined with other offers"]
    },
    {
      title: "BOGO Vietnamese Coffee",
      description: "Buy one authentic Vietnamese iced coffee and get the second one completely free.",
      dealType: "bogo",
      discountPercentage: 0,
      discountAmount: 0,
      originalPrice: 45000,
      finalPrice: 22500,
      startDate: "2024-01-01T00:00:00.000Z",
      endDate: "2025-06-30T23:59:59.000Z",
      isActive: true,
      isFlashDeal: false,
      terms: "Valid for Vietnamese iced coffee (ca phe sua da) only.",
      restrictions: ["Cheaper item is free"]
    }
  ],
  events: [
    {
      title: "Expat Networking Night",
      description: "Meet and connect with other expats and digital nomads living in Da Nang. A casual social event with great drinks and conversation.",
      date: "2024-11-28",
      time: "19:00:00",
      neighborhood: "Old Town, Hoi An",
      maxAttendees: 100,
      isActive: true,
      duration: "3 hours",
      address: "7 Bridges Brewing Co., 493 Đ. Trần Hưng Đạo, Đà Nẵng",
      eventType: "networking",
      price: 0,
      isFree: true
    },
    {
      title: "Hoi An Lantern Making Workshop",
      description: "Learn the traditional art of lantern making from local artisans. Create your own beautiful silk lantern to take home as a souvenir.",
      date: "2024-12-05",
      time: "15:00:00",
      neighborhood: "Old Town, Hoi An",
      maxAttendees: 15,
      isActive: true,
      duration: "2 hours",
      address: "Hoi An Handicraft Workshop, 9 Nguyễn Thái Học, Hội An",
      eventType: "workshop",
      price: 250000,
      isFree: false
    }
  ],
  users: [
    {
      userName: "linh_nguyen_v5",
      email: "linh.nguyen.v5@email.com",
      firstName: "Linh",
      lastName: "Nguyen",
      membershipTier: "vip",
      membershipStartDate: "2024-01-15",
      membershipRenewalDate: "2025-01-15",
      favoriteCategories: ["restaurant", "wellness", "beauty"],
      location: "Da Nang, Vietnam",
      notifications: { "email": true, "sms": false, "push": true }
    },
    {
      userName: "jsmith_expat_v5",
      email: "john.smith.v5@email.com",
      firstName: "John",
      lastName: "Smith",
      membershipTier: "premier",
      membershipStartDate: "2024-03-01",
      membershipRenewalDate: "2025-03-01",
      favoriteCategories: ["fitness", "restaurant", "entertainment"],
      location: "Da Nang, Vietnam",
      notifications: { "email": true, "sms": true, "push": true }
    }
  ]
};

async function seedTestData() {
  try {
    console.log('🌱 Starting to seed test data with FIXED schemas...');
    console.log(`🏢 Using existing business IDs: ${EXISTING_BUSINESS_IDS.join(', ')}`);
    
    // 1. Seed deals with existing business relationships
    await seedDeals();
    
    // 2. Seed events with existing business relationships (using basic Event schema)
    await seedEvents();
    
    // 3. Seed user profiles (with new unique names)
    await seedUserProfiles();
    
    console.log('🎉 All test data seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding test data:', error);
  }
}

async function seedDeals() {
  console.log('🎯 Seeding deals...');
  
  for (let i = 0; i < testData.deals.length; i++) {
    const deal = testData.deals[i];
    const businessId = EXISTING_BUSINESS_IDS[i % EXISTING_BUSINESS_IDS.length];
    
    try {
      const dealData = {
        ...deal,
        business: businessId
      };
      
      console.log(`📤 Creating deal "${deal.title}" for business ID: ${businessId}`);
      
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
        console.log(`✅ Created deal: ${deal.title} (ID: ${result.data.id})`);
      } else {
        const errorText = await response.text();
        console.error(`❌ Failed to create deal ${deal.title}:`, response.status, errorText);
      }
    } catch (error) {
      console.error(`❌ Error creating deal ${deal.title}:`, error);
    }
  }
}

async function seedEvents() {
  console.log('📅 Seeding events (using basic Event schema)...');
  
  for (let i = 0; i < testData.events.length; i++) {
    const event = testData.events[i];
    const businessId = EXISTING_BUSINESS_IDS[i % EXISTING_BUSINESS_IDS.length];
    
    try {
      // Use basic Event schema fields only
      const eventData = {
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        neighborhood: event.neighborhood,
        maxAttendees: event.maxAttendees,
        isActive: event.isActive
        // Note: business relationship field missing from basic Event schema
      };
      
      console.log(`📤 Creating event "${event.title}" for business ID: ${businessId}`);
      
      // Use the basic Event endpoint
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
        console.log(`✅ Created event: ${event.title} (ID: ${result.data.id})`);
      } else {
        const errorText = await response.text();
        console.error(`❌ Failed to create event ${event.title}:`, response.status, errorText);
      }
    } catch (error) {
      console.error(`❌ Error creating event ${event.title}:`, error);
    }
  }
}

async function seedUserProfiles() {
  console.log('👤 Seeding user profiles...');
  
  for (const user of testData.users) {
    try {
      console.log(`📤 Creating user profile: ${user.userName}`);
      
      const response = await fetch(`${API_BASE_URL}/user-profile-content-types`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: user })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Created user profile: ${user.userName} (ID: ${result.data.id})`);
      } else {
        const errorText = await response.text();
        console.error(`❌ Failed to create user profile ${user.userName}:`, response.status, errorText);
      }
    } catch (error) {
      console.error(`❌ Error creating user profile ${user.userName}:`, error);
    }
  }
}

// Run the fixed seeder
seedTestData();
