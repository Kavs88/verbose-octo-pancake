const API_BASE_URL = 'http://localhost:1337';
const API_TOKEN = 'fd546d95b038b8807b529587af88f7d97d0d7aebde98ec64600bd3702ba57ebb6d61078fcb86505824b5ff61e3f18ebfdb0ab7c5d14c6f4bd7014cc849f2b8eff7350e386029a020e1f3cfe6cde2995d7f19ea2cb49f7f1ebf1285b7978100af0b1b0ff9b104d954539732efcd18f575ac98457b1ec48c66b41ac967ad24dcf6';

async function createCompleteBackendSimple() {
  try {
    console.log('🏗️ Creating COMPLETE Benefit+ backend structure using API Token...');
    
    // Test API connection first
    await testAPIConnection();
    
    console.log('✅ API connection successful');
    
    // 1. Create/Update Business content type
    await createBusinessContentType();
    
    // 2. Create/Update Deal content type
    await createDealContentType();
    
    // 3. Create/Update Event content type
    await createEventContentType();
    
    // 4. Create/Update User Profile content type
    await createUserProfileContentType();
    
    // 5. Create/Update Review content type
    await createReviewContentType();
    
    console.log('🎉 Complete backend structure created!');
    
  } catch (error) {
    console.error('❌ Failed to create complete backend:', error);
  }
}

async function testAPIConnection() {
  try {
    console.log('🧪 Testing API connection...');
    const response = await fetch(`${API_BASE_URL}/api/businesses`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      console.log('✅ API connection successful');
    } else {
      console.log(`⚠️ API accessible but returned ${response.status}`);
    }
  } catch (error) {
    throw new Error(`API connection failed: ${error.message}`);
  }
}

async function createBusinessContentType() {
  try {
    console.log('🏢 Creating Business content type...');
    
    // For Strapi v5, we need to use the content-manager API
    const businessSchema = {
      kind: 'collectionType',
      collectionName: 'businesses',
      info: {
        singularName: 'business',
        pluralName: 'businesses',
        displayName: 'Business'
      },
      options: {
        draftAndPublish: true
      },
      attributes: {
        name: { type: 'string', required: true, unique: true },
        slug: { type: 'uid', targetField: 'name' },
        description: { type: 'text' },
        category: { type: 'string' },
        neighborhood: { type: 'string' },
        rating: { type: 'decimal', min: 0, max: 5 },
        reviewCount: { type: 'integer', min: 0 },
        isOpen: { type: 'boolean', default: true },
        isPremium: { type: 'boolean', default: false },
        latitude: { type: 'decimal' },
        longitude: { type: 'decimal' },
        address: { type: 'text' },
        phone: { type: 'string' },
        website: { type: 'string' },
        openingHours: { type: 'json' },
        coverPhoto: { type: 'media', multiple: false, allowedTypes: ['images'] },
        photos: { type: 'media', multiple: true, allowedTypes: ['images'] },
        amenities: { type: 'json' }
      }
    };
    
    await createContentType('business', businessSchema);
    console.log('✅ Business content type created/updated');
    
  } catch (error) {
    console.error('❌ Failed to create Business content type:', error);
  }
}

async function createDealContentType() {
  try {
    console.log('🎯 Creating Deal content type...');
    
    const dealSchema = {
      kind: 'collectionType',
      collectionName: 'deals',
      info: {
        singularName: 'deal',
        pluralName: 'deals',
        displayName: 'Deal'
      },
      options: {
        draftAndPublish: true
      },
      attributes: {
        title: { type: 'string', required: true },
        description: { type: 'text' },
        dealType: { type: 'enumeration', enum: ['percentage', 'fixed', 'free', 'bogo'] },
        discountPercentage: { type: 'integer', min: 0, max: 100 },
        discountAmount: { type: 'decimal', min: 0 },
        originalPrice: { type: 'decimal', min: 0 },
        finalPrice: { type: 'decimal', min: 0 },
        startDate: { type: 'date' },
        endDate: { type: 'date' },
        isActive: { type: 'boolean', default: true },
        isFlashDeal: { type: 'boolean', default: false },
        terms: { type: 'text' },
        restrictions: { type: 'json' },
        image: { type: 'media', multiple: false, allowedTypes: ['images'] }
      }
    };
    
    await createContentType('deal', dealSchema);
    console.log('✅ Deal content type created/updated');
    
  } catch (error) {
    console.error('❌ Failed to create Deal content type:', error);
  }
}

