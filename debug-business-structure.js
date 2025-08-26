const API_BASE_URL = 'http://localhost:1337/api';

async function debugBusinessStructure() {
  console.log('🔍 DEBUGGING BUSINESS DATA STRUCTURE...\n');

  try {
    const response = await fetch(`${API_BASE_URL}/businesses?populate=*`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Found ${data.data?.length || 0} businesses\n`);
      
      if (data.data && data.data.length > 0) {
        const firstBusiness = data.data[0];
        
        console.log('🔍 FIRST BUSINESS ANALYSIS:');
        console.log('   Raw Object Type:', typeof firstBusiness);
        console.log('   Raw Object Keys:', Object.keys(firstBusiness));
        console.log('   Has ID:', !!firstBusiness.id);
        console.log('   ID Value:', firstBusiness.id);
        console.log('   Has Attributes:', !!firstBusiness.attributes);
        
        if (firstBusiness.attributes) {
          console.log('\n📋 ATTRIBUTES ANALYSIS:');
          console.log('   Attributes Type:', typeof firstBusiness.attributes);
          console.log('   Attributes Keys:', Object.keys(firstBusiness.attributes));
          
          // Check each key individually
          Object.keys(firstBusiness.attributes).forEach(key => {
            const value = firstBusiness.attributes[key];
            console.log(`   ${key}:`, value, `(type: ${typeof value})`);
          });
          
        } else {
          console.log('   ❌ NO ATTRIBUTES OBJECT');
        }
        
        console.log('\n🔍 RAW FIRST BUSINESS OBJECT:');
        console.log(JSON.stringify(firstBusiness, null, 2));
        
        // Check if this is a flattened structure
        console.log('\n🔍 CHECKING FOR FLATTENED STRUCTURE:');
        console.log('   Has name directly:', !!firstBusiness.name);
        console.log('   Has category directly:', !!firstBusiness.category);
        console.log('   Has coverPhoto directly:', !!firstBusiness.coverPhoto);
        
        if (firstBusiness.coverPhoto) {
          console.log('   Cover Photo Direct:', firstBusiness.coverPhoto);
        }
        
      } else {
        console.log('❌ No businesses found in data.data');
      }
      
      console.log('\n🔍 FULL API RESPONSE STRUCTURE:');
      console.log('   Response Keys:', Object.keys(data));
      console.log('   Has Meta:', !!data.meta);
      if (data.meta) {
        console.log('   Meta Keys:', Object.keys(data.meta));
      }
      
    } else {
      console.log(`❌ API Error: ${response.status} ${response.statusText}`);
    }

  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  }

  console.log('\n🎯 Business Structure Debug Complete');
}

debugBusinessStructure();
