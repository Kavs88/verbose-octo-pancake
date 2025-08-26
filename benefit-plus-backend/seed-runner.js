const seedBusinesses = require('./src/seeds/seed-businesses');

// Seeder runner that connects to running Strapi instance
async function runSeeder() {
  try {
    console.log('🚀 Starting business seeder...');
    
    // Wait for Strapi to be ready
    console.log('⏳ Waiting for Strapi to be ready...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Try to connect to Strapi
    try {
      const response = await fetch('http://localhost:1337/api/businesses');
      if (response.ok) {
        console.log('✅ Strapi is running and accessible');
      }
    } catch (error) {
      console.log('⚠️  Strapi might not be running yet. Please ensure Strapi is started with: npm run develop');
      return;
    }
    
    // For now, just log the businesses that would be created
    console.log('📋 Businesses ready to be seeded:');
    const businesses = require('./src/seeds/businesses-seeder');
    businesses.forEach((business, index) => {
      console.log(`${index + 1}. ${business.name} - ${business.category}`);
    });
    
    console.log('\n💡 To seed the data:');
    console.log('1. Ensure Strapi is running: npm run develop');
    console.log('2. Go to Strapi Admin: http://localhost:1337/admin');
    console.log('3. Create businesses manually or use the API endpoints');
    console.log('4. Test API: curl http://localhost:1337/api/businesses');
    
  } catch (error) {
    console.error('❌ Seeder failed:', error);
  }
}

// Run the seeder
runSeeder();
