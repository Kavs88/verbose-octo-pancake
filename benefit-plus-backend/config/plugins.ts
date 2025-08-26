export default () => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '30d',
      },
      ratelimit: {
        interval: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per interval
      },
    },
  },
});
