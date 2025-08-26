const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = '132f00af63c54ad3e5340be792f73172a6936e7d071d29fe13056888f69ddf44e1b8d0cea7ef990b20b4cfdf9df72ce672f9c24d61ef03fb8b9f8910e118afbeb233ca84b86b7ab43c7a1f9654f884b1db25af1f288e33b7f2db167c40275228bf20c66bb5797ea997b29c5efc61c2cd7767399ec9d484b6a4a7b30fcdf149dd';

// Test with a minimal business first
const testBusiness = {
  name: "Test Business",
  category: "Restaurant",
  neighborhood: "Hai Chau",
  rating: 4.5,
  reviewCount: 10,
  isOpen: true,
  hasMemberDeal: false,
  dealHighlight: "Test deal",
  isPremium: false,
  description: "Test business description",
  slug: "test-business",
  latitude: 16.0475,
  longitude: 108.2062,
  address: "Test Address, Da Nang",
  phone: "+84 236 123 4567",
  website: "https://test.com"
};

async function testBusinessCreationDetailed() {
  try {
    console.log('🧪 Testing business creation with detailed error logging...');
    console.log('📤 Sending data:', JSON.stringify(testBusiness, null, 2));
    
    const response = await fetch(`${API_BASE_URL}/businesses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({ data: testBusiness })
    });
    
    console.log('📥 Response status:', response.status);
    console.log('📥 Response status text:', response.statusText);
    console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ SUCCESS! Business created:', result);
    } else {
      const errorText = await response.text();
      console.log('❌ ERROR Response body (raw):', errorText);
      
      try {
        const errorJson = JSON.parse(errorText);
        console.log('❌ Parsed error JSON:', JSON.stringify(errorJson, null, 2));
        
        if (errorJson.error) {
          console.log('❌ Error details:', errorJson.error);
        }
        if (errorJson.message) {
          console.log('❌ Error message:', errorJson.message);
        }
      } catch (e) {
        console.log('❌ Could not parse error as JSON:', e.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Network/other error:', error);
    console.error('❌ Error stack:', error.stack);
  }
}

// Run the detailed test
testBusinessCreationDetailed();
