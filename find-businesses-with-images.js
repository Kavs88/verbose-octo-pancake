const API_BASE_URL = 'http://localhost:1337/api';

async function findBusinessesWithImages() {
  console.log('🔍 Finding Businesses with Actual Images...\n');

  try {
    const response = await fetch(`${API_BASE_URL}/businesses?populate=*`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Found ${data.data?.length || 0} businesses\n`);
      
      let businessesWithImages = 0;
      let businessesWithCoverPhotos = 0;
      let businessesWithPhotoArrays = 0;
      
      data.data?.forEach((business, index) => {
        const hasCoverPhoto = business.coverPhoto && (
          typeof business.coverPhoto === 'string' || 
          business.coverPhoto.url || 
          business.coverPhoto.data?.attributes?.url
        );
        
        const hasPhotos = business.photos && Array.isArray(business.photos) && business.photos.length > 0;
        
        if (hasCoverPhoto) {
          businessesWithCoverPhotos++;
          console.log(`🖼️ Business ${index + 1} (${business.name}) has cover photo:`, business.coverPhoto);
        }
        
        if (hasPhotos) {
          businessesWithPhotoArrays++;
          console.log(`📸 Business ${index + 1} (${business.name}) has photos array:`, business.photos);
        }
        
        if (hasCoverPhoto || hasPhotos) {
          businessesWithImages++;
        }
      });
      
      console.log('\n📊 IMAGE STATISTICS:');
      console.log(`   Total Businesses: ${data.data?.length || 0}`);
      console.log(`   With Cover Photos: ${businessesWithCoverPhotos}`);
      console.log(`   With Photo Arrays: ${businessesWithPhotoArrays}`);
      console.log(`   With Any Images: ${businessesWithImages}`);
      
      if (businessesWithImages === 0) {
        console.log('\n❌ NO BUSINESSES HAVE IMAGES UPLOADED!');
        console.log('   This explains why images are not scaling - they don\'t exist!');
        console.log('   You need to upload images to the Strapi backend first.');
      }
      
    } else {
      console.log(`❌ API Error: ${response.status} ${response.statusText}`);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  console.log('\n🎯 Image Search Complete');
}

findBusinessesWithImages();
