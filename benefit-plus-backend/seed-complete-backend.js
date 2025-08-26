const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = 'fd546d95b038b8807b529587af88f7d97d0d7aebde98ec64600bd3702ba57ebb6d61078fcb86505824b5ff61e3f18ebfdb0ab7c5d14c6f4bd7014cc849f2b8eff7350e386029a020e1f3cfe6cde2995d7f19ea2cb49f7f1ebf1285b7978100af0b1b0ff9b104d954539732efcd18f575ac98457b1ec48c66b41ac967ad24dcf6';

// Sample data for all content types
const sampleData = {
  businesses: [
    {
      name: "Olivia's Prime Steakhouse",
      slug: "olivias-prime-steakhouse",
      description: "An upscale dining experience specializing in high-quality imported steaks, fine wines, and classic cocktails.",
      category: "Restaurant",
      neighborhood: "Hai Chau",
      rating: 4.8,
      reviewCount: 750,
      isOpen: true,
      isPremium: true,
      latitude: 16.0752,
      longitude: 108.2232,
      address: "505 Đ. Trần Hưng Đạo, An Hải Trung, Sơn Trà, Đà Nẵng",
      phone: "+84 236 123 456",
      website: "https://oliviassteakhouse.com",
      openingHours: {
        monday: "5:00 PM - 11:00 PM",
        tuesday: "5:00 PM - 11:00 PM",
        wednesday: "5:00 PM - 11:00 PM",
        thursday: "5:00 PM - 11:00 PM",
        friday: "5:00 PM - 12:00 AM",
        saturday: "5:00 PM - 12:00 AM",
        sunday: "5:00 PM - 10:00 PM"
      },
      amenities: ["Fine Dining", "Air Conditioning", "Full Bar", "Reservations Recommended", "Wine Cellar"]
    },
    {
      name: "43 Factory Coffee Roaster",
      slug: "43-factory-coffee-roaster",
      description: "A specialty coffee roastery known for its minimalist, industrial design and commitment to high-quality, ethically sourced beans.",
      category: "Café",
      neighborhood: "Hai Chau",
      rating: 4.7,
      reviewCount: 1250,
      isOpen: true,
      isPremium: true,
      latitude: 16.0398,
      longitude: 108.2498,
      address: "Lô 422, Đ. Ngô Thì Sỹ, Bắc Mỹ An, Ngũ Hành Sơn, Đà Nẵng",
      phone: "+84 236 234 567",
      website: "https://43factory.com",
      openingHours: {
        monday: "7:00 AM - 10:00 PM",
        tuesday: "7:00 AM - 10:00 PM",
        wednesday: "7:00 AM - 10:00 PM",
        thursday: "7:00 AM - 10:00 PM",
        friday: "7:00 AM - 11:00 PM",
        saturday: "7:00 AM - 11:00 PM",
        sunday: "8:00 AM - 9:00 PM"
      },
      amenities: ["WiFi", "Air Conditioning", "Outdoor Seating", "Specialty Coffee", "Roasting Tours"]
    },
    {
      name: "The Craftsman Cocktail Bar",
      slug: "the-craftsman-cocktail-bar",
      description: "An intimate, speakeasy-style bar with a focus on handcrafted, artisanal cocktails.",
      category: "Restaurant",
      neighborhood: "Hai Chau",
      rating: 4.9,
      reviewCount: 420,
      isOpen: true,
      isPremium: false,
      latitude: 16.0688,
      longitude: 108.2205,
      address: "48 Phan Tứ, Bắc Mỹ Phú, Ngũ Hành Sơn, Đà Nẵng",
      phone: "+84 236 345 678",
      website: "https://craftsmanbar.com",
      openingHours: {
        monday: "6:00 PM - 2:00 AM",
        tuesday: "6:00 PM - 2:00 AM",
        wednesday: "6:00 PM - 2:00 AM",
        thursday: "6:00 PM - 2:00 AM",
        friday: "6:00 PM - 3:00 AM",
        saturday: "6:00 PM - 3:00 AM",
        sunday: "6:00 PM - 1:00 AM"
      },
      amenities: ["Craft Cocktails", "Air Conditioning", "Intimate Atmosphere", "Live Music", "Private Events"]
    }
  ],
  
  deals: [
    {
      title: "Steak & Wine Pairing",
      description: "Enjoy our signature steak with a perfectly paired glass of house wine",
      dealType: "fixed",
      discountAmount: 15.00,
      originalPrice: 45.00,
      finalPrice: 30.00,
      startDate: "2025-01-01",
      endDate: "2025-01-31",
      isActive: true,
      isFlashDeal: false,
      terms: "Valid for dinner only. Cannot be combined with other offers.",
      restrictions: ["Dinner only", "One per table", "Not valid on holidays"],
      business: 1
    },
    {
      title: "15% Off Specialty Coffee",
      description: "Get 15% off all our specialty pour-over coffees",
      dealType: "percentage",
      discountPercentage: 15,
      startDate: "2025-01-01",
      endDate: "2025-01-31",
      isActive: true,
      isFlashDeal: false,
      terms: "Valid on all specialty coffee drinks. Cannot be combined with other offers.",
      restrictions: ["Specialty coffee only", "One per customer per day"],
      business: 2
    },
    {
      title: "2-for-1 Cocktail of the Week",
      description: "Buy one cocktail, get the second one free",
      dealType: "bogo",
      startDate: "2025-01-01",
      endDate: "2025-01-31",
      isActive: true,
      isFlashDeal: true,
      terms: "Valid on selected cocktails only. Limited time offer.",
      restrictions: ["Selected cocktails only", "Valid until 9 PM"],
      business: 3
    }
  ],
  
  events: [
    {
      title: "Coffee Tasting Workshop",
      description: "Join us for an exclusive coffee tasting experience featuring our finest single-origin beans.",
      date: "2025-01-15",
      time: "14:00:00",
      duration: "2 hours",
      neighborhood: "Hai Chau",
      address: "43 Factory Coffee Roaster, Da Nang",
      maxAttendees: 20,
      isActive: true,
      eventType: "tasting",
      price: 25.00,
      isFree: false,
      business: 2
    },
    {
      title: "Steakhouse Wine Pairing",
      description: "An exclusive wine pairing dinner featuring premium cuts and carefully selected wines.",
      date: "2025-01-25",
      time: "19:00:00",
      duration: "3 hours",
      neighborhood: "Hai Chau",
      address: "Olivia's Prime Steakhouse, Da Nang",
      maxAttendees: 25,
      isActive: true,
      eventType: "workshop",
      price: 85.00,
      isFree: false,
      business: 1
    },
    {
      title: "Cocktail Masterclass",
      description: "Learn to craft artisanal cocktails from our expert mixologists.",
      date: "2025-01-28",
      time: "18:00:00",
      duration: "2.5 hours",
      neighborhood: "Hai Chau",
      address: "The Craftsman Cocktail Bar, Da Nang",
      maxAttendees: 12,
      isActive: true,
      eventType: "class",
      price: 45.00,
      isFree: false,
      business: 3
    }
  ],
  
  userProfiles: [
    {
      username: "sarah_traveler",
      email: "sarah@example.com",
      firstName: "Sarah",
      lastName: "Johnson",
      membershipTier: "premium",
      membershipStartDate: "2024-06-01",
      membershipRenewalDate: "2025-06-01",
      favoriteCategories: ["Café", "Restaurant", "Wellness"],
      location: "Da Nang",
      notifications: {
        email: true,
        push: true,
        deals: true,
        events: true
      }
    },
    {
      username: "mike_nomad",
      email: "mike@example.com",
      firstName: "Mike",
      lastName: "Chen",
      membershipTier: "basic",
      membershipStartDate: "2024-12-01",
      membershipRenewalDate: "2025-12-01",
      favoriteCategories: ["Co-working", "Café", "Events"],
      location: "Hoi An",
      notifications: {
        email: true,
        push: false,
        deals: true,
        events: false
      }
    }
  ],
  
  reviews: [
    {
      rating: 5,
      comment: "Best steak I've had in Vietnam! Impeccable service and atmosphere.",
      date: "2025-01-15",
      isVerified: true,
      categories: ["service", "food", "atmosphere"],
      business: 1,
      user: 1
    },
    {
      rating: 5,
      comment: "Absolutely world-class coffee. A must-visit for any coffee lover.",
      date: "2025-01-10",
      isVerified: true,
      categories: ["coffee", "atmosphere", "service"],
      business: 2,
      user: 1
    },
    {
      rating: 4,
      comment: "Incredible cocktails, probably the best in Da Nang. The bartenders are true artists.",
      date: "2025-01-08",
      isVerified: true,
      categories: ["drinks", "service", "atmosphere"],
      business: 3,
      user: 2
    }
  ]
};

