const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = '132f00af63c54ad3e5340be792f73172a6936e7d071d29fe13056888f69ddf44e1b8d0cea7ef990b20b4cfdf9df72ce672f9c24d61ef03fb8b9f8910e118afbeb233ca84b86b7ab43c7a1f9654f884b1db25af1f288e33b7f2db167c40275228bf20c66bb5797ea997b29c5efc61c2cd7767399ec9d484b6a4a7b30fcdf149dd';

// Complete fresh dataset
const freshData = {
  businesses: [
    {
      name: "Olivia's Prime Steakhouse",
      category: "Restaurant",
      neighborhood: "Hai Chau",
      rating: 4.8,
      reviewCount: 127,
      isOpen: true,
      hasMemberDeal: true,
      dealHighlight: "20% off premium steaks for members",
      isPremium: true,
      description: "Premium steakhouse offering the finest cuts of meat in an elegant atmosphere",
      slug: "olivias-prime-steakhouse",
      latitude: 16.0475,
      longitude: 108.2062,
      address: "123 Bach Dang Street, Hai Chau District, Da Nang",
      phone: "+84 236 123 4567",
      website: "https://oliviassteakhouse.com",
      openingHours: {
        "monday": "17:00-22:00",
        "tuesday": "17:00-22:00",
        "wednesday": "17:00-22:00",
        "thursday": "17:00-22:00",
        "friday": "17:00-23:00",
        "saturday": "17:00-23:00",
        "sunday": "17:00-22:00"
      },
      amenities: ["valet parking", "private dining", "wine cellar", "outdoor seating"]
    },
    {
      name: "43 Factory Coffee Roaster",
      category: "Café",
      neighborhood: "Hai Chau",
      rating: 4.6,
      reviewCount: 89,
      isOpen: true,
      hasMemberDeal: true,
      dealHighlight: "BOGO on specialty coffees",
      isPremium: false,
      description: "Artisanal coffee roaster with single-origin beans and expert baristas",
      slug: "43-factory-coffee-roaster",
      latitude: 16.0480,
      longitude: 108.2070,
      address: "43 Bach Dang Street, Hai Chau District, Da Nang",
      phone: "+84 236 987 6543",
      website: "https://43factory.com",
      openingHours: {
        "monday": "07:00-18:00",
        "tuesday": "07:00-18:00",
        "wednesday": "07:00-18:00",
        "thursday": "07:00-18:00",
        "friday": "07:00-19:00",
        "saturday": "07:00-19:00",
        "sunday": "07:00-18:00"
      },
      amenities: ["free wifi", "outdoor seating", "coffee beans for sale", "pastries"]
    },
    {
      name: "The Craftsman Cocktail Bar",
      category: "Restaurant",
      neighborhood: "Hai Chau",
      rating: 4.7,
      reviewCount: 156,
      isOpen: true,
      hasMemberDeal: true,
      dealHighlight: "Happy hour 2-for-1 cocktails",
      isPremium: true,
      description: "Craft cocktail bar with innovative drinks and premium spirits",
      slug: "craftsman-cocktail-bar",
      latitude: 16.0478,
      longitude: 108.2065,
      address: "456 Tran Hung Dao Street, Hai Chau District, Da Nang",
      phone: "+84 236 555 1234",
      website: "https://craftsmanbar.com",
      openingHours: {
        "monday": "18:00-02:00",
        "tuesday": "18:00-02:00",
        "wednesday": "18:00-02:00",
        "thursday": "18:00-02:00",
        "friday": "18:00-03:00",
        "saturday": "18:00-03:00",
        "sunday": "18:00-02:00"
      },
      amenities: ["live music", "rooftop terrace", "private events", "craft beer selection"]
    }
  ],
  deals: [
    {
      title: "20% Off Premium Steaks",
      description: "Members get 20% off all premium steak cuts",
      dealType: "percentage",
      discountPercentage: 20,
      discountAmount: 0,
      originalPrice: 800000,
      finalPrice: 640000,
      startDate: "2024-01-01T00:00:00.000Z",
      endDate: "2025-12-31T23:59:59.000Z",
      isActive: true,
      isFlashDeal: false,
      terms: "Valid for premium steak cuts only. Member discount applied at checkout.",
      restrictions: ["Cannot be combined with other offers", "Valid for members only"]
    },
    {
      title: "BOGO Vietnamese Coffee",
      description: "Buy one Vietnamese coffee, get one free",
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
      restrictions: ["Cheaper item is free", "Valid for members only"]
    },
    {
      title: "Happy Hour 2-for-1 Cocktails",
      description: "Two cocktails for the price of one during happy hour",
      dealType: "bogo",
      discountPercentage: 0,
      discountAmount: 0,
      originalPrice: 180000,
      finalPrice: 90000,
      startDate: "2024-01-01T00:00:00.000Z",
      endDate: "2025-12-31T23:59:59.000Z",
      isActive: true,
      isFlashDeal: false,
      terms: "Happy hour: 5-7 PM daily. Valid for house cocktails only.",
      restrictions: ["Happy hour only", "House cocktails only", "Valid for members only"]
    }
  ],
  events: [
    {
      title: "Wine Tasting Evening",
      description: "Join us for an evening of premium wine tasting with expert sommeliers",
      date: "2024-12-15",
      time: "19:00:00",
      neighborhood: "Hai Chau",
      maxAttendees: 25,
      isActive: true
    },
    {
      title: "Coffee Brewing Workshop",
      description: "Learn the art of pour-over coffee brewing from our expert baristas",
      date: "2024-12-20",
      time: "14:00:00",
      neighborhood: "Hai Chau",
      maxAttendees: 15,
      isActive: true
    },
    {
      title: "Cocktail Masterclass",
      description: "Master the art of crafting perfect cocktails with our expert mixologists",
      date: "2024-12-25",
      time: "18:00:00",
      neighborhood: "Hai Chau",
      maxAttendees: 20,
      isActive: true
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
      userName: "john_smith",
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
      comment: "Amazing steaks and excellent service! The member discount made it even better.",
      date: "2024-11-20",
      isVerified: true,
      categories: ["food", "service", "ambiance"]
    },
    {
      rating: 4,
      comment: "Great coffee and atmosphere. Perfect place to work or relax.",
      date: "2024-11-18",
      isVerified: true,
      categories: ["coffee", "atmosphere", "wifi"]
    },
    {
      rating: 5,
      comment: "Incredible cocktails! The happy hour deal is unbeatable.",
      date: "2024-11-22",
      isVerified: true,
      categories: ["drinks", "atmosphere", "service"]
    }
  ]
};

