const businesses = require('./businesses-seeder');

async function seedBusinesses(strapi) {
  try {
    console.log('🌱 Seeding businesses...');
    
    const createdBusinesses = [];
    
    for (const businessData of businesses) {
      try {
        // Create the business with all required fields
        const business = await strapi.entityService.create('api::business.business', {
          data: {
            name: businessData.name,
            slug: businessData.slug,
            description: businessData.description,
            category: businessData.category,
            neighborhood: businessData.neighborhood,
            rating: businessData.rating,
            reviewCount: businessData.reviewCount,
            isOpen: businessData.isOpen,
            hasMemberDeal: businessData.hasMemberDeal,
            dealHighlight: businessData.dealHighlight,
            isFavorite: businessData.isFavorite,
            isPremium: businessData.isPremium,
            amenities: businessData.amenities,
            location: businessData.location,
            reviews: businessData.reviews,
            publishedAt: new Date()
          }
        });
        
        createdBusinesses.push(business);
        console.log(`✅ Created: ${businessData.name}`);
        
      } catch (error) {
        console.error(`❌ Error creating ${businessData.name}:`, error.message);
        // Log more details for debugging
        if (error.details) {
          console.error('Validation details:', error.details);
        }
      }
    }
    
    console.log(`🎉 Successfully created ${createdBusinesses.length} businesses!`);
    return createdBusinesses;
    
  } catch (error) {
    console.error('❌ Error seeding businesses:', error);
    throw error;
  }
}

module.exports = seedBusinesses;