async function seedCompleteBackend() {
  try {
    console.log('🚀 Starting COMPLETE backend seeding...');
    
    // Test API connection
    await testAPIConnection();
    
    // Seed in order (due to relationships)
    console.log('\n📊 Seeding Businesses...');
    const businessIds = await seedBusinesses();
    
    console.log('\n🎯 Seeding Deals...');
    await seedDeals(businessIds);
    
    console.log('\n📅 Seeding Events...');
    await seedEvents(businessIds);
    
    console.log('\n👤 Seeding User Profiles...');
    const userIds = await seedUserProfiles();
    
    console.log('\n⭐ Seeding Reviews...');
    await seedReviews(businessIds, userIds);
    
    console.log('\n🎉 COMPLETE backend seeding finished!');
    console.log('💡 Your Benefit+ platform is now fully populated and ready!');
    
  } catch (error) {
    console.error('❌ Complete seeding failed:', error);
  }
}

async function testAPIConnection() {
  try {
    const response = await fetch(`${API_BASE_URL}/businesses`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    if (!response.ok) throw new Error(`API not accessible: ${response.status}`);
    console.log('✅ API connection successful');
  } catch (error) {
    throw new Error(`API connection failed: ${error.message}`);
  }
}

async function seedBusinesses() {
  const businessIds = [];
  
  for (const business of sampleData.businesses) {
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
      
      await delay(100);
    } catch (error) {
      console.error(`❌ Error creating business ${business.name}:`, error.message);
    }
  }
  
  return businessIds;
}

