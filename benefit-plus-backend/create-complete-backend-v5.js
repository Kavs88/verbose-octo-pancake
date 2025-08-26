const API_BASE_URL = 'http://localhost:1337';
const SUPER_ADMIN_EMAIL = 'admin@strapi.io';
const SUPER_ADMIN_PASSWORD = 'MyPassword123!';

async function createCompleteBackendV5() {
  try {
    console.log('🏗️ Creating COMPLETE Benefit+ backend structure using Strapi v5 Super Admin...');
    
    // 1. Get Super Admin JWT token
    const adminToken = await getAdminToken();
    if (!adminToken) {
      throw new Error('Failed to get admin token');
    }
    
    console.log('✅ Super Admin authenticated');
    
    // 2. Create/Update Business content type
    await createBusinessContentType(adminToken);
    
    // 3. Create/Update Deal content type
    await createDealContentType(adminToken);
    
    // 4. Create/Update Event content type
    await createEventContentType(adminToken);
    
    // 5. Create/Update User Profile content type
    await createUserProfileContentType(adminToken);
    
    // 6. Create/Update Review content type
    await createReviewContentType(adminToken);
    
    console.log('🎉 Complete backend structure created!');
    
  } catch (error) {
    console.error('❌ Failed to create complete backend:', error);
  }
}

async function getAdminToken() {
  try {
    console.log('🔐 Authenticating as Super Admin...');
    
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: SUPER_ADMIN_EMAIL,
        password: SUPER_ADMIN_PASSWORD
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.data.token;
    } else {
      console.error('❌ Admin login failed:', response.status);
      return null;
    }
    
  } catch (error) {
    console.error('❌ Admin authentication error:', error);
    return null;
  }
}

async function createBusinessContentType(adminToken) {
  try {
    console.log('🏢 Creating Business content type...');
    
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
    
    await createContentType('business', businessSchema, adminToken);
    console.log('✅ Business content type created/updated');
    
  } catch (error) {
    console.error('❌ Failed to create Business content type:', error);
  }
}

async function createDealContentType(adminToken) {
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
    
    await createContentType('deal', dealSchema, adminToken);
    console.log('✅ Deal content type created/updated');
    
  } catch (error) {
    console.error('❌ Failed to create Deal content type:', error);
  }
}

async function createEventContentType(adminToken) {
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
    
    await createContentType('event', eventSchema, adminToken);
    console.log('✅ Event content type created/updated');
    
  } catch (error) {
    console.error('❌ Failed to create Event content type:', error);
  }
}

async function createUserProfileContentType(adminToken) {
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
    
    await createContentType('user-profile', userProfileSchema, adminToken);
    console.log('✅ User Profile content type created/updated');
    
  } catch (error) {
    console.error('❌ Failed to create User Profile content type:', error);
  }
}

async function createReviewContentType(adminToken) {
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
    
    await createContentType('review', reviewSchema, adminToken);
    console.log('✅ Review content type created/updated');
    
  } catch (error) {
    console.error('❌ Failed to create Review content type:', error);
  }
}

async function createContentType(contentTypeName, schema, adminToken) {
  try {
    // For Strapi v5, we use the content-manager API with admin token
    const endpoint = `${API_BASE_URL}/content-manager/content-types`;
    
    console.log(`📝 Creating ${contentTypeName} content type...`);
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
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
        await updateContentType(contentTypeName, schema, adminToken);
      }
    }
    
  } catch (error) {
    console.error(`❌ Error with ${contentTypeName}:`, error);
    throw error;
  }
}

async function updateContentType(contentTypeName, schema, adminToken) {
  try {
    const endpoint = `${API_BASE_URL}/content-manager/content-types/api::${contentTypeName}.${contentTypeName}`;
    
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
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
createCompleteBackendV5();
