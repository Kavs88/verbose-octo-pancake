/**
 * business router
 */

export default {
  routes: [
    // Public access to get all events
    {
      method: 'GET',
      path: '/events',
      handler: 'event.find',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    // Public access to get a specific event
    {
      method: 'GET',
      path: '/events/:id',
      handler: 'event.findOne',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    // Create new event (requires authentication)
    {
      method: 'POST',
      path: '/events',
      handler: 'event.create',
      config: {
        auth: {
          scope: ['authenticated']
        },
        policies: [],
        middlewares: [],
      },
    },
    // Update event (requires authentication)
    {
      method: 'PUT',
      path: '/events/:id',
      handler: 'event.update',
      config: {
        auth: {
          scope: ['authenticated']
        },
        policies: [],
        middlewares: [],
      },
    },
    // Delete event (requires authentication)
    {
      method: 'DELETE',
      path: '/events/:id',
      handler: 'event.delete',
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
