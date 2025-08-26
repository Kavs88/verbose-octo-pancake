const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = '132f00af63c54ad3e5340be792f73172a6936e7d071d29fe13056888f69ddf44e1b8d0cea7ef990b20b4cfdf9df72ce672f9c24d61ef03fb8b9f8910e118afbeb233ca84b86b7ab43c7a1f9654f884b1db25af1f288e33b7f2db167c40275228bf20c66bb5797ea997b29c5efc61c2cd7767399ec9d484b6a4a7b30fcdf149dd';

async function checkDealSchema() {
  try {
    console.log('🔍 Checking deal content type schema...');
    
    // First, let's see if we can get deals
    const dealsResponse = await fetch(`${API_BASE_URL}/deals`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    
    if (dealsResponse.ok) {
      const deals = await dealsResponse.json();
      console.log('✅ Deals endpoint accessible');
      console.log('📊 Number of deals:', deals.data?.length || 0);
      
      if (deals.data && deals.data.length > 0) {
        console.log('🔍 Sample deal structure:');
        console.log(JSON.stringify(deals.data[0], null, 2));
      }
    } else {
      console.log('❌ Deals endpoint not accessible');
    }
    
    // Let's also check what content types are available
    console.log('\n🔍 Checking available content types...');
    
    // Try to get the content type info (this might not work, but worth trying)
    try {
      const contentTypeResponse = await fetch(`${API_BASE_URL}/content-type-builder/content-types`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${API_TOKEN}` }
      });
      
      if (contentTypeResponse.ok) {
        const contentTypes = await contentTypeResponse.json();
        console.log('✅ Content types accessible:', contentTypes);
      } else {
        console.log('❌ Content types endpoint not accessible');
      }
    } catch (e) {
      console.log('❌ Content types check failed:', e.message);
    }
    
  } catch (error) {
    console.error('❌ Error checking deal schema:', error);
  }
}

// Run the check
checkDealSchema();
