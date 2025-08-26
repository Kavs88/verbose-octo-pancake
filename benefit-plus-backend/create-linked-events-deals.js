const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = '132f00af63c54ad3e5340be792f73172a6936e7d071d29fe13056888f69ddf44e1b8d0cea7ef990b20b4cfdf9df72ce672f9c24d61ef03fb8b9f8910e118afbeb233ca84b86b7ab43c7a1f9654f884b1db25af1f288e33b7f2db167c40275228bf20c66bb5797ea997b29c5efc61c2cd7767399ec9d484b6a4a7b30fcdf149dd';

// Add console.log for debugging
console.log('🔧 Script starting...');

async function createLinkedData() {
  console.log('🚀 Creating events and deals linked to existing businesses...');

  try {
    // First, get existing businesses to link to
    console.log('📋 Fetching existing businesses...');
    console.log('🔍 Making request to:', `${API_BASE_URL}/businesses`);

    const businessResponse = await fetch(`${API_BASE_URL}/businesses`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });

    if (!businessResponse.ok) {
      throw new Error(`Failed to fetch businesses: ${businessResponse.status}`);
    }

    const businesses = await businessResponse.json();
    console.log(`✅ Found ${businesses.data.length} businesses`);

    if (businesses.data.length === 0) {
      console.log('❌ No businesses found. Please create businesses first.');
      return;
    }

    // Get first 3 businesses to link events and deals to
    const targetBusinesses = businesses.data.slice(0, 3);

    // Create events linked to businesses
    console.log('\n🎉 Creating events...');
    console.log('🔍 Target businesses:', targetBusinesses.map(b => ({ id: b.id, name: b.attributes?.name })));

    const events = [
      {
        title: "Coffee Tasting Workshop",
        description: "Learn about different coffee beans and brewing methods from our expert baristas. Perfect for coffee enthusiasts and beginners alike.",
        date: "2024-02-15",
        time: "14:00:00",
        neighborhood: targetBusinesses[0].attributes?.neighborhood || "Hai Chau",
        maxAttendees: 20,
        isActive: true,
        organizer: targetBusinesses[0].id
      },
      {
        title: "Sunset Beach Yoga",
        description: "Relaxing yoga session on the beach during golden hour. All levels welcome, mats provided.",
        date: "2024-02-20",
        time: "17:30:00",
        neighborhood: targetBusinesses[1].attributes?.neighborhood || "My Khe",
        maxAttendees: 30,
        isActive: true,
        organizer: targetBusinesses[1].id
      },
      {
        title: "Vietnamese Cooking Class",
        description: "Learn to cook traditional Vietnamese dishes. Visit the local market, then cook and enjoy your creations.",
        date: "2024-02-25",
        time: "10:00:00",
        neighborhood: targetBusinesses[2].attributes?.neighborhood || "Han Market",
        maxAttendees: 12,
        isActive: true,
        organizer: targetBusinesses[2].id
      }
    ];

    for (const event of events) {
      try {
        const response = await fetch(`${API_BASE_URL}/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`
          },
          body: JSON.stringify({ data: event })
        });

        if (response.ok) {
          const createdEvent = await response.json();
          console.log(`✅ Created event: ${event.title} (ID: ${createdEvent.data.id})`);
        } else {
          const errorText = await response.text();
          console.log(`❌ Failed to create event: ${event.title} - Status: ${response.status}, Error: ${errorText}`);
        }
      } catch (error) {
        console.error(`❌ Error creating event ${event.title}:`, error);
      }
    }

    // Create deals linked to businesses - FIXED FIELD NAMES TO MATCH SCHEMA
    console.log('\n🎯 Creating deals...');
    const deals = [
      {
        title: "20% OFF All Beverages",
        description: "Get 20% off all coffee, tea, and specialty drinks",
        discountPercentage: 20,
        originalPrice: 50000,
        finalPrice: 40000,  // FIXED: was discountedPrice
        startDate: "2024-02-01T00:00:00.000Z",  // FIXED: was validFrom
        endDate: "2024-02-28T23:59:59.000Z",    // FIXED: was validUntil
        isActive: true,
        isFeatured: true,
        isFlashDeal: false,
        business: targetBusinesses[0].id
      },
      {
        title: "Free First Session",
        description: "New members get their first yoga session completely free",
        discountPercentage: 100,
        originalPrice: 200000,
        finalPrice: 0,  // FIXED: was discountedPrice
        startDate: "2024-02-01T00:00:00.000Z",  // FIXED: was validFrom
        endDate: "2024-02-29T23:59:59.000Z",    // FIXED: was validUntil
        isActive: true,
        isFeatured: false,
        isFlashDeal: false,
        business: targetBusinesses[1].id
      },
      {
        title: "50% Off Cooking Class",
        description: "Half-price cooking class for Benefit+ members",
        discountPercentage: 50,
        originalPrice: 400000,
        finalPrice: 200000,  // FIXED: was discountedPrice
        startDate: "2024-02-01T00:00:00.000Z",  // FIXED: was validFrom
        endDate: "2024-02-25T23:59:59.000Z",    // FIXED: was validUntil
        isActive: true,
        isFeatured: true,
        isFlashDeal: false,
        business: targetBusinesses[2].id
      }
    ];

    for (const deal of deals) {
      try {
        const response = await fetch(`${API_BASE_URL}/deals`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`
          },
          body: JSON.stringify({ data: deal })
        });

        if (response.ok) {
          const createdDeal = await response.json();
          console.log(`✅ Created deal: ${deal.title} (ID: ${createdDeal.data.id})`);
        } else {
          const errorText = await response.text();
          console.log(`❌ Failed to create deal: ${deal.title} - Status: ${response.status}, Error: ${errorText}`);
        }
      } catch (error) {
        console.error(`❌ Error creating deal ${deal.title}:`, error);
      }
    }

    console.log('\n🎉 Linked data creation completed!');
    console.log('📊 Summary:');
    console.log(`   - Events created: ${events.length}`);
    console.log(`   - Deals created: ${deals.length}`);
    console.log(`   - Linked to businesses: ${targetBusinesses.length}`);

  } catch (error) {
    console.error('❌ Error creating linked data:', error);
  }
}

// Run the seeder
createLinkedData();