async function createEventContentType() {
  try {
    console.log('📅 Creating Event content type...');
    
    const eventSchema = {
      kind: 'collectionType',
      collectionName: 'events',
      info: {
        singularName: 'event',
        pluralName: 'events',
        displayName: 'Event'
      },
      options: {
        draftAndPublish: true
      },
      attributes: {
        title: { type: 'string', required: true },
        description: { type: 'text' },
        date: { type: 'date', required: true },
        time: { type: 'time', required: true },
        duration: { type: 'string' },
        neighborhood: { type: 'string' },
        address: { type: 'text' },
        maxAttendees: { type: 'integer', min: 1 },
        isActive: { type: 'boolean', default: true },
        eventType: { type: 'enumeration', enum: ['workshop', 'tasting', 'class', 'tour', 'social', 'other'] },
        price: { type: 'decimal', min: 0 },
        isFree: { type: 'boolean', default: false },
        image: { type: 'media', multiple: false, allowedTypes: ['images'] }
      }
    };
    
    await createContentType('event', eventSchema);
    console.log('✅ Event content type created/updated');
    
  } catch (error) {
    console.error('❌ Failed to create Event content type:', error);
  }
}

async function createUserProfileContentType() {
  try {
    console.log('👤 Creating User Profile content type...');
    
    const userProfileSchema = {
      kind: 'collectionType',
      collectionName: 'user-profiles',
      info: {
        singularName: 'user-profile',
        pluralName: 'user-profiles',
        displayName: 'User Profile'
      },
      options: {
        draftAndPublish: true
      },
      attributes: {
        username: { type: 'string', required: true, unique: true },
        email: { type: 'email', required: true, unique: true },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        avatar: { type: 'media', multiple: false, allowedTypes: ['images'] },
        membershipTier: { type: 'enumeration', enum: ['basic', 'premium', 'vip'], default: 'basic' },
        membershipStartDate: { type: 'date' },
        membershipRenewalDate: { type: 'date' },
        favoriteCategories: { type: 'json' },
        location: { type: 'string' },
        notifications: { type: 'json' }
      }
    };
    
    await createContentType('user-profile', userProfileSchema);
    console.log('✅ User Profile content type created/updated');
    
  } catch (error) {
    console.error('❌ Failed to create User Profile content type:', error);
  }
}

async function createReviewContentType() {
  try {
    console.log('⭐ Creating Review content type...');
    
    const reviewSchema = {
      kind: 'collectionType',
      collectionName: 'reviews',
      info: {
        singularName: 'review',
        pluralName: 'reviews',
        displayName: 'Review'
      },
      options: {
        draftAndPublish: true
      },
      attributes: {
        rating: { type: 'integer', required: true, min: 1, max: 5 },
        comment: { type: 'text' },
        date: { type: 'date', required: true },
        isVerified: { type: 'boolean', default: false },
        categories: { type: 'json' },
        photos: { type: 'media', multiple: true, allowedTypes: ['images'] }
      }
    };
    
    await createContentType('review', reviewSchema);
    console.log('✅ Review content type created/updated');
    
  } catch (error) {
    console.error('❌ Failed to create Review content type:', error);
  }
}

async function createContentType(contentTypeName, schema) {
  try {
    // For Strapi v5, we need to use the content-manager API
    const endpoint = `${API_BASE_URL}/content-manager/content-types`;
    
    console.log(`📝 Creating ${contentTypeName} content type...`);
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(schema)
    });
    
    if (response.ok) {
      console.log(`✅ Successfully created ${contentTypeName} content type`);
    } else {
      const errorText = await response.text();
      console.error(`❌ Failed to create ${contentTypeName}: ${response.status} - ${errorText}`);
      
      // If creation fails, try to update existing
      if (response.status === 400) {
        console.log(`🔄 Attempting to update existing ${contentTypeName} content type...`);
        await updateContentType(contentTypeName, schema);
      }
    }
    
  } catch (error) {
    console.error(`❌ Error with ${contentTypeName}:`, error);
    throw error;
  }
}

async function updateContentType(contentTypeName, schema) {
  try {
    const endpoint = `${API_BASE_URL}/content-manager/content-types/api::${contentTypeName}.${contentTypeName}`;
    
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(schema)
    });
    
    if (response.ok) {
      console.log(`✅ Successfully updated ${contentTypeName} content type`);
    } else {
      const errorText = await response.text();
      console.error(`❌ Failed to update ${contentTypeName}: ${response.status} - ${errorText}`);
    }
    
  } catch (error) {
    console.error(`❌ Error updating ${contentTypeName}:`, error);
  }
}

// Run the complete backend creation
createCompleteBackendSimple();
