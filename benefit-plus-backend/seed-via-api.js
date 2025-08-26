const businesses = require('./src/seeds/businesses-seeder');

async function seedBusinesses() {
  try {
    console.log('🚀 Starting business seeder with COMPLETE schema...');
    console.log('🧪 Testing API connection...');
    
    // API token for authentication
    const API_TOKEN = 'fd546d95b038b8807b529587af88f7d97d0d7aebde98ec64600bd3702ba57ebb6d61078fcb86505824b5ff61e3f18ebfdb0ab7c5d14c6f4bd7014cc849f2b8eff7350e386029a020e1f3cfe6cde2995d7f19ea2cb49f7f1ebf1285b7978100af0b1b0ff9b104d954539732efcd18f575ac98457b1ec48c66b41ac967ad24dcf6';
    
    try {
      const testResponse = await fetch('http://localhost:1337/api/businesses', {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      console.log('✅ API is accessible');
    } catch (error) {
      console.error('❌ API not accessible:', error.message);
      console.log('💡 Please ensure Strapi is running on port 1337');
      return;
    }

    let successCount = 0;
    for (const business of businesses) {
      try {
        console.log(`📝 Creating: ${business.name}`);
        
        // Map the business data to match our COMPLETE Strapi schema
        const businessData = {
          data: {
            // Basic Information
            name: business.name,
            slug: business.slug,
            description: business.description,
            
            // Business Details
            category: business.category,
            neighborhood: business.neighborhood,
            rating: business.rating,
            reviewCount: business.reviewCount,
            isOpen: business.isOpen,
            hasMemberDeal: business.hasMemberDeal,
            dealHighlight: business.dealHighlight,
            isFavorite: business.isFavorite,
            isPremium: business.isPremium,
            
            // Location
            latitude: business.location.latitude,
            longitude: business.location.longitude,
            address: business.location.address,
            
            // Contact & Business Info
            phone: business.phone || "+84 236 123 456",
            website: business.website || `https://${business.slug}.com`,
            openingHours: business.openingHours || {
              monday: "9:00 AM - 10:00 PM",
              tuesday: "9:00 AM - 10:00 PM",
              wednesday: "9:00 AM - 10:00 PM",
              thursday: "9:00 AM - 10:00 PM",
              friday: "9:00 AM - 11:00 PM",
              saturday: "9:00 AM - 11:00 PM",
              sunday: "10:00 AM - 9:00 PM"
            },
            
            // Complex Data
            amenities: business.amenities || ["WiFi", "Air Conditioning", "Power Outlets"],
            reviews: business.reviews || [
              {
                rating: business.rating,
                comment: "Great place! Highly recommended.",
                date: new Date().toISOString().split('T')[0]
              }
            ]
            
            // Note: coverPhoto and photos will need to be uploaded separately via media API
            // For now, we'll use placeholder URLs from the seeder
          }
        };

        const response = await fetch('http://localhost:1337/api/businesses', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`
          },
          body: JSON.stringify(businessData)
        });

        if (response.ok) {
          successCount++;
          console.log(`✅ Created: ${business.name}`);
        } else {
          const error = await response.json();
          console.error(`❌ Failed: ${business.name} -`, error);
        }
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`❌ Error creating ${business.name}:`, error.message);
      }
    }
    
    console.log(`🎉 Seeding completed! Successfully created ${successCount}/${businesses.length} businesses`);
    console.log('💡 Next: Upload cover photos and create events to complete the backend!');
  } catch (error) {
    console.error('❌ Seeder failed:', error);
  }
}

seedBusinesses();
