const API_BASE_URL = 'http://localhost:1337/api';

async function quickDealsTest() {
  console.log('🔍 Quick Deals Test...\n');

  try {
    const response = await fetch(`${API_BASE_URL}/deals?populate[business]=true&populate[image]=true`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('📊 Raw API Response:');
      console.log('   Status:', response.status);
      console.log('   Has data property:', !!data.data);
      console.log('   Data type:', typeof data.data);
      console.log('   Data length:', data.data?.length || 'undefined');
      
      if (data.data && Array.isArray(data.data)) {
        console.log('\n✅ Data is array with length:', data.data.length);
        
        data.data.forEach((deal, index) => {
          console.log(`\n🎯 Deal ${index + 1}:`);
          console.log('   ID:', deal.id);
          console.log('   Title:', deal.title);
          console.log('   Description:', deal.description);
          console.log('   Business:', deal.business ? 'EXISTS' : 'MISSING');
          console.log('   Image:', deal.image ? 'EXISTS' : 'MISSING');
        });
        
      } else {
        console.log('\n❌ Data is not an array or missing');
        console.log('   Data value:', data.data);
      }
      
    } else {
      console.log(`❌ API Error: ${response.status} ${response.statusText}`);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  console.log('\n🎯 Quick Test Complete');
}

quickDealsTest();
