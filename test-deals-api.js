const API_BASE_URL = 'http://localhost:1337/api';

async function testDealsAPI() {
  console.log('🔍 Testing Deals API Directly...\n');

  try {
    // Test the exact same call the deals page makes
    const response = await fetch(`${API_BASE_URL}/deals?populate[business]=true`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Deals API Response: ${data.data?.length || 0} deals found\n`);
      
      if (data.data && data.data.length > 0) {
        const deal = data.data[0];
        console.log('📊 First Deal Data:');
        console.log('   ID:', deal.id);
        console.log('   Title:', deal.title);
        console.log('   Description:', deal.description);
        console.log('   Business:', deal.business);
        console.log('   Image:', deal.image);
        
        console.log('\n🔍 All Deal Fields:');
        console.log(Object.keys(deal));
        
        if (deal.business) {
          console.log('\n🏢 Business Relation:');
          console.log('   Business ID:', deal.business.id);
          console.log('   Business Name:', deal.business.name);
          console.log('   Business Category:', deal.business.category);
        } else {
          console.log('\n❌ NO BUSINESS RELATION FOUND');
        }
        
        if (deal.image) {
          console.log('\n🖼️ Image Data:');
          console.log('   Image URL:', deal.image.url);
          console.log('   Image Type:', typeof deal.image);
        } else {
          console.log('\n❌ NO IMAGE FOUND');
        }
        
      } else {
        console.log('❌ No deals in data.data array');
      }
      
    } else {
      console.log(`❌ API Error: ${response.status} ${response.statusText}`);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  console.log('\n🎯 Deals API Test Complete');
}

testDealsAPI();
