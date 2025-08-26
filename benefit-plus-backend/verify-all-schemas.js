const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = '132f00af63c54ad3e5340be792f73172a6936e7d071d29fe13056888f69ddf44e1b8d0cea7ef990b20b4cfdf9df72ce672f9c24d61ef03fb8b9f8910e118afbeb233ca84b86b7ab43c7a1f9654f884b1db25af1f288e33b7f2db167c40275228bf20c66bb5797ea997b29c5efc61c2cd7767399ec9d484b6a4a7b30fcdf149dd';

async function verifyAllSchemas() {
  console.log('🔍 COMPREHENSIVE SCHEMA VERIFICATION\n');
  
  try {
    // Check Business Content Type
    console.log('🏢 VERIFYING BUSINESS CONTENT TYPE...');
    const businessResponse = await fetch(`${API_BASE_URL}/businesses`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    
    if (businessResponse.ok) {
      const businesses = await businessResponse.json();
      if (businesses.data && businesses.data.length > 0) {
        console.log('✅ Business fields found:', Object.keys(businesses.data[0]));
        console.log('   - Has deals relationship:', 'deals' in businesses.data[0]);
        console.log('   - Has events relationship:', 'events' in businesses.data[0]);
        console.log('   - Has reviews relationship:', 'review_content_types' in businesses.data[0]);
      }
    }
    
    // Check Deal Content Type
    console.log('\n🎯 VERIFYING DEAL CONTENT TYPE...');
    const dealResponse = await fetch(`${API_BASE_URL}/deals`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    
    if (dealResponse.ok) {
      const deals = await dealResponse.json();
      if (deals.data && deals.data.length > 0) {
        console.log('✅ Deal fields found:', Object.keys(deals.data[0]));
        console.log('   - Has business relationship:', 'business' in deals.data[0]);
      }
    }
    
    // Check Event Content Type
    console.log('\n🎉 VERIFYING EVENT CONTENT TYPE...');
    const eventResponse = await fetch(`${API_BASE_URL}/events`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    
    if (eventResponse.ok) {
      const events = await eventResponse.json();
      if (events.data && events.data.length > 0) {
        console.log('✅ Event fields found:', Object.keys(events.data[0]));
        console.log('   - Has organizer relationship:', 'organizer' in events.data[0]);
      } else {
        console.log('⚠️  No events found - cannot verify schema');
      }
    }
    
    // Check Review Content Type
    console.log('\n⭐ VERIFYING REVIEW CONTENT TYPE...');
    const reviewResponse = await fetch(`${API_BASE_URL}/review-content-types`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    
    if (reviewResponse.ok) {
      const reviews = await reviewResponse.json();
      if (reviews.data && reviews.data.length > 0) {
        console.log('✅ Review fields found:', Object.keys(reviews.data[0]));
        console.log('   - Has business relationship:', 'business' in reviews.data[0]);
      } else {
        console.log('⚠️  No reviews found - cannot verify schema');
      }
    }
    
    // Check User Profile Content Type
    console.log('\n👤 VERIFYING USER PROFILE CONTENT TYPE...');
    const userResponse = await fetch(`${API_BASE_URL}/user-profile-content-types`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    
    if (userResponse.ok) {
      const users = await userResponse.json();
      if (users.data && users.data.length > 0) {
        console.log('✅ User Profile fields found:', Object.keys(users.data[0]));
      } else {
        console.log('⚠️  No user profiles found - cannot verify schema');
      }
    }
    
    console.log('\n🔍 SCHEMA VERIFICATION COMPLETE');
    
  } catch (error) {
    console.error('❌ Error during schema verification:', error);
  }
}

// Run the verification
verifyAllSchemas();
