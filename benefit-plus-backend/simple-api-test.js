const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = '132f00af63c54ad3e5340be792f73172a6936e7d071d29fe13056888f69ddf44e1b8d0cea7ef990b20b4cfdf9df72ce672f9c24d61ef03fb8b9f8910e118afbeb233ca84b86b7ab43c7a1f9654f884b1db25af1f288e33b7f2db167c40275228bf20c66bb5797ea997b29c5efc61c2cd7767399ec9d484b6a4a7b30fcdf149dd';

async function testBasicAPIs() {
  console.log('🧪 Testing Basic API Endpoints...\n');

  try {
    // Test basic deals endpoint
    console.log('🔍 Testing /deals endpoint...');
    const dealsResponse = await fetch(`${API_BASE_URL}/deals`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    
    if (dealsResponse.ok) {
      const deals = await dealsResponse.json();
      console.log(`✅ Deals API: ${dealsResponse.status} - Found ${deals.data?.length || 0} deals`);
      
      if (deals.data && deals.data.length > 0) {
        const firstDeal = deals.data[0];
        console.log(`   Sample deal: ${firstDeal.title || 'No title'}`);
        console.log(`   Has business: ${!!firstDeal.business}`);
        if (firstDeal.business) {
          console.log(`   Business ID: ${firstDeal.business.id}`);
        }
      }
    } else {
      console.log(`❌ Deals API: ${dealsResponse.status} ${dealsResponse.statusText}`);
    }

    console.log('');

    // Test basic events endpoint
    console.log('🔍 Testing /events endpoint...');
    const eventsResponse = await fetch(`${API_BASE_URL}/events`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    
    if (eventsResponse.ok) {
      const events = await eventsResponse.json();
      console.log(`✅ Events API: ${eventsResponse.status} - Found ${events.data?.length || 0} events`);
      
      if (events.data && events.data.length > 0) {
        const firstEvent = events.data[0];
        console.log(`   Sample event: ${firstEvent.title || 'No title'}`);
        console.log(`   Has organizer: ${!!firstEvent.organizer}`);
        if (firstEvent.organizer) {
          console.log(`   Organizer ID: ${firstEvent.organizer.id}`);
        }
      }
    } else {
      console.log(`❌ Events API: ${eventsResponse.status} ${eventsResponse.statusText}`);
    }

    console.log('');

    // Test custom endpoints
    console.log('🔍 Testing custom endpoints...');
    
    // Test flash deals
    const flashResponse = await fetch(`${API_BASE_URL}/deals/flash-deals`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    console.log(`   Flash Deals: ${flashResponse.status} ${flashResponse.statusText}`);
    
    // Test featured deals
    const featuredResponse = await fetch(`${API_BASE_URL}/deals/featured`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    console.log(`   Featured Deals: ${featuredResponse.status} ${featuredResponse.statusText}`);
    
    // Test upcoming events
    const upcomingResponse = await fetch(`${API_BASE_URL}/events/upcoming`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    console.log(`   Upcoming Events: ${upcomingResponse.status} ${upcomingResponse.statusText}`);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  console.log('\n🎯 Basic API Testing Complete');
}

testBasicAPIs();
