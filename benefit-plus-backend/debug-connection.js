const API_BASE_URL = 'http://localhost:1337/api';

console.log('🔍 Testing connection to Strapi...');
console.log(`📍 Target: ${API_BASE_URL}`);

// Test 1: Basic connection
fetch(`${API_BASE_URL}/businesses`)
  .then(response => {
    console.log('✅ Connection successful!');
    console.log(`Status: ${response.status}`);
    return response.text();
  })
  .then(data => {
    console.log('📄 Response preview:', data.substring(0, 200));
  })
  .catch(error => {
    console.error('❌ Connection failed:', error.message);
    console.error('🔍 Error details:', error);
    
    // Test 2: Try different approach
    console.log('\n🔄 Trying alternative approach...');
    const http = require('http');
    
    const req = http.request({
      hostname: 'localhost',
      port: 1337,
      path: '/api/businesses',
      method: 'GET'
    }, (res) => {
      console.log('✅ HTTP request successful!');
      console.log(`Status: ${res.statusCode}`);
    });
    
    req.on('error', (err) => {
      console.error('❌ HTTP request failed:', err.message);
    });
    
    req.end();
  });
