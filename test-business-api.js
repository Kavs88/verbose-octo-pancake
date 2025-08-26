const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = '132f00af63c54ad3e5340be792f73172a6936e7d071d29fe13056888f69ddf44e1b8d0cea7ef990b20b4cfdf9df72ce672f9c24d61ef03fb8b9f8910e118afbeb233ca84b86b7ab43c7a1f9654f884b1db25af1f288e33b7f2db167c40275228bf20c66bb5797ea997b29c5efc61c2cd7767399ec9d484b6a4a7b30fcdf149dd';

async function testBusinessAPI() {
  console.log('🧪 Testing Business API with populate=*...\n');

  try {
    // Test with populate=*
    console.log('🔍 Testing /businesses?populate=*...');
    const response = await fetch(`${API_BASE_URL}/businesses?populate=*`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Business API: ${response.status} - Found ${data.data?.length || 0} businesses\n`);
      
      if (data.data && data.data.length > 0) {
        const business = data.data[0];
        console.log('📊 First Business Structure:');
        console.log('   ID:', business.id);
        console.log('   Type:', typeof business);
        console.log('   Keys:', Object.keys(business));
        
        if (business.attributes) {
          console.log('\n🔍 Business Attributes:');
          console.log('   Name:', business.attributes.name);
          console.log('   Category:', business.attributes.category);
          console.log('   Neighborhood:', business.attributes.neighborhood);
          console.log('   Rating:', business.attributes.rating);
          console.log('   Cover Photo:', business.attributes.coverPhoto);
          
          if (business.attributes.coverPhoto) {
            console.log('   Cover Photo Type:', typeof business.attributes.coverPhoto);
            console.log('   Cover Photo Keys:', Object.keys(business.attributes.coverPhoto));
            
            if (business.attributes.coverPhoto.data) {
              console.log('   Cover Photo Data:', business.attributes.coverPhoto.data);
              if (business.attributes.coverPhoto.data.attributes) {
                console.log('   Cover Photo URL:', business.attributes.coverPhoto.data.attributes.url);
              }
            }
          }
        } else {
          console.log('❌ No attributes found - this is the problem!');
        }
        
        console.log('\n🔍 Raw Business Object:');
        console.log(JSON.stringify(business, null, 2));
      }
    } else {
      console.log(`❌ Business API: ${response.status} ${response.statusText}`);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  console.log('\n🎯 Business API Testing Complete');
}

testBusinessAPI();
