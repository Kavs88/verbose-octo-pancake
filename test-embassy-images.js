const API_BASE_URL = 'http://localhost:1337/api';

async function testEmbassyImages() {
  console.log('🔍 Testing Embassy Images After Fix...\n');

  try {
    const response = await fetch(`${API_BASE_URL}/businesses?populate=*`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Found ${data.data?.length || 0} businesses\n`);
      
      // Find the Embassy record
      const embassy = data.data?.find(business => 
        business.name?.toLowerCase().includes('embassy') ||
        business.name?.toLowerCase().includes('consulate') ||
        business.name?.toLowerCase().includes('olivia') // Test with known working business
      );
      
      if (embassy) {
        console.log('🏛️ BUSINESS RECORD FOUND:');
        console.log('   ID:', embassy.id);
        console.log('   Name:', embassy.name);
        console.log('   Category:', embassy.category);
        console.log('   Neighborhood:', embassy.neighborhood);
        
        console.log('\n🖼️ COVER PHOTO ANALYSIS:');
        console.log('   Raw coverPhoto:', embassy.coverPhoto);
        console.log('   Cover Photo Type:', typeof embassy.coverPhoto);
        
        if (embassy.coverPhoto) {
          if (typeof embassy.coverPhoto === 'string') {
            console.log('   ✅ Cover Photo is direct URL string:', embassy.coverPhoto);
          } else if (embassy.coverPhoto.url) {
            console.log('   ✅ Cover Photo has url property:', embassy.coverPhoto.url);
          } else if (embassy.coverPhoto.data?.attributes?.url) {
            console.log('   ✅ Cover Photo has nested structure:', embassy.coverPhoto.data.attributes.url);
          } else {
            console.log('   ❌ Cover Photo structure unknown:', Object.keys(embassy.coverPhoto));
          }
        } else {
          console.log('   ❌ NO COVER PHOTO FOUND');
        }
        
        console.log('\n📸 PHOTOS ARRAY ANALYSIS:');
        console.log('   Raw photos:', embassy.photos);
        console.log('   Photos Type:', typeof embassy.photos);
        
        if (embassy.photos && Array.isArray(embassy.photos)) {
          console.log('   Photos Count:', embassy.photos.length);
          embassy.photos.forEach((photo, index) => {
            if (typeof photo === 'string') {
              console.log(`   ✅ Photo ${index + 1} is direct URL:`, photo);
            } else if (photo.url) {
              console.log(`   ✅ Photo ${index + 1} has url property:`, photo.url);
            } else if (photo.data?.attributes?.url) {
              console.log(`   ✅ Photo ${index + 1} has nested structure:`, photo.data.attributes.url);
            } else {
              console.log(`   ❌ Photo ${index + 1} structure unknown:`, Object.keys(photo));
            }
          });
        } else {
          console.log('   ❌ NO PHOTOS ARRAY FOUND');
        }
        
        // Test the URL construction
        console.log('\n🔗 URL CONSTRUCTION TEST:');
        const STRAPI_BASE_URL = 'http://localhost:1337';
        
        if (embassy.coverPhoto) {
          let coverPhotoUrl;
          if (typeof embassy.coverPhoto === 'string') {
            coverPhotoUrl = `${STRAPI_BASE_URL}${embassy.coverPhoto}`;
          } else if (embassy.coverPhoto.url) {
            coverPhotoUrl = `${STRAPI_BASE_URL}${embassy.coverPhoto.url}`;
          } else if (embassy.coverPhoto.data?.attributes?.url) {
            coverPhotoUrl = `${STRAPI_BASE_URL}${embassy.coverPhoto.data.attributes.url}`;
          }
          
          if (coverPhotoUrl) {
            console.log('   ✅ Full Cover Photo URL:', coverPhotoUrl);
          }
        }
        
      } else {
        console.log('❌ NO EMBASSY RECORD FOUND');
        console.log('\n📋 Available Business Names:');
        data.data?.slice(0, 5).forEach(business => {
          console.log(`   - ${business.name}`);
        });
        if (data.data?.length > 5) {
          console.log(`   ... and ${data.data.length - 5} more`);
        }
      }
      
    } else {
      console.log(`❌ API Error: ${response.status} ${response.statusText}`);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  console.log('\n🎯 Embassy Images Test Complete');
}

testEmbassyImages();
