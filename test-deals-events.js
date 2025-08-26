const API_BASE_URL = 'http://localhost:1337/api';

async function testDealsAndEvents() {
  console.log('🔍 Testing Deals and Events Availability...\n');

  try {
    // Test Deals
    console.log('🎯 TESTING DEALS:');
    const dealsResponse = await fetch(`${API_BASE_URL}/deals?populate=*`);
    if (dealsResponse.ok) {
      const deals = await dealsResponse.json();
      console.log(`   ✅ Found ${deals.data?.length || 0} deals`);
      
      if (deals.data && deals.data.length > 0) {
        const deal = deals.data[0];
        console.log('   📊 First Deal Structure:');
        console.log('     ID:', deal.id);
        console.log('     Title:', deal.title);
        console.log('     Description:', deal.description);
        console.log('     Business:', deal.business?.name || 'No business');
        console.log('     Image:', deal.image?.url || 'No image');
      } else {
        console.log('   ❌ NO DEALS FOUND');
      }
    } else {
      console.log(`   ❌ Deals API Error: ${dealsResponse.status}`);
    }

    console.log('\n📅 TESTING EVENTS:');
    const eventsResponse = await fetch(`${API_BASE_URL}/events?populate=*`);
    if (eventsResponse.ok) {
      const events = await eventsResponse.json();
      console.log(`   ✅ Found ${events.data?.length || 0} events`);
      
      if (events.data && events.data.length > 0) {
        const event = events.data[0];
        console.log('   📊 First Event Structure:');
        console.log('     ID:', event.id);
        console.log('     Title:', event.title);
        console.log('     Description:', event.description);
        console.log('     Organizer:', event.organizer?.name || 'No organizer');
        console.log('     Date:', event.date);
        console.log('     Time:', event.time);
      } else {
        console.log('   ❌ NO EVENTS FOUND');
      }
    } else {
      console.log(`   ❌ Events API Error: ${eventsResponse.status}`);
    }

    console.log('\n🏢 TESTING BUSINESS WITH RELATIONS:');
    const businessResponse = await fetch(`${API_BASE_URL}/businesses/80?populate[deals]=true&populate[events]=true&populate[reviews]=true`);
    if (businessResponse.ok) {
      const business = await businessResponse.json();
      console.log('   ✅ Business API Response:');
      console.log('     Name:', business.name);
      console.log('     Has Deals:', !!business.deals);
      console.log('     Deals Count:', business.deals?.length || 0);
      console.log('     Has Events:', !!business.events);
      console.log('     Events Count:', business.events?.length || 0);
      console.log('     Has Reviews:', !!business.reviews);
      console.log('     Reviews Count:', business.reviews?.length || 0);
      
      if (business.deals && business.deals.length > 0) {
        console.log('   📊 First Deal:');
        console.log('     Title:', business.deals[0].title);
        console.log('     Description:', business.deals[0].description);
      }
      
      if (business.events && business.events.length > 0) {
        console.log('   📅 First Event:');
        console.log('     Title:', business.events[0].title);
        console.log('     Date:', business.events[0].date);
      }
    } else {
      console.log(`   ❌ Business API Error: ${businessResponse.status}`);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  console.log('\n🎯 Deals and Events Test Complete');
}

testDealsAndEvents();
