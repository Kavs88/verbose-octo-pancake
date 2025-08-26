const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = '132f00af63c54ad3e5340be792f73172a6936e7d071d29fe13056888f69ddf44e1b8d0cea7ef990b20b4cfdf9df72ce672f9c24d61ef03fb8b9f8910e118afbeb233ca84b86b7ab43c7a1f9654f884b1db25af1f288e33b7f2db167c40275228bf20c66bb5797ea997b29c5efc61c2cd7767399ec9d484b6a4a7b30fcdf149dd';

async function testFlattenedAPIs() {
  console.log('🧪 Testing Flattened API Structure...\n');

  try {
    // Test deals endpoint
    console.log('🔍 Testing /deals endpoint...');
    const dealsResponse = await fetch(`${API_BASE_URL}/deals`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    
    if (dealsResponse.ok) {
      const deals = await dealsResponse.json();
      console.log(`✅ Deals API: ${dealsResponse.status} - Found ${deals.data?.length || 0} deals`);
      
      if (deals.data && deals.data.length > 0) {
        const firstDeal = deals.data[0];
        console.log('\n📊 Sample Deal Structure:');
        console.log('   ID:', firstDeal.id);
        console.log('   Title:', firstDeal.title);
        console.log('   Business Name:', firstDeal.businessName);
        console.log('   Business Category:', firstDeal.businessCategory);
        console.log('   Business Cover Photo:', firstDeal.businessCoverPhoto);
        console.log('   Has nested business:', !!firstDeal.business);
        
        console.log('\n🔍 All Deal Fields:');
        console.log(Object.keys(firstDeal));
      }
    } else {
      console.log(`❌ Deals API: ${dealsResponse.status} ${dealsResponse.statusText}`);
    }

    console.log('');

    // Test events endpoint
    console.log('🔍 Testing /events endpoint...');
    const eventsResponse = await fetch(`${API_BASE_URL}/events`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    
    if (eventsResponse.ok) {
      const events = await eventsResponse.json();
      console.log(`✅ Events API: ${eventsResponse.status} - Found ${events.data?.length || 0} events`);
      
      if (events.data && events.data.length > 0) {
        const firstEvent = events.data[0];
        console.log('\n📊 Sample Event Structure:');
        console.log('   ID:', firstEvent.id);
        console.log('   Title:', firstEvent.title);
        console.log('   Organizer Name:', firstEvent.organizerName);
        console.log('   Organizer Category:', firstEvent.organizerCategory);
        console.log('   Organizer Cover Photo:', firstEvent.organizerCoverPhoto);
        console.log('   Has nested organizer:', !!firstEvent.organizer);
        
        console.log('\n🔍 All Event Fields:');
        console.log(Object.keys(firstEvent));
      }
    } else {
      console.log(`❌ Events API: ${eventsResponse.status} ${eventsResponse.statusText}`);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  console.log('\n🎯 Flattened API Testing Complete');
}

testFlattenedAPIs();
