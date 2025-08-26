const API_BASE_URL = 'http://localhost:1337/api';
const API_TOKEN = 'fd546d95b038b8807b529587af88f7d97d0d7aebde98ec64600bd3702ba57ebb6d61078fcb86505824b5ff61e3f18ebfdb0ab7c5d14c6f4bd7014cc849f2b8eff7350e386029a020e1f3cfe6cde2995d7f19ea2cb49f7f1ebf1285b7978100af0b1b0ff9b104d954539732efcd18f575ac98457b1ec48c66b41ac967ad24dcf6';

console.log('🔍 Testing Strapi v5 relationship formats...');

// Test different relationship formats based on Strapi v5 docs
const testFormats = [
  { business: 68 },  // Format 1: Direct ID
  { business: { connect: [68] } },  // Format 2: Connect syntax
  { business: { set: [68] } },  // Format 3: Set syntax
  { business: { disconnect: [68] } },  // Format 4: Disconnect syntax
  { business: { connect: 68 } },  // Format 5: Single connect
];

async function testRelationshipFormats() {
  for (let i = 0; i < testFormats.length; i++) {
    const format = testFormats[i];
    const formatName = Object.keys(format)[0];
    const formatValue = format[formatName];
    
    console.log(`\n🧪 Testing Format ${i + 1}: ${formatName}: ${JSON.stringify(formatValue)}`);
    
    try {
      const dealData = {
        title: `Test Deal Format ${i + 1}`,
        description: `Testing relationship format ${i + 1}`,
        dealType: "free",
        discountPercentage: 0,
        discountAmount: 0,
        originalPrice: 1000,
        finalPrice: 0,
        startDate: "2024-01-01T00:00:00.000Z",
        endDate: "2025-12-31T23:59:59.000Z",
        isActive: true,
        isFlashDeal: false,
        terms: "Test terms",
        restrictions: ["Test restriction"],
        ...format
      };

      const response = await fetch(`${API_BASE_URL}/deals`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: dealData })
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ SUCCESS! Format ${i + 1} worked! Deal ID: ${result.data.id}`);
        return format; // Found working format!
      } else {
        const errorText = await response.text();
        console.log(`❌ Format ${i + 1} failed: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.log(`❌ Format ${i + 1} error: ${error.message}`);
    }
  }
  
  console.log('\n❌ No relationship format worked!');
  return null;
}

// Run the test
testRelationshipFormats();