async function clearAllData() {
  console.log('🗑️  Clearing all existing data...');
  
  try {
    // Clear deals
    const dealsResponse = await fetch(`${API_BASE_URL}/deals`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    if (dealsResponse.ok) {
      const deals = await dealsResponse.json();
      for (const deal of deals.data || []) {
        await fetch(`${API_BASE_URL}/deals/${deal.id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${API_TOKEN}` }
        });
      }
      console.log('✅ Deals cleared');
    }

    // Clear events
    const eventsResponse = await fetch(`${API_BASE_URL}/events`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    if (eventsResponse.ok) {
      const events = await eventsResponse.json();
      for (const event of events.data || []) {
        await fetch(`${API_BASE_URL}/events/${event.id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${API_TOKEN}` }
        });
      }
      console.log('✅ Events cleared');
    }

    // Clear reviews
    const reviewsResponse = await fetch(`${API_BASE_URL}/review-content-types`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    if (reviewsResponse.ok) {
      const reviews = await reviewsResponse.json();
      for (const review of reviews.data || []) {
        await fetch(`${API_BASE_URL}/review-content-types/${review.id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${API_TOKEN}` }
        });
      }
      console.log('✅ Reviews cleared');
    }

    // Clear user profiles
    const usersResponse = await fetch(`${API_BASE_URL}/user-profile-content-types`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    if (usersResponse.ok) {
      const users = await usersResponse.json();
      for (const user of users.data || []) {
        await fetch(`${API_BASE_URL}/user-profile-content-types/${user.id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${API_TOKEN}` }
        });
      }
      console.log('✅ User profiles cleared');
    }

    // Clear businesses
    const businessesResponse = await fetch(`${API_BASE_URL}/businesses`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    if (businessesResponse.ok) {
      const businesses = await businessesResponse.json();
      for (const business of businesses.data || []) {
        await fetch(`${API_BASE_URL}/businesses/${business.id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${API_TOKEN}` }
        });
      }
      console.log('✅ Businesses cleared');
    }

    console.log('🎉 All data cleared successfully!');
  } catch (error) {
    console.error('❌ Error clearing data:', error);
  }
}

