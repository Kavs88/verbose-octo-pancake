const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = '132f00af63c54ad3e5340be792f73172a6936e7d071d29fe13056888f69ddf44e1b8d0cea7ef990b20b4cfdf9df72ce672f9c24d61ef03fb8b9f8910e118afbeb233ca84b86b7ab43c7a1f9654f884b1db25af1f288e33b7f2db167c40275228bf20c66bb5797ea997b29c5efc61c2cd7767399ec9d484b6a4a7b30fcdf149dd';

async function checkDealStructure() {
  console.log('🔍 Checking actual deal data structure...\n');

  try {
    const response = await fetch(`${API_BASE_URL}/deals`, {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Deals API Response Status:', response.status);
      console.log('📊 Total deals found:', data.data?.length || 0);
      
      if (data.data && data.data.length > 0) {
        const firstDeal = data.data[0];
        console.log('\n🔍 First Deal Structure:');
        console.log('   ID:', firstDeal.id);
        console.log('   Title:', firstDeal.title);
        console.log('   Description:', firstDeal.description);
        console.log('   Business field:', firstDeal.business);
        console.log('   Business type:', typeof firstDeal.business);
        
        if (firstDeal.business) {
          console.log('   Business ID:', firstDeal.business.id);
          console.log('   Business object keys:', Object.keys(firstDeal.business));
        }
        
        console.log('\n📋 All available fields:');
        console.log(Object.keys(firstDeal));
      }
    } else {
      console.log('❌ Failed:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkDealStructure();
