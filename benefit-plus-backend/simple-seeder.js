const businesses = require('./src/seeds/businesses-seeder');

async function simpleSeeder() {
  try {
    console.log('🚀 Starting simple business seeder...');
    
    // Test API connection first
    console.log('🧪 Testing API connection...');
    try {
      const testResponse = await fetch('http://localhost:1337/api/businesses');
      console.log('✅ API is accessible');
    } catch (error) {
      console.error('❌ API not accessible:', error.message);
      console.log('💡 Please ensure Strapi is running on port 1337');
      return;
    }
    
    // Create businesses one by one
    let successCount = 0;
    
    for (const business of businesses) {
      try {
        console.log(`📝 Creating: ${business.name}`);
        
        const response = await fetch('http://localhost:1337/api/businesses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              name: business.name
            }
          })
        });
        
        if (response.ok) {
          successCount++;
          console.log(`✅ Created: ${business.name}`);
        } else {
          const error = await response.json();
          console.error(`❌ Failed: ${business.name} -`, error);
        }
        
        // Small delay
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`❌ Error creating ${business.name}:`, error.message);
      }
    }
    
    console.log(`🎉 Seeding completed! Successfully created ${successCount}/${businesses.length} businesses`);
    
  } catch (error) {
    console.error('❌ Seeder failed:', error);
  }
}

// Run the seeder
simpleSeeder();
