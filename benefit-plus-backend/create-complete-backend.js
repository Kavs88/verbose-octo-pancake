const API_BASE_URL = 'http://localhost:1337';
const API_TOKEN = 'fd546d95b038b8807b529587af88f7d97d0d7aebde98ec64600bd3702ba57ebb6d61078fcb86505824b5ff61e3f18ebfdb0ab7c5d14c6f4bd7014cc849f2b8eff7350e386029a020e1f3cfe6cde2995d7f19ea2cb49f7f1ebf1285b7978100af0b1b0ff9b104d954539732efcd18f575ac98457b1ec48c66b41ac967ad24dcf6';

async function createCompleteBackend() {
  try {
    console.log('🏗️ Creating COMPLETE Benefit+ backend structure...');
    
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

async function createBusinessContentType() {
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
        // Basic Information
        name: { type: 'string', required: true, unique: true },
        slug: { type: 'uid', targetField: 'name' },
        description: { type: 'text' },
        
        // Business Details
        category: { type: 'string' },
        neighborhood: { type: 'string' },
        rating: { type: 'decimal', min: 0, max: 5 },
        reviewCount: { type: 'integer', min: 0 },
        isOpen: { type: 'boolean', default: true },
        isPremium: { type: 'boolean', default: false },
        
        // Location
        latitude: { type: 'decimal' },
        longitude: { type: 'decimal' },
        address: { type: 'text' },
        
        // Contact & Business Info
        phone: { type: 'string' },
        website: { type: 'string' },
        openingHours: { type: 'json' },
        
        // Media
        coverPhoto: { type: 'media', multiple: false, allowedTypes: ['images'] },
        photos: { type: 'media', multiple: true, allowedTypes: ['images'] },
        
        // Complex Data
        amenities: { type: 'json' },
        
        // Relations
        deals: { type: 'relation', relation: 'oneToMany', target: 'api::deal.deal', mappedBy: 'business' },
        events: { type: 'relation', relation: 'oneToMany', target: 'api::event.event', mappedBy: 'business' },
        reviews: { type: 'relation', relation: 'oneToMany', target: 'api::review.review', mappedBy: 'business' },
        userFavorites: { type: 'relation', relation: 'manyToMany', target: 'api::user-profile.user-profile', inversedBy: 'favoriteBusinesses' }
      }
    };
    
    await createOrUpdateContentType('business', businessSchema);
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
        // Basic Information
        title: { type: 'string', required: true },
        description: { type: 'text' },
        dealType: { type: 'enumeration', enum: ['percentage', 'fixed', 'free', 'bogo'] },
        
        // Deal Details
        discountPercentage: { type: 'integer', min: 0, max: 100 },
        discountAmount: { type: 'decimal', min: 0 },
        originalPrice: { type: 'decimal', min: 0 },
        finalPrice: { type: 'decimal', min: 0 },
        
        // Validity
        startDate: { type: 'date' },
        endDate: { type: 'date' },
        isActive: { type: 'boolean', default: true },
        isFlashDeal: { type: 'boolean', default: false },
        
        // Terms & Conditions
        terms: { type: 'text' },
        restrictions: { type: 'json' },
        
        // Media
        image: { type: 'media', multiple: false, allowedTypes: ['images'] },
        
        // Relations
        business: { type: 'relation', relation: 'manyToOne', target: 'api::business.business', inversedBy: 'deals' },
        userRedemptions: { type: 'relation', relation: 'manyToMany', target: 'api::user-profile.user-profile', inversedBy: 'redeemedDeals' }
      }
    };
    
    await createOrUpdateContentType('deal', dealSchema);
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
        // Basic Event Info
        title: { type: 'string', required: true },
        description: { type: 'text' },
        date: { type: 'date', required: true },
        time: { type: 'time', required: true },
        duration: { type: 'string' },
        neighborhood: { type: 'string' },
        address: { type: 'text' },
        maxAttendees: { type: 'integer', min: 1 },
        isActive: { type: 'boolean', default: true },
        
        // Event Details
        eventType: { type: 'enumeration', enum: ['workshop', 'tasting', 'class', 'tour', 'social', 'other'] },
        price: { type: 'decimal', min: 0 },
        isFree: { type: 'boolean', default: false },
        
        // Media
        image: { type: 'media', multiple: false, allowedTypes: ['images'] },
        
        // Relations
        business: { type: 'relation', relation: 'manyToOne', target: 'api::business.business', inversedBy: 'events' },
        attendees: { type: 'relation', relation: 'manyToMany', target: 'api::user-profile.user-profile', inversedBy: 'attendingEvents' }
      }
    };
    
    await createOrUpdateContentType('event', eventSchema);
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
        // Basic User Info
        username: { type: 'string', required: true, unique: true },
        email: { type: 'email', required: true, unique: true },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        avatar: { type: 'media', multiple: false, allowedTypes: ['images'] },
        
        // Membership
        membershipTier: { type: 'enumeration', enum: ['basic', 'premium', 'vip'], default: 'basic' },
        membershipStartDate: { type: 'date' },
        membershipRenewalDate: { type: 'date' },
        
        // Preferences
        favoriteCategories: { type: 'json' },
        location: { type: 'string' },
        notifications: { type: 'json' },
        
        // Relations
        favoriteBusinesses: { type: 'relation', relation: 'manyToMany', target: 'api::business.business', inversedBy: 'userFavorites' },
        attendingEvents: { type: 'relation', relation: 'manyToMany', target: 'api::event.event', inversedBy: 'attendees' },
        redeemedDeals: { type: 'relation', relation: 'manyToMany', target: 'api::deal.deal', inversedBy: 'userRedemptions' },
        reviews: { type: 'relation', relation: 'oneToMany', target: 'api::review.review', mappedBy: 'user' }
      }
    };
    
    await createOrUpdateContentType('user-profile', userProfileSchema);
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
        // Review Details
        rating: { type: 'integer', required: true, min: 1, max: 5 },
        comment: { type: 'text' },
        date: { type: 'date', required: true },
        isVerified: { type: 'boolean', default: false },
        
        // Review Categories
        categories: { type: 'json' }, // e.g., ["service", "food", "atmosphere"]
        
        // Media
        photos: { type: 'media', multiple: true, allowedTypes: ['images'] },
        
        // Relations
        business: { type: 'relation', relation: 'manyToOne', target: 'api::business.business', inversedBy: 'reviews' },
        user: { type: 'relation', relation: 'manyToOne', target: 'api::user-profile.user-profile', inversedBy: 'reviews' }
      }
    };
    
    await createOrUpdateContentType('review', reviewSchema);
    console.log('✅ Review content type created/updated');
    
  } catch (error) {
    console.error('❌ Failed to create Review content type:', error);
  }
}

async function createOrUpdateContentType(contentTypeName, schema) {
  try {
    const endpoint = `${API_BASE_URL}/content-manager/content-types/api::${contentTypeName}.${contentTypeName}`;
    
    // Try to get existing content type
    const getResponse = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (getResponse.ok) {
      // Update existing
      const updateResponse = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(schema)
      });
      
      if (!updateResponse.ok) {
        throw new Error(`Failed to update ${contentTypeName}: ${updateResponse.status}`);
      }
    } else {
      // Create new
      const createResponse = await fetch(`${API_BASE_URL}/content-manager/content-types`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(schema)
      });
      
      if (!createResponse.ok) {
        throw new Error(`Failed to create ${contentTypeName}: ${createResponse.status}`);
      }
    }
    
  } catch (error) {
    console.error(`❌ Error with ${contentTypeName}:`, error);
    throw error;
  }
}

// Run the complete backend creation
createCompleteBackend();
