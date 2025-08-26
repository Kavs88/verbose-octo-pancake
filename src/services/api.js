const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = '132f00af63c54ad3e5340be792f73172a6936e7d071d29fe13056888f69ddf44e1b8d0cea7ef990b20b4cfdf9df72ce672f9c24d61ef03fb8b9f8910e118afbeb233ca84b86b7ab43c7a1f9654f884b1db25af1f288e33b7f2db167c40275228bf20c66bb5797ea997b29c5efc61c2cd7767399ec9d484b6a4a7b30fcdf149dd';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = API_TOKEN;
  }

  // Data transformation utility for BOTH flattened and nested Strapi structures
  transformStrapiData(rawData) {
    if (!rawData) return null;
    
    // Handle array of items
    if (Array.isArray(rawData)) {
      return rawData.map(item => this.transformStrapiData(item));
    }
    
    // Handle single item
    if (rawData.data && Array.isArray(rawData.data)) {
      // This is a Strapi response with data array
      return rawData.data.map(item => this.transformStrapiData(item));
    }
    
    if (rawData.data && typeof rawData.data === 'object' && !Array.isArray(rawData.data)) {
      // This is a single Strapi item
      return this.transformStrapiData(rawData.data);
    }
    
    // Check if this is already flattened data (no attributes object)
    if (!rawData.attributes) {
      // Data is already flattened - just process image URLs
      const transformed = { ...rawData };
      
      // Handle cover photo for businesses - FIXED: Handle actual Embassy image structure
      if (transformed.coverPhoto) {
        if (typeof transformed.coverPhoto === 'string') {
          // Direct URL string
          transformed.coverPhotoUrl = transformed.coverPhoto;
        } else if (transformed.coverPhoto.url) {
          // Object with url property (like Embassy record)
          transformed.coverPhotoUrl = transformed.coverPhoto.url;
        } else if (transformed.coverPhoto.data?.attributes?.url) {
          // Nested structure
          transformed.coverPhotoUrl = transformed.coverPhoto.data.attributes.url;
        }
        
        // Also extract thumbnail and small formats if available
        if (transformed.coverPhoto.formats) {
          if (transformed.coverPhoto.formats.thumbnail?.url) {
            transformed.coverPhotoThumbnail = transformed.coverPhoto.formats.thumbnail.url;
          }
          if (transformed.coverPhoto.formats.small?.url) {
            transformed.coverPhotoSmall = transformed.coverPhoto.formats.small.url;
          }
        }
      }
      
      // Handle photos array for businesses - FIXED: Handle actual Embassy image structure
      if (transformed.photos && Array.isArray(transformed.photos)) {
        transformed.photos = transformed.photos.map(photo => {
          if (typeof photo === 'string') {
            return photo; // Direct URL string
          } else if (photo.url) {
            return photo.url; // Object with url property (like Embassy record)
          } else if (photo.data?.attributes?.url) {
            return photo.data.attributes.url; // Nested structure
          }
          return null;
        }).filter(Boolean);
      }
      
      // Handle image (for deals and events) - Extract from image.url
      if (transformed.image) {
        if (typeof transformed.image === 'string') {
          transformed.imageUrl = transformed.image;
        } else if (transformed.image.url) {
          transformed.imageUrl = transformed.image.url;
        } else if (transformed.image.data?.attributes?.url) {
          transformed.imageUrl = transformed.image.data.attributes.url;
        }
        console.log('🔍 Image field processed:', { image: transformed.image, imageUrl: transformed.imageUrl });
      }
      
      // Handle additional event image fields (coverPhoto, photo) - only if imageUrl not already set
      if (!transformed.imageUrl && transformed.coverPhoto) {
        if (typeof transformed.coverPhoto === 'string') {
          transformed.imageUrl = transformed.coverPhoto;
        } else if (transformed.coverPhoto.url) {
          transformed.imageUrl = transformed.coverPhoto.url;
        } else if (transformed.coverPhoto.data?.attributes?.url) {
          transformed.imageUrl = transformed.coverPhoto.data.attributes.url;
        }
        console.log('🔍 CoverPhoto field processed:', { coverPhoto: transformed.coverPhoto, imageUrl: transformed.imageUrl });
      }
      
      if (!transformed.imageUrl && transformed.photo) {
        if (typeof transformed.photo === 'string') {
          transformed.imageUrl = transformed.photo;
        } else if (transformed.photo.url) {
          transformed.imageUrl = transformed.photo.url;
        } else if (transformed.photo.data?.attributes?.url) {
          transformed.imageUrl = transformed.photo.data.attributes.url;
        }
        console.log('🔍 Photo field processed:', { photo: transformed.photo, imageUrl: transformed.imageUrl });
      }
      
      return transformed;
    }
    
    // Handle nested Strapi structure (with attributes)
    const id = rawData.id;
    const attributes = rawData.attributes;
    
    if (!id && !attributes) return rawData;
    
    // Transform the nested data
    const transformed = {
      id: id,
      ...attributes
    };
    
    // Handle cover photo (for businesses) - Extract from coverPhoto.url
    if (attributes.coverPhoto?.url) {
      transformed.coverPhotoUrl = attributes.coverPhoto.url;
    } else if (attributes.coverPhoto?.data?.attributes?.url) {
      // Fallback for nested structure
      transformed.coverPhotoUrl = attributes.coverPhoto.data.attributes.url;
    }
    
    // Handle photos array (for businesses) - Extract from photos[].url
    if (attributes.photos && Array.isArray(attributes.photos)) {
      transformed.photos = attributes.photos.map(photo => {
        if (photo.url) {
          return photo.url;
        } else if (photo.data?.attributes?.url) {
          // Fallback for nested structure
          return photo.data.attributes.url;
        }
        return null;
      }).filter(Boolean);
    }
    
    // Handle image (for deals and events) - Extract from image.url
    if (attributes.image?.url) {
      transformed.imageUrl = attributes.image.url;
    } else if (attributes.image?.data?.attributes?.url) {
      // Fallback for nested structure
      transformed.imageUrl = attributes.image.data.attributes.url;
    }
    console.log('🔍 Nested Image field processed:', { image: attributes.image, imageUrl: transformed.imageUrl });
    
    // Handle additional event image fields (coverPhoto, photo) - only if imageUrl not already set
    if (!transformed.imageUrl && attributes.coverPhoto?.url) {
      transformed.imageUrl = attributes.coverPhoto.url;
    } else if (!transformed.imageUrl && attributes.coverPhoto?.data?.attributes?.url) {
      transformed.imageUrl = attributes.coverPhoto.data.attributes.url;
    }
    console.log('🔍 Nested CoverPhoto field processed:', { coverPhoto: attributes.coverPhoto, imageUrl: transformed.imageUrl });
    
    if (!transformed.imageUrl && attributes.photo?.url) {
      transformed.imageUrl = attributes.photo.url;
    } else if (!transformed.imageUrl && attributes.photo?.data?.attributes?.url) {
      transformed.imageUrl = attributes.photo.data.attributes.url;
    }
    console.log('🔍 Nested Photo field processed:', { photo: attributes.photo, imageUrl: transformed.imageUrl });
    
    // Handle relationships - flatten them
    if (attributes.business?.data) {
      transformed.business = this.transformStrapiData(attributes.business.data);
    }
    
    if (attributes.organizer?.data) {
      transformed.organizer = this.transformStrapiData(attributes.organizer.data);
    }
    
    if (attributes.deals?.data && Array.isArray(attributes.deals.data)) {
      transformed.deals = attributes.deals.data.map(deal => 
        this.transformStrapiData(deal)
      );
    }
    
    if (attributes.events?.data && Array.isArray(attributes.events.data)) {
      transformed.events = attributes.events.data.map(event => 
        this.transformStrapiData(event)
      );
    }
    
    if (attributes.reviews?.data && Array.isArray(attributes.reviews.data)) {
      transformed.reviews = attributes.reviews.data.map(review => 
        this.transformStrapiData(review)
      );
    }
    
    return transformed;
  }

  // Generic API request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
        ...options.headers
      },
      ...options
    };

    console.log('🌐 API Request:', {
      url,
      method: options.method || 'GET',
      headers: config.headers,
      body: options.body
    });

    try {
      const response = await fetch(url, config);
      console.log('📡 Raw Response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('📊 Parsed Response Data:', data);
      
      // Transform the data before returning
      const transformedData = this.transformStrapiData(data);
      console.log('🔄 Transformed Data:', transformedData);
      
      return transformedData;
    } catch (error) {
      console.error('❌ API Request Failed:', error);
      throw error;
    }
  }

  // Business API methods
  async getBusinesses(params = {}) {
    // Always populate all fields including images and relations
    const defaultParams = {
      'populate': '*',
      ...params
    };
    const queryString = new URLSearchParams(defaultParams).toString();
    const endpoint = `/businesses${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint);
  }

  async getBusiness(id) {
    // Use simple population syntax to avoid 400 errors
    return this.request(`/businesses/${id}?populate[coverPhoto]=true&populate[photos]=true&populate[deals]=true&populate[events]=true&populate[reviews]=true`);
  }

  async createBusiness(businessData) {
    return this.request('/businesses', {
      method: 'POST',
      body: JSON.stringify({ data: businessData })
    });
  }

  async updateBusiness(id, businessData) {
    return this.request(`/businesses/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data: businessData })
    });
  }

  async deleteBusiness(id) {
    return this.request(`/businesses/${id}`, {
      method: 'DELETE'
    });
  }

  // Event API methods
  async getEvents(params = {}) {
    // TEMPORARY: Use the most basic populate to avoid 400 errors
    const defaultParams = {
      'populate': '*',  // Use wildcard populate instead of specific fields
      ...params
    };
    const queryString = new URLSearchParams(defaultParams).toString();
    const endpoint = `/events${queryString ? `?${queryString}` : ''}`;
    console.log('🎯 Events API call:', endpoint);
    const result = await this.request(endpoint);
    console.log('🎯 Events API result structure:', {
      isArray: Array.isArray(result),
      length: Array.isArray(result) ? result.length : 'N/A',
      firstEvent: Array.isArray(result) && result.length > 0 ? result[0] : 'N/A'
    });
    return result;
  }

  async getEvent(id) {
    return this.request(`/events/${id}?populate=*`);
  }

  async createEvent(eventData) {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify({ data: eventData })
    });
  }

  async updateEvent(id, eventData) {
    return this.request(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data: eventData })
    });
  }

  async deleteEvent(id) {
    return this.request(`/events/${id}`, {
      method: 'DELETE'
    });
  }

  // Deal API methods
  async getDeals(params = {}) {
    // Use simple Strapi v5 population syntax
    const defaultParams = {
      'populate[business]': true,
      'populate[image]': true,
      ...params
    };
    const queryString = new URLSearchParams(defaultParams).toString();
    const endpoint = `/deals${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint);
  }

  async getDeal(id) {
    return this.request(`/deals/${id}?populate[business]=true&populate[image]=true`);
  }

  async createDeal(dealData) {
    return this.request('/deals', {
      method: 'POST',
      body: JSON.stringify({ data: dealData })
    });
  }

  async updateDeal(id, dealData) {
    return this.request(`/deals/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data: dealData })
    });
  }

  async deleteDeal(id) {
    return this.request(`/deals/${id}`, {
      method: 'DELETE'
    });
  }

  // Get recommended businesses (use basic filtering instead of custom endpoint)
  async getRecommendedBusinesses() {
    const params = {
      'sort': 'rating:desc',
      'pagination[limit]': 6
    };
    return this.getBusinesses(params);
  }

  // Get businesses with deals (use basic filtering instead of custom endpoint)
  async getBusinessesWithDeals() {
    const params = {
      'filters[hasMemberDeal][$eq]': true,
      'pagination[limit]': 6
    };
    return this.getBusinesses(params);
  }

  // Search businesses
  async searchBusinesses(query, filters = {}) {
    const params = {
      'filters[name][$containsi]': query,
      ...filters
    };
    return this.getBusinesses(params);
  }

  // Get businesses by category
  async getBusinessesByCategory(category) {
    const params = {
      'filters[category][$eq]': category
    };
    return this.getBusinesses(params);
  }

  // Get businesses by neighborhood
  async getBusinessesByNeighborhood(neighborhood) {
    const params = {
      'filters[neighborhood][$eq]': neighborhood
    };
    return this.getBusinesses(params);
  }

  // Get premium businesses
  async getPremiumBusinesses() {
    const params = {
      'filters[isPremium][$eq]': true
    };
    return this.getBusinesses(params);
  }
}

// Create and export a single instance
const apiService = new ApiService();
export default apiService;
