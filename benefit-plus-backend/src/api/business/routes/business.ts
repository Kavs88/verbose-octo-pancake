/**
 * business router
 */

export default {
  routes: [
    // Public access to get all businesses
    {
      method: 'GET',
      path: '/businesses',
      handler: 'business.find',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    // Public access to get a specific business
    {
      method: 'GET',
      path: '/businesses/:id',
      handler: 'business.findOne',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    // Create new business (requires authentication)
    {
      method: 'POST',
      path: '/businesses',
      handler: 'business.create',
      config: {
        auth: {
          scope: ['authenticated']
        },
        policies: [],
        middlewares: [],
      },
    },
    // Update business (requires authentication)
    {
      method: 'PUT',
      path: '/businesses/:id',
      handler: 'business.update',
      config: {
        auth: {
          scope: ['authenticated']
        },
        policies: [],
        middlewares: [],
      },
    },
    // Delete business (requires authentication)
    {
      method: 'DELETE',
      path: '/businesses/:id',
      handler: 'business.delete',
      config: {
        auth: {
          scope: ['authenticated']
        },
        policies: [],
        middlewares: [],
      },
    },
  ],
};
