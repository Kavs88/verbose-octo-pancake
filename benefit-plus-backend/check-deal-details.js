const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = '132f00af63c54ad3e5340be792f73172a6936e7d071d29fe13056888f69ddf44e1b8d0cea7ef990b20b4cfdf9df72ce672f9c24d61ef03fb8b9f8910e118afbeb233ca84b86b7ab43c7a1f9654f884b1db25af1f288e33b7f2db167c40275228bf20c66bb5797ea997b29c5efc61c2cd7767399ec9d484b6a4a7b30fcdf149dd';

async function checkDealDetails() {
  console.log('🔍 Checking Deal Details...\n');

  try {
    const dealsResponse = await fetch(`${API_BASE_URL}/deals`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    
    if (dealsResponse.ok) {
      const deals = await dealsResponse.json();
      console.log(`✅ Found ${deals.data?.length || 0} deals\n`);
      
      if (deals.data && deals.data.length > 0) {
        const deal = deals.data[0];
        console.log('📊 Deal Structure:');
        console.log('   ID:', deal.id);
        console.log('   Title:', deal.title);
        console.log('   Description:', deal.description);
        console.log('   Final Price:', deal.finalPrice);
        console.log('   End Date:', deal.endDate);
        
        console.log('\n🏢 Business Data (Flattened):');
        console.log('   Business ID:', deal.businessId);
        console.log('   Business Name:', deal.businessName);
        console.log('   Business Category:', deal.businessCategory);
        console.log('   Business Neighborhood:', deal.businessNeighborhood);
        console.log('   Business Cover Photo:', deal.businessCoverPhoto);
        console.log('   Business Rating:', deal.businessRating);
        console.log('   Business Review Count:', deal.businessReviewCount);
        
        console.log('\n🔍 All Available Fields:');
        console.log(Object.keys(deal));
        
        console.log('\n❌ Nested Business Object:');
        console.log('   Has business object:', !!deal.business);
        if (deal.business) {
          console.log('   Business object keys:', Object.keys(deal.business));
        }
      }
    } else {
      console.log(`❌ Deals API: ${dealsResponse.status} ${dealsResponse.statusText}`);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  console.log('\n🎯 Deal Details Check Complete');
}

checkDealDetails();