async function createBusinesses() {
  console.log('🏢 Creating businesses...');
  const businessIds = [];
  
  for (const business of freshData.businesses) {
    try {
      const response = await fetch(`${API_BASE_URL}/businesses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify({ data: business })
      });
      
      if (response.ok) {
        const result = await response.json();
        businessIds.push(result.data.id);
        console.log(`✅ Created business: ${business.name} (ID: ${result.data.id})`);
      } else {
        console.error(`❌ Failed to create business: ${business.name}`);
      }
    } catch (error) {
      console.error(`❌ Error creating business ${business.name}:`, error);
    }
  }
  
  return businessIds;
}

async function createDeals(businessIds) {
  console.log('🎯 Creating deals...');
  
  for (let i = 0; i < freshData.deals.length; i++) {
    const deal = freshData.deals[i];
    const businessId = businessIds[i % businessIds.length]; // Distribute deals across businesses
    
    try {
      const dealData = { ...deal, business: businessId };
      const response = await fetch(`${API_BASE_URL}/deals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify({ data: dealData })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Created deal: ${deal.title} (ID: ${result.data.id})`);
      } else {
        console.error(`❌ Failed to create deal: ${deal.title}`);
      }
    } catch (error) {
      console.error(`❌ Error creating deal ${deal.title}:`, error);
    }
  }
}

async function createEvents(businessIds) {
  console.log('🎉 Creating events...');
  
  for (let i = 0; i < freshData.events.length; i++) {
    const event = freshData.events[i];
    const businessId = businessIds[i % businessIds.length]; // Distribute events across businesses
    
    try {
      const eventData = { ...event, organizer: businessId };
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify({ data: eventData })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Created event: ${event.title} (ID: ${result.data.id})`);
      } else {
        console.error(`❌ Failed to create event: ${event.title}`);
      }
    } catch (error) {
      console.error(`❌ Error creating event ${event.title}:`, error);
    }
  }
}

async function createUserProfiles() {
  console.log('👤 Creating user profiles...');
  
  for (const user of freshData.users) {
    try {
      const response = await fetch(`${API_BASE_URL}/user-profile-content-types`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify({ data: user })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Created user profile: ${user.userName} (ID: ${result.data.id})`);
      } else {
        console.error(`❌ Failed to create user profile: ${user.userName}`);
      }
    } catch (error) {
      console.error(`❌ Error creating user profile ${user.userName}:`, error);
    }
  }
}

async function createReviews(businessIds) {
  console.log('⭐ Creating reviews...');
  
  for (let i = 0; i < freshData.reviews.length; i++) {
    const review = freshData.reviews[i];
    const businessId = businessIds[i % businessIds.length]; // Distribute reviews across businesses
    
    try {
      const reviewData = { ...review, business: businessId };
      const response = await fetch(`${API_BASE_URL}/review-content-types`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify({ data: reviewData })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Created review: ${review.rating} stars (ID: ${result.data.id})`);
      } else {
        console.error(`❌ Failed to create review: ${review.rating} stars`);
      }
    } catch (response) {
      console.error(`❌ Error creating review: ${review.rating} stars`);
    }
  }
}

async function seedFreshData() {
  try {
    console.log('🚀 Starting fresh data seeding...');
    
    // Step 1: Clear all existing data
    await clearAllData();
    
    // Step 2: Create businesses first
    const businessIds = await createBusinesses();
    
    if (businessIds.length === 0) {
      console.error('❌ No businesses created. Cannot proceed.');
      return;
    }
    
    // Step 3: Create related data
    await createDeals(businessIds);
    await createEvents(businessIds);
    await createUserProfiles();
    await createReviews(businessIds);
    
    console.log('🎉 Fresh data seeding completed successfully!');
    console.log(`📊 Created: ${businessIds.length} businesses, deals, events, user profiles, and reviews`);
    
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  }
}

// Run the seeder
seedFreshData();