async function seedDeals(businessIds) {
  for (const deal of sampleData.deals) {
    try {
      // Update business ID to match created business
      const dealData = { ...deal, business: businessIds[deal.business - 1] };
      
      const response = await fetch(`${API_BASE_URL}/deals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify({ data: dealData })
      });
      
      if (response.ok) {
        console.log(`✅ Created deal: ${deal.title}`);
      } else {
        console.error(`❌ Failed to create deal: ${deal.title}`);
      }
      
      await delay(100);
    } catch (error) {
      console.error(`❌ Error creating deal ${deal.title}:`, error.message);
    }
  }
}

async function seedEvents(businessIds) {
  for (const event of sampleData.events) {
    try {
      // Update business ID to match created business
      const eventData = { ...event, business: businessIds[event.business - 1] };
      
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify({ data: eventData })
      });
      
      if (response.ok) {
        console.log(`✅ Created event: ${event.title}`);
      } else {
        console.error(`❌ Failed to create event: ${event.title}`);
      }
      
      await delay(100);
    } catch (error) {
      console.error(`❌ Error creating event ${event.title}:`, error.message);
    }
  }
}

async function seedUserProfiles() {
  const userIds = [];
  
  for (const user of sampleData.userProfiles) {
    try {
      const response = await fetch(`${API_BASE_URL}/user-profiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify({ data: user })
      });
      
      if (response.ok) {
        const result = await response.json();
        userIds.push(result.data.id);
        console.log(`✅ Created user: ${user.username} (ID: ${result.data.id})`);
      } else {
        console.error(`❌ Failed to create user: ${user.username}`);
      }
      
      await delay(100);
    } catch (error) {
      console.error(`❌ Error creating user ${user.username}:`, error.message);
    }
  }
  
  return userIds;
}

async function seedReviews(businessIds, userIds) {
  for (const review of sampleData.reviews) {
    try {
      // Update IDs to match created entities
      const reviewData = {
        ...review,
        business: businessIds[review.business - 1],
        user: userIds[review.user - 1]
      };
      
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify({ data: reviewData })
      });
      
      if (response.ok) {
        console.log(`✅ Created review: ${review.comment.substring(0, 30)}...`);
      } else {
        console.error(`❌ Failed to create review`);
      }
      
      await delay(100);
    } catch (error) {
      console.error(`❌ Error creating review:`, error.message);
    }
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run the complete seeding
seedCompleteBackend();
