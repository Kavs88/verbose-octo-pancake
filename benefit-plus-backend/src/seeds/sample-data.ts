import seedBusinesses from './seed-businesses';

export default async function seedSampleData(strapi) {
  try {
    console.log('🌱 Seeding sample data...');
    
    // Seed businesses
    const businesses = await seedBusinesses(strapi);
    console.log(`✅ Created ${businesses.length} businesses`);
    
    // Create sample deals (placeholder for now)
    console.log('✅ Sample deals will be created through admin panel');
    
    // Create sample events (placeholder for now)
    console.log('✅ Sample events will be created through admin panel');
    
    console.log('🎉 Sample data seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding sample data:', error);
  }
}
