const API_BASE_URL = 'http://localhost:1337/api';

async function testDealsFixed() {
  console.log('🔍 Testing Deals API with Fixed Population...\n');

  try {
    // Test with the corrected population syntax
    const response = await fetch(`${API_BASE_URL}/deals?populate[business]=true&populate[image]=true&populate[business][populate][coverPhoto]=true`);
    
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
        
        if (deal.business) {
          console.log('\n🏢 Business Relation FOUND:');
          console.log('   Business ID:', deal.business.id);
          console.log('   Business Name:', deal.business.name);
          console.log('   Business Category:', deal.business.category);
          console.log('   Business Cover Photo:', deal.business.coverPhoto);
        } else {
          console.log('\n❌ STILL NO BUSINESS RELATION');
        }
        
        if (deal.image) {
          console.log('\n🖼️ Image Data FOUND:');
          console.log('   Image URL:', deal.image.url);
          console.log('   Image Type:', typeof deal.image);
        } else {
          console.log('\n❌ STILL NO IMAGE');
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

  console.log('\n🎯 Deals Fixed Test Complete');
}

testDealsFixed();
