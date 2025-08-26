const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = '132f00af63c54ad3e5340be792f73172a6936e7d071d29fe13056888f69ddf44e1b8d0cea7ef990b20b4cfdf9df72ce672f9c24d61ef03fb8b9f8910e118afbeb233ca84b86b7ab43c7a1f9654f884b1db25af1f288e33b7f2db167c40275228bf20c66bb5797ea997b29c5efc61c2cd7767399ec9d484b6a4a7b30fcdf149dd';

async function testAPI() {
  console.log('🧪 Testing API endpoints...');
  
  try {
    // Test creating a simple event
    console.log('\n🎉 Testing event creation...');
    const eventData = {
      title: "Test Event",
      description: "Test description",
      date: "2024-02-15",
      time: "14:00:00",
      neighborhood: "Hai Chau",
      maxAttendees: 20,
      isActive: true,
      organizer: 2
    };
    
    const eventResponse = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({ data: eventData })
    });
    
    console.log('Event Response Status:', eventResponse.status);
    console.log('Event Response Text:', await eventResponse.text());
    
    // Test creating a simple deal
    console.log('\n🎯 Testing deal creation...');
    const dealData = {
      title: "Test Deal",
      description: "Test deal description",
      discountPercentage: 20,
      originalPrice: "100000",
      discountedPrice: "80000",
      validFrom: "2024-02-01",
      validUntil: "2024-02-28",
      isActive: true,
      isFeatured: false,
      isFlashDeal: false,
      business: 2
    };
    
    const dealResponse = await fetch(`${API_BASE_URL}/deals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({ data: dealData })
    });
    
    console.log('Deal Response Status:', dealResponse.status);
    console.log('Deal Response Text:', await dealResponse.text());
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testAPI();
