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
    },
    {
      name: "Faifo Coffee",
      description: "A historic coffee shop in the heart of Hoi An's Ancient Town, famous for its rooftop view overlooking the iconic yellow buildings.",
      category: "restaurant",
      neighborhood: "Old Town, Hoi An",
      rating: 4.4,
      reviewCount: 3200,
      isOpen: true,
      hasMemberDeal: true,
      dealHighlight: "Buy One Get One Free on Vietnamese Iced Coffee",
      isPremium: false,
      latitude: 15.8773,
      longitude: 108.3262,
      address: "130 Trần Phú, Phường Minh An, Hội An, Quảng Nam",
      phone: "+84 235 3911 633",
      website: "https://faifocoffee.com",
      openingHours: { "monday": "7:00 AM - 9:30 PM", "tuesday": "7:00 AM - 9:30 PM", "wednesday": "7:00 AM - 9:30 PM", "thursday": "7:00 AM - 9:30 PM", "friday": "7:00 AM - 10:00 PM", "saturday": "7:00 AM - 10:00 PM", "sunday": "7:00 AM - 9:30 PM" },
      amenities: ["Rooftop View", "WiFi", "Historic Building"]
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
    },
    {
      title: "BOGO Vietnamese Coffee",
      description: "Buy one authentic Vietnamese iced coffee and get the second one completely free.",
      dealType: "bogo",
      discountPercentage: 0,
      discountAmount: 0,
      originalPrice: 45000,
      finalPrice: 22500,
      startDate: "2024-01-01",
      endDate: "2025-06-30",
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
      neighborhood: "Hai Chau, Da Nang",
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
      userName: "linh_nguyen",
      email: "linh.nguyen@email.com",
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
      userName: "jsmith_expat",
      email: "john.smith@email.com",
      firstName: "John",
      lastName: "Smith",
      membershipTier: "premier",
      membershipStartDate: "2024-03-01",
      membershipRenewalDate: "2025-03-01",
      favoriteCategories: ["fitness", "restaurant", "entertainment"],
      location: "Da Nang, Vietnam",
      notifications: { "email": true, "sms": true, "push": true }
    }
  ],
  reviews: [
    {
      rating: 5,
      comment: "Absolutely incredible steak and impeccable service. Worth every penny for a special occasion. A must-try for any VIP member.",
      date: "2024-11-15",
      isVerified: true,
      categories: ["service", "quality", "atmosphere"]
    },
    {
      rating: 4,
      comment: "The rooftop view is stunning, especially at sunset. The coffee is great, but it can get very crowded.",
      date: "2024-11-12",
      isVerified: true,
      categories: ["atmosphere", "quality"]
    }
  ]
};

async function seedTestData() {
  try {
    console.log('🌱 Starting to seed test data...');
    
    // 1. Seed businesses first
    const businessIds = await seedBusinesses();
    
    // 2. Seed deals with business relationships
    await seedDeals(businessIds);
    
    // 3. Seed events with business relationships
    await seedEvents(businessIds);
    
    // 4. Seed user profiles
    await seedUserProfiles();
    
    // 5. Seed reviews with business relationships
    await seedReviews(businessIds);
    
    console.log('🎉 All test data seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding test data:', error);
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
        console.log(`✅ Created business: ${business.name}`);
      } else {
        console.error(`❌ Failed to create business ${business.name}:`, response.status);
      }
    } catch (error) {
      console.error(`❌ Error creating business ${business.name}:`, error);
    }
  }
  
  return businessIds;
}

async function seedDeals(businessIds) {
  console.log('🎯 Seeding deals...');
  
  for (let i = 0; i < testData.deals.length; i++) {
    const deal = testData.deals[i];
    const businessId = businessIds[i % businessIds.length]; // Distribute deals across businesses
    
    try {
      const dealData = {
        ...deal,
        business: businessId
      };
      
      const response = await fetch(`${API_BASE_URL}/deals`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: dealData })
      });
      
      if (response.ok) {
        console.log(`✅ Created deal: ${deal.title}`);
      } else {
        console.error(`❌ Failed to create deal ${deal.title}:`, response.status);
      }
    } catch (error) {
      console.error(`❌ Error creating deal ${deal.title}:`, error);
    }
  }
}

async function seedEvents(businessIds) {
  console.log('📅 Seeding events...');
  
  for (let i = 0; i < testData.events.length; i++) {
    const event = testData.events[i];
    const businessId = businessIds[i % businessIds.length]; // Distribute events across businesses
    
    try {
      const eventData = {
        ...event,
        organizer: businessId
      };
      
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: eventData })
      });
      
      if (response.ok) {
        console.log(`✅ Created event: ${event.title}`);
      } else {
        console.error(`❌ Failed to create event ${event.title}:`, response.status);
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
      const response = await fetch(`${API_BASE_URL}/user-profile-content-types`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: user })
      });
      
      if (response.ok) {
        console.log(`✅ Created user profile: ${user.userName}`);
      } else {
        console.error(`❌ Failed to create user profile ${user.userName}:`, response.status);
      }
    } catch (error) {
      console.error(`❌ Error creating user profile ${user.userName}:`, error);
    }
  }
}

async function seedReviews(businessIds) {
  console.log('⭐ Seeding reviews...');
  
  for (let i = 0; i < testData.reviews.length; i++) {
    const review = testData.reviews[i];
    const businessId = businessIds[i % businessIds.length]; // Distribute reviews across businesses
    
    try {
      const reviewData = {
        ...review,
        business: businessId
      };
      
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: reviewData })
      });
      
      if (response.ok) {
        console.log(`✅ Created review with rating: ${review.rating}`);
      } else {
        console.error(`❌ Failed to create review:`, response.status);
      }
    } catch (error) {
      console.error(`❌ Error creating review:`, error);
    }
  }
}

// Run the seeder
seedTestData();
