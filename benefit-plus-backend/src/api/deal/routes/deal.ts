export default {
  routes: [
    {
      method: 'GET',
      path: '/deals',
      handler: 'deal.find',
      config: {
        policies: [],
        auth: false
      }
    },
    {
      method: 'GET',
      path: '/deals/:id',
      handler: 'deal.findOne',
      config: {
        policies: [],
        auth: false
      }
    },
    {
      method: 'POST',
      path: '/deals',
      handler: 'deal.create',
      config: {
        policies: [],
        auth: false
      }
    },
    {
      method: 'PUT',
      path: '/deals/:id',
      handler: 'deal.update',
      config: {
        policies: [],
        auth: false
      }
    },
    {
      method: 'DELETE',
      path: '/deals/:id',
      handler: 'deal.delete',
      config: {
        policies: [],
        auth: false
      }
    }
  ],
};
