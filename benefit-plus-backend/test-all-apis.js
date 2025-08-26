const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = '132f00af63c54ad3e5340be792f73172a6936e7d071d29fe13056888f69ddf44e1b8d0cea7ef990b20b4cfdf9df72ce672f9c24d61ef03fb8b9f8910e118afbeb233ca84b86b7ab43c7a1f9654f884b1db25af1f288e33b7f2db167c40275228bf20c66bb5797ea997b29c5efc61c2cd7767399ec9d484b6a4a7b30fcdf149dd';

async function testAllAPIs() {
  console.log('🧪 COMPREHENSIVE API TESTING STARTING...\n');

  const tests = [
    {
      name: 'Businesses API',
      endpoint: '/businesses',
      method: 'GET',
      expectedFields: ['id', 'attributes', 'name', 'category', 'neighborhood']
    },
    {
      name: 'Deals API',
      endpoint: '/deals',
      method: 'GET',
      expectedFields: ['id', 'attributes', 'title', 'description', 'business']
    },
    {
      name: 'Events API',
      endpoint: '/events',
      method: 'GET',
      expectedFields: ['id', 'attributes', 'title', 'description', 'organizer']
    },
    {
      name: 'Deals with Business Population',
      endpoint: '/deals?populate[business][populate]=coverPhoto,photos',
      method: 'GET',
      expectedFields: ['id', 'attributes', 'title', 'business', 'business.coverPhoto']
    },
    {
      name: 'Events with Business Population',
      endpoint: '/events?populate[organizer][populate]=coverPhoto,photos',
      method: 'GET',
      expectedFields: ['id', 'attributes', 'title', 'organizer', 'organizer.coverPhoto']
    },
    {
      name: 'Flash Deals',
      endpoint: '/deals/flash-deals',
      method: 'GET',
      expectedFields: ['data']
    },
    {
      name: 'Featured Deals',
      endpoint: '/deals/featured',
      method: 'GET',
      expectedFields: ['data']
    },
    {
      name: 'Upcoming Events',
      endpoint: '/events/upcoming',
      method: 'GET',
      expectedFields: ['data']
    }
  ];

  for (const test of tests) {
    console.log(`🔍 Testing: ${test.name}`);
    console.log(`   Endpoint: ${test.endpoint}`);
    
    try {
      const response = await fetch(`${API_BASE_URL}${test.endpoint}`, {
        method: test.method,
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      console.log(`   Status: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`   ✅ Success - Data received`);
        
        // Check if expected fields exist
        if (test.expectedFields) {
          const hasExpectedFields = test.expectedFields.every(field => {
            if (field.includes('.')) {
              const [parent, child] = field.split('.');
              return data.data && data.data[0] && data.data[0][parent] && data.data[0][parent][child];
            }
            return data.data && data.data[0] && (data.data[0][field] !== undefined || data.data[0].attributes?.[field] !== undefined);
          });
          
          if (hasExpectedFields) {
            console.log(`   ✅ All expected fields present`);
          } else {
            console.log(`   ⚠️  Some expected fields missing`);
          }
        }
        
        // Log sample data structure
        if (data.data && data.data.length > 0) {
          console.log(`   📊 Sample data structure:`, Object.keys(data.data[0]));
          if (data.data[0].business) {
            console.log(`   🏢 Business data:`, Object.keys(data.data[0].business));
          }
          if (data.data[0].organizer) {
            console.log(`   🎉 Organizer data:`, Object.keys(data.data[0].organizer));
          }
        }
        
      } else {
        console.log(`   ❌ Failed - ${response.status} ${response.statusText}`);
        const errorText = await response.text();
        console.log(`   Error details: ${errorText}`);
      }
      
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
    
    console.log(''); // Empty line for readability
  }

  console.log('🎯 API TESTING COMPLETE');
}

// Run the tests
testAllAPIs();
