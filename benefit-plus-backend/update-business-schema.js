const API_BASE_URL = 'http://localhost:1337';
const API_TOKEN = 'fd546d95b038b8807b529587af88f7d97d0d7aebde98ec64600bd3702ba57ebb6d61078fcb86505824b5ff61e3f18ebfdb0ab7c5d14c6f4bd7014cc849f2b8eff7350e386029a020e1f3cfe6cde2995d7f19ea2cb49f7f1ebf1285b7978100af0b1b0ff9b104d954539732efcd18f575ac98457b1ec48c66b41ac967ad24dcf6';

async function updateBusinessSchema() {
  try {
    console.log('🔧 Updating Business content type schema...');
    
    // First, get the current content type structure
    const contentTypeResponse = await fetch(`${API_BASE_URL}/content-manager/content-types/api::business.business`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!contentTypeResponse.ok) {
      throw new Error(`Failed to get content type: ${contentTypeResponse.status}`);
    }
    
    const contentType = await contentTypeResponse.json();
    console.log('📋 Current content type structure:', contentType);
    
    // Update the schema with all required fields
    const updatedSchema = {
      ...contentType,
      schema: {
        ...contentType.schema,
        attributes: {
          // Basic Information
          name: {
            type: 'string',
            required: true,
            unique: true
          },
          slug: {
            type: 'uid',
            targetField: 'name'
          },
          description: {
            type: 'text'
          },
          
          // Business Details
          category: {
            type: 'string'
          },
          neighborhood: {
            type: 'string'
          },
          rating: {
            type: 'decimal',
            min: 0,
            max: 5
          },
          reviewCount: {
            type: 'integer',
            min: 0
          },
          isOpen: {
            type: 'boolean',
            default: true
          },
          hasMemberDeal: {
            type: 'boolean',
            default: false
          },
          dealHighlight: {
            type: 'text'
          },
          isFavorite: {
            type: 'boolean',
            default: false
          },
          isPremium: {
            type: 'boolean',
            default: false
          },
          
          // Location
          latitude: {
            type: 'decimal'
          },
          longitude: {
            type: 'decimal'
          },
          address: {
            type: 'text'
          },
          
          // Contact & Business Info
          phone: {
            type: 'string'
          },
          website: {
            type: 'string'
          },
          openingHours: {
            type: 'json'
          },
          
          // Media
          coverPhoto: {
            type: 'media',
            multiple: false,
            allowedTypes: ['images']
          },
          photos: {
            type: 'media',
            multiple: true,
            allowedTypes: ['images']
          },
          
          // Complex Data
          amenities: {
            type: 'json'
          },
          reviews: {
            type: 'json'
          }
        }
      }
    };
    
    // Update the content type
    const updateResponse = await fetch(`${API_BASE_URL}/content-manager/content-types/api::business.business`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedSchema)
    });
    
    if (!updateResponse.ok) {
      const error = await updateResponse.json();
      throw new Error(`Failed to update schema: ${updateResponse.status} - ${JSON.stringify(error)}`);
    }
    
    console.log('✅ Business schema updated successfully!');
    
    // Now let's also update the Event schema
    await updateEventSchema();
    
  } catch (error) {
    console.error('❌ Failed to update Business schema:', error);
  }
}

async function updateEventSchema() {
  try {
    console.log('🔧 Updating Event content type schema...');
    
    // Get current event content type
    const contentTypeResponse = await fetch(`${API_BASE_URL}/content-manager/content-types/api::event.event`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!contentTypeResponse.ok) {
      throw new Error(`Failed to get event content type: ${contentTypeResponse.status}`);
    }
    
    const contentType = await contentTypeResponse.json();
    
    // Update event schema
    const updatedEventSchema = {
      ...contentType,
      schema: {
        ...contentType.schema,
        attributes: {
          // Basic Event Info
          title: {
            type: 'string',
            required: true
          },
          description: {
            type: 'text'
          },
          date: {
            type: 'date',
            required: true
          },
          time: {
            type: 'time',
            required: true
          },
          duration: {
            type: 'string'
          },
          neighborhood: {
            type: 'string'
          },
          address: {
            type: 'text'
          },
          maxAttendees: {
            type: 'integer',
            min: 1
          },
          isActive: {
            type: 'boolean',
            default: true
          },
          
          // Business Relation
          business: {
            type: 'relation',
            relation: 'manyToOne',
            target: 'api::business.business',
            inversedBy: 'events'
          },
          
          // Media
          image: {
            type: 'media',
            multiple: false,
            allowedTypes: ['images']
          },
          
          // Complex Data
          attendees: {
            type: 'json'
          },
          isAttending: {
            type: 'boolean',
            default: false
          }
        }
      }
    };
    
    // Update the event content type
    const updateResponse = await fetch(`${API_BASE_URL}/content-manager/content-types/api::event.event`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedEventSchema)
    });
    
    if (!updateResponse.ok) {
      const error = await updateResponse.json();
      throw new Error(`Failed to update event schema: ${updateResponse.status} - ${JSON.stringify(error)}`);
    }
    
    console.log('✅ Event schema updated successfully!');
    
  } catch (error) {
    console.error('❌ Failed to update Event schema:', error);
  }
}

// Run the updates
updateBusinessSchema();
