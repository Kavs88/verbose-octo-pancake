export default ({ env }) => ({
  responses: {
    privateAttributes: ['_v', '__v', 'createdAt', 'updatedAt', 'publishedAt', 'createdBy', 'updatedBy', 'publishedBy']
  },
  rest: {
    defaultLimit: 100,
    maxLimit: 250,
    withCount: true
  },
  // Ensure public access to API endpoints
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  // Configure public permissions explicitly
  permissions: {
    public: {
      business: ['find', 'findOne'],
      deal: ['find', 'findOne'],
      event: ['find', 'findOne']
    }
  }
});
