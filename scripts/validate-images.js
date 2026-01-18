/**
 * Script to validate all image URLs in the project
 * Run with: node scripts/validate-images.js
 */

const fs = require('fs');
const path = require('path');

async function validateImageUrl(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return {
      url,
      status: response.status,
      ok: response.ok,
      contentType: response.headers.get('content-type')
    };
  } catch (error) {
    return {
      url,
      status: 'ERROR',
      ok: false,
      error: error.message
    };
  }
}

async function validateAllImages() {
  console.log('🔍 Validating image URLs...\n');

  // Read items data
  const itemsPath = path.join(process.cwd(), 'src/app/data/items.json');
  const itemsData = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));

  const imageUrls = itemsData.map(item => item.image);
  const uniqueUrls = [...new Set(imageUrls)];

  console.log(`Found ${uniqueUrls.length} unique image URLs to validate\n`);

  const results = await Promise.all(
    uniqueUrls.map(url => validateImageUrl(url))
  );

  let validCount = 0;
  let invalidCount = 0;

  results.forEach(result => {
    if (result.ok) {
      console.log(`✅ ${result.url} (${result.status})`);
      validCount++;
    } else {
      console.log(`❌ ${result.url} (${result.status || result.error})`);
      invalidCount++;
    }
  });

  console.log(`\n📊 Results:`);
  console.log(`✅ Valid: ${validCount}`);
  console.log(`❌ Invalid: ${invalidCount}`);
  console.log(`📈 Success Rate: ${((validCount / uniqueUrls.length) * 100).toFixed(1)}%`);

  if (invalidCount > 0) {
    console.log('\n⚠️  Some images may not load properly on the live site.');
    process.exit(1);
  } else {
    console.log('\n🎉 All images are accessible!');
  }
}

// Run validation
validateAllImages().catch(console.error);