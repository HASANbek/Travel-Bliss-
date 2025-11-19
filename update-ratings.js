const mongoose = require('mongoose');
require('dotenv').config();

async function updateRatings() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-bliss');
        console.log('Connected to MongoDB');

        const Tour = require('./src/models/Tour.model.js');

        // Update all tours to have 79 reviews and 4.9 rating
        const result = await Tour.updateMany(
            {},
            {
                $set: {
                    ratingsCount: 79,
                    rating: 4.9
                }
            }
        );

        console.log(`✓ Updated ${result.modifiedCount} tours`);
        console.log('All tours now show 79 reviews with 4.9 rating');

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

updateRatings();
