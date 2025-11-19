const mongoose = require('mongoose');
require('dotenv').config();

async function updateTourImages() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-bliss');
        console.log('Connected to MongoDB');

        const Tour = require('./src/models/Tour.model.js');

        // Update Classic Uzbekistan tour
        const classicTour = await Tour.findOne({ title: /Classic Uzbekistan/ });
        if (classicTour) {
            classicTour.imageCover = 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&h=500&fit=crop';
            classicTour.images = [
                'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=500&fit=crop',
                'https://images.unsplash.com/photo-1585850524092-f3a7f5e832f4?w=800&h=500&fit=crop'
            ];
            await classicTour.save();
            console.log('✓ Updated Classic Uzbekistan tour with images');
        }

        // Update Silk Road Adventure tour
        const silkRoadTour = await Tour.findOne({ title: /Silk Road Adventure/ });
        if (silkRoadTour) {
            silkRoadTour.imageCover = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop';
            silkRoadTour.images = [
                'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=500&fit=crop',
                'https://images.unsplash.com/photo-1558005530-a7958896ec70?w=800&h=500&fit=crop'
            ];
            await silkRoadTour.save();
            console.log('✓ Updated Silk Road Adventure tour with images');
        }

        console.log('Done!');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

updateTourImages();
