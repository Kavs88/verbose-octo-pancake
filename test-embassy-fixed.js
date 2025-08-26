const API_BASE_URL = 'http://localhost:1337/api';

async function testEmbassyFixed() {
  console.log('🔍 Testing Embassy Images After Fix...\n');

  try {
    const response = await fetch(`${API_BASE_URL}/businesses?populate=*`);
    
    if (response.ok) {
      const data = await response.json();
      
      // Find the Embassy record
      const embassy = data.data?.find(business => 
        business.name?.toLowerCase().includes('embassy')
      );
      
      if (embassy) {
        console.log('🏛️ EMBASSY RECORD FOUND:');
        console.log('   ID:', embassy.id);
        console.log('   Name:', embassy.name);
        console.log('   Category:', embassy.category);
        
        console.log('\n🖼️ COVER PHOTO ANALYSIS:');
        console.log('   Raw coverPhoto:', embassy.coverPhoto);
        
        if (embassy.coverPhoto) {
          console.log('   ✅ Cover Photo URL:', embassy.coverPhoto.url);
          console.log('   ✅ Cover Photo Formats:', Object.keys(embassy.coverPhoto.formats || {}));
          
          if (embassy.coverPhoto.formats) {
            console.log('   ✅ Thumbnail URL:', embassy.coverPhoto.formats.thumbnail?.url);
            console.log('   ✅ Small URL:', embassy.coverPhoto.formats.small?.url);
          }
        }
        
        console.log('\n📸 PHOTOS ARRAY ANALYSIS:');
        if (embassy.photos && Array.isArray(embassy.photos)) {
          console.log('   ✅ Photos Count:', embassy.photos.length);
          embassy.photos.forEach((photo, index) => {
            console.log(`   ✅ Photo ${index + 1} URL:`, photo.url);
            console.log(`   ✅ Photo ${index + 1} Formats:`, Object.keys(photo.formats || {}));
          });
        }
        
        // Test URL construction
        console.log('\n🔗 URL CONSTRUCTION TEST:');
        const STRAPI_BASE_URL = 'http://localhost:1337';
        
        if (embassy.coverPhoto?.url) {
          const fullCoverPhotoUrl = `${STRAPI_BASE_URL}${embassy.coverPhoto.url}`;
          console.log('   ✅ Full Cover Photo URL:', fullCoverPhotoUrl);
        }
        
        if (embassy.photos && embassy.photos.length > 0) {
          embassy.photos.forEach((photo, index) => {
            if (photo.url) {
              const fullPhotoUrl = `${STRAPI_BASE_URL}${photo.url}`;
              console.log(`   ✅ Full Photo ${index + 1} URL:`, fullPhotoUrl);
            }
          });
        }
        
      } else {
        console.log('❌ NO EMBASSY RECORD FOUND');
      }
      
    } else {
      console.log(`❌ API Error: ${response.status} ${response.statusText}`);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  console.log('\n🎯 Embassy Fixed Test Complete');
}

testEmbassyFixed();
