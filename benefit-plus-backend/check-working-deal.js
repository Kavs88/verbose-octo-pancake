const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = 'fd546d95b038b8807b529587af88f7d97d0d7aebde98ec64600bd3702ba57ebb6d61078fcb86505824b5ff61e3f18ebfdb0ab7c5d14c6f4bd7014cc849f2b8eff7350e386029a020e1f3cfe6cde2995d7f19ea2cb49f7f1ebf1285b7978100af0b1b0ff9b104d954539732efcd18f575ac98457b1ec48c66b41ac967ad24dcf6';

console.log('🔍 Examining the working deal to understand the real schema...');

// Get the working deal (we know it exists from the logs)
fetch(`${API_BASE_URL}/deals`, {
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`
  }
})
.then(response => response.json())
.then(data => {
  console.log('📊 Working Deal Data:');
  console.log(JSON.stringify(data, null, 2));
  
  if (data.data && data.data.length > 0) {
    const deal = data.data[0];
    console.log('\n🔍 Deal Structure Analysis:');
    console.log('ID:', deal.id);
    console.log('Title:', deal.title);
    console.log('Business field:', deal.business);
    console.log('All fields:', Object.keys(deal.attributes || deal));
  }
})
.catch(error => {
  console.error('❌ Error fetching deals:', error);
});
