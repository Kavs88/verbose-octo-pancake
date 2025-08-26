const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = 'fd546d95b038b8807b529587af88f7d97d0d7aebde98ec64600bd3702ba57ebb6d61078fcb86505824b5ff61e3f18ebfdb0ab7c5d14c6f4bd7014cc849f2b8eff7350e386029a020e1f3cfe6cde2995d7f19ea2cb49f7f1ebf1285b7978100af0b1b0ff9b104d954539732efcd18f575ac98457b1ec48c66b41ac967ad24dcf6';

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

async function testBusinessCreation() {
  try {
    console.log('🧪 Testing business creation...');
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
    console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ SUCCESS! Business created:', result);
    } else {
      const errorText = await response.text();
      console.log('❌ ERROR Response body:', errorText);
      
      try {
        const errorJson = JSON.parse(errorText);
        console.log('❌ Parsed error:', JSON.stringify(errorJson, null, 2));
      } catch (e) {
        console.log('❌ Could not parse error as JSON');
      }
    }
    
  } catch (error) {
    console.error('❌ Network/other error:', error);
  }
}

// Run the test
testBusinessCreation();
