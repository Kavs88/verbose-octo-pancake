export default ({ env }) => ({
  enabled: true,
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:1337', 'http://127.0.0.1:1337'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  keepHeaderOnError: true,
});
