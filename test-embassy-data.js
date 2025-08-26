const API_BASE_URL = 'http://localhost:1337/api';

async function testEmbassyData() {
  console.log('🔍 Testing Embassy Business Record...\n');

  try {
    // Get all businesses
    const response = await fetch(`${API_BASE_URL}/businesses?populate=*`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Found ${data.data?.length || 0} businesses\n`);
      
      // Find the Embassy record
      const embassy = data.data?.find(business => 
        business.attributes?.name?.toLowerCase().includes('embassy') ||
        business.attributes?.name?.toLowerCase().includes('consulate')
      );
      
      if (embassy) {
        console.log('🏛️ EMBASSY RECORD FOUND:');
        console.log('   ID:', embassy.id);
        console.log('   Name:', embassy.attributes.name);
        console.log('   Category:', embassy.attributes.category);
        console.log('   Neighborhood:', embassy.attributes.neighborhood);
        
        console.log('\n🖼️ COVER PHOTO ANALYSIS:');
        console.log('   Has coverPhoto:', !!embassy.attributes.coverPhoto);
        
        if (embassy.attributes.coverPhoto) {
          console.log('   Cover Photo Type:', typeof embassy.attributes.coverPhoto);
          console.log('   Cover Photo Keys:', Object.keys(embassy.attributes.coverPhoto));
          
          if (embassy.attributes.coverPhoto.data) {
            console.log('   Cover Photo Data Type:', typeof embassy.attributes.coverPhoto.data);
            console.log('   Cover Photo Data Keys:', Object.keys(embassy.attributes.coverPhoto.data));
            
            if (embassy.attributes.coverPhoto.data.attributes) {
              console.log('   Cover Photo URL:', embassy.attributes.coverPhoto.data.attributes.url);
              console.log('   Cover Photo Name:', embassy.attributes.coverPhoto.data.attributes.name);
              console.log('   Cover Photo Format:', embassy.attributes.coverPhoto.data.attributes.format);
            }
          }
        } else {
          console.log('   ❌ NO COVER PHOTO FOUND');
        }
        
        console.log('\n📸 PHOTOS ARRAY ANALYSIS:');
        console.log('   Has photos:', !!embassy.attributes.photos);
        
        if (embassy.attributes.photos?.data) {
          console.log('   Photos Count:', embassy.attributes.photos.data.length);
          embassy.attributes.photos.data.forEach((photo, index) => {
            console.log(`   Photo ${index + 1}:`, photo.attributes?.url);
          });
        } else {
          console.log('   ❌ NO PHOTOS ARRAY FOUND');
        }
        
        console.log('\n🔍 RAW EMBASSY OBJECT:');
        console.log(JSON.stringify(embassy, null, 2));
        
      } else {
        console.log('❌ NO EMBASSY RECORD FOUND');
        console.log('\n📋 Available Business Names:');
        data.data?.forEach(business => {
          console.log(`   - ${business.attributes?.name}`);
        });
      }
      
    } else {
      console.log(`❌ API Error: ${response.status} ${response.statusText}`);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  console.log('\n🎯 Embassy Data Test Complete');
}

testEmbassyData();
