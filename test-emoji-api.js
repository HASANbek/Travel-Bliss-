/**
 * Test emoji handling in category API
 */

async function testEmojiAPI() {
    console.log('🧪 Testing Emoji Category API\n');
    console.log('='.repeat(60));

    // Test 1: Fetch all categories
    console.log('\n📊 Test 1: Fetching all categories');
    const response = await fetch('http://localhost:5000/api/categories');
    const result = await response.json();
    const categories = result.data?.categories || result.categories || [];

    console.log(`   Total categories: ${categories.length}`);

    // Display first 5 categories with their emojis
    console.log('\n   Sample categories:');
    categories.slice(0, 5).forEach(cat => {
        console.log(`   ${cat.icon} ${cat.name} (${cat.slug})`);
    });

    // Test 2: Create a category with emoji
    console.log('\n\n🎨 Test 2: Creating category with emoji picker icon');
    const testCategory = {
        name: 'Photography & Culture',
        slug: 'photography-culture-test',
        description: 'Capture stunning moments and cultural experiences',
        icon: '📸',
        color: '#ec4899',
        status: 'active',
        order: 200
    };

    const createResponse = await fetch('http://localhost:5000/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testCategory)
    });

    const createResult = await createResponse.json();

    if (createResult.success) {
        console.log('   ✅ Category created successfully');
        console.log('   Name:', createResult.data?.category?.name);
        console.log('   Icon:', createResult.data?.category?.icon);
        console.log('   Color:', createResult.data?.category?.color);
    } else {
        console.log('   ❌ Failed:', createResult.message);
    }

    // Test 3: Verify emoji persistence
    console.log('\n\n🔍 Test 3: Verifying emoji persistence');
    const verifyResponse = await fetch('http://localhost:5000/api/categories');
    const verifyResult = await verifyResponse.json();
    const verifyCategories = verifyResult.data?.categories || verifyResult.categories || [];

    const createdCategory = verifyCategories.find(c => c.slug === 'photography-culture-test');
    if (createdCategory) {
        console.log('   ✅ Category found in database');
        console.log('   Emoji stored correctly:', createdCategory.icon === '📸' ? '✅' : '❌');
        console.log('   Icon value:', createdCategory.icon);
    } else {
        console.log('   ℹ️ Category not found (might be duplicate)');
    }

    // Test 4: List all unique emojis used
    console.log('\n\n🎯 Test 4: All emojis currently in use');
    const uniqueEmojis = [...new Set(verifyCategories.map(c => c.icon))];
    console.log('   Unique emojis:', uniqueEmojis.length);
    console.log('   ', uniqueEmojis.join(' '));

    console.log('\n' + '='.repeat(60));
    console.log('\n✨ All tests completed!\n');
}

// Run tests
testEmojiAPI().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
});
