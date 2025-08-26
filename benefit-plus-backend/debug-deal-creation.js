const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = '132f00af63c54ad3e5340be792f73172a6936e7d071d29fe13056888f69ddf44e1b8d0cea7ef990b20b4cfdf9df72ce672f9c24d61ef03fb8b9f8910e118afbeb233ca84b86b7ab43c7a1f9654f884b1db25af1f288e33b7f2db167c40275228bf20c66bb5797ea997b29c5efc61c2cd7767399ec9d484b6a4a7b30fcdf149dd';

// Test with a minimal deal
const testDeal = {
  title: "Test Deal",
  description: "Test deal description",
  dealType: "percentage",
  discountPercentage: 20,
  discountAmount: 0,
  originalPrice: 100000,
  finalPrice: 80000,
  startDate: "2024-01-01T00:00:00.000Z",
  endDate: "2025-12-31T23:59:59.000Z",
  isActive: true,
  isFlashDeal: false,
  terms: "Test terms",
  restrictions: ["Test restriction"],
  business: 74 // Use the business ID from the successful creation
};

async function testDealCreation() {
  try {
    console.log('🧪 Testing deal creation...');
    console.log('📤 Sending data:', JSON.stringify(testDeal, null, 2));
    
    const response = await fetch(`${API_BASE_URL}/deals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({ data: testDeal })
    });
    
    console.log('📥 Response status:', response.status);
    console.log('📥 Response status text:', response.statusText);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ SUCCESS! Deal created:', result);
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
testDealCreation();
