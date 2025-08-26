const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = 'fd546d95b038b8807b529587af88f7d97d0d7aebde98ec64600bd3702ba57ebb6d61078fcb86505824b5ff61e3f18ebfdb0ab7c5d14c6f4bd7014cc849f2b8eff7350e386029a020e1f3cfe6cde2995d7f19ea2cb49f7f1ebf1285b7978100af0b1b0ff9b104d954539732efcd18f575ac98457b1ec48c66b41ac967ad24dcf6';

async function testMinimalCreation() {
  try {
    console.log('🧪 Testing minimal field creation...');
    
    // Test 1: Create a deal with minimal fields
    await testMinimalDeal();
    
    // Test 2: Create an event with minimal fields
    await testMinimalEvent();
    
  } catch (error) {
    console.error('❌ Error in minimal testing:', error);
  }
}

async function testMinimalDeal() {
  console.log('🎯 Testing minimal deal creation...');
  
  // Try with just title and description first
  const minimalDeal = {
    title: "Test Deal"
  };
  
  try {
    console.log('📤 Sending minimal deal data:', JSON.stringify(minimalDeal, null, 2));
    
    const response = await fetch(`${API_BASE_URL}/deals`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: minimalDeal })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Minimal deal created successfully:`, result);
    } else {
      const errorText = await response.text();
      console.error(`❌ Minimal deal failed (${response.status}):`, errorText);
    }
  } catch (error) {
    console.error(`❌ Error creating minimal deal:`, error);
  }
}

async function testMinimalEvent() {
  console.log('📅 Testing minimal event creation...');
  
  // Try with just title first
  const minimalEvent = {
    title: "Test Event"
  };
  
  try {
    console.log('📤 Sending minimal event data:', JSON.stringify(minimalEvent, null, 2));
    
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: minimalEvent })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Minimal event created successfully:`, result);
    } else {
      const errorText = await response.text();
      console.error(`❌ Minimal event failed (${response.status}):`, errorText);
    }
  } catch (error) {
    console.error(`❌ Error creating minimal event:`, error);
  }
}

// Run the minimal test
testMinimalCreation();
