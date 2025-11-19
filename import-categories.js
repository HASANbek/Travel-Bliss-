/**
 * Script to import travel categories into the system
 * Run: node import-categories.js
 */

const fs = require('fs');
const path = require('path');

// Read the categories JSON file
const categoriesData = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'travel-categories-uzbekistan.json'), 'utf8')
);

// API endpoint
const API_URL = 'http://localhost:5000/api/categories';

// Color palette for categories (if not specified)
const colors = [
    '#667eea', '#8b5cf6', '#f59e0b', '#06b6d4', '#10b981',
    '#ec4899', '#f97316', '#84cc16', '#a855f7', '#dc2626'
];

// Function to create a single category
async function createCategory(categoryData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoryData)
        });

        const result = await response.json();

        if (response.ok) {
            console.log(`✅ Created: ${categoryData.name} (${categoryData.slug})`);
            return { success: true, data: result };
        } else {
            console.log(`❌ Failed: ${categoryData.name} - ${result.message || 'Unknown error'}`);
            return { success: false, error: result.message };
        }
    } catch (error) {
        console.log(`❌ Error creating ${categoryData.name}: ${error.message}`);
        return { success: false, error: error.message };
    }
}

// Function to import all categories
async function importCategories() {
    console.log('\n🚀 Starting category import...\n');
    console.log('=' .repeat(60));

    let totalCreated = 0;
    let totalFailed = 0;
    let categoryIndex = 0;

    // Process each category group
    for (const [groupName, categories] of Object.entries(categoriesData)) {
        console.log(`\n📂 ${groupName.toUpperCase().replace(/_/g, ' ')}`);
        console.log('-'.repeat(60));

        for (const category of categories) {
            // Add icon if not present
            if (!category.icon) {
                category.icon = '';
            }

            // Ensure color is set
            if (!category.color) {
                category.color = colors[categoryIndex % colors.length];
            }

            // Wait a bit to avoid overwhelming the server
            await new Promise(resolve => setTimeout(resolve, 100));

            const result = await createCategory(category);

            if (result.success) {
                totalCreated++;
            } else {
                totalFailed++;
            }

            categoryIndex++;
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log('\n📊 IMPORT SUMMARY:');
    console.log(`   ✅ Successfully created: ${totalCreated}`);
    console.log(`   ❌ Failed: ${totalFailed}`);
    console.log(`   📝 Total processed: ${totalCreated + totalFailed}`);
    console.log('\n✨ Import completed!\n');
}

// Check if server is running
async function checkServer() {
    try {
        const response = await fetch('http://localhost:5000/api/categories');
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Main execution
(async () => {
    console.log('\n🔍 Checking server status...');

    const serverRunning = await checkServer();

    if (!serverRunning) {
        console.log('\n❌ ERROR: Server is not running on http://localhost:5000');
        console.log('   Please start the server first with: npm run dev');
        console.log('   Then run this script again.\n');
        process.exit(1);
    }

    console.log('✅ Server is running!\n');

    // Run the import
    await importCategories();
})();
