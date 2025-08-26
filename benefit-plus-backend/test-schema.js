const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = 'fd546d95b038b8807b529587af88f7d97d0d7aebde98ec64600bd3702ba57ebb6d61078fcb86505824b5ff61e3f18ebfdb0ab7c5d14c6f4bd7014cc849f2b8eff7350e386029a020e1f3cfe6cde2995d7f19ea2cb49f7f1ebf1285b7978100af0b1b0ff9b104d954539732efcd18f575ac98457b1ec48c66b41ac967ad24dcf6';

console.log('🔍 Testing Strapi schemas...');

// Test 1: Check deals schema
fetch(`${API_BASE_URL}/deals`, {
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`
  }
})
.then(response => response.json())
.then(data => {
  console.log('📊 Deals API Response:');
  console.log(JSON.stringify(data, null, 2));
})
.catch(error => {
  console.error('❌ Deals API Error:', error);
});

// Test 2: Check events schema  
fetch(`${API_BASE_URL}/events`, {
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`
  }
})
.then(response => response.json())
.then(data => {
  console.log('📊 Events API Response:');
  console.log(JSON.stringify(data, null, 2));
})
.catch(error => {
  console.error('❌ Events API Error:', error);
});
